import React, { useEffect } from 'react';
import Metadata from '../components/Layouts/Metadata';
import { Link } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../Redux/Action/productAction';
const Home = () => {
  const { names, price, ratings, images } = useSelector(
    (state) => state.products
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());
  }, [dispatch]);

  return (
    <>
      <Metadata title="Best Buy products" />
      <div className="container container-fluid">
        <h1 id="products_heading">Latest Products</h1>

        <section id="products" className="container mt-5">
          <div className="row">
            <div className="col-sm-12 col-md-6 col-lg-3 my-3">
              <div className="card p-3 rounded">
                <img
                  className="card-img-top mx-auto"
                  src="{images.url}"
                  alt="products"
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{names}</h5>
                  <div className="ratings mt-auto">
                    <div className="rating-outer">
                      <div className="rating-inner"></div>
                    </div>
                    <span id="no_of_reviews">{ratings}</span>
                  </div>
                  <p className="card-text">{price}</p>
                  <Link to="/"> View Details</Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default Home;
