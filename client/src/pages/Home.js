import React, { useEffect } from 'react';
import Metadata from '../components/Layouts/Metadata';

import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../Redux/Action/productAction';
import ProductCard from '../components/card/ProductCard';
import Loader from '../components/Loader';
import { useAlert } from 'react-alert';
const Home = () => {
  const { isLoading, products, error, totalProducts } = useSelector(
    (state) => state.products
  );

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct());

    if (error) {
      alert.error(error);
    }
  }, [dispatch, alert, error]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Metadata title="Best Buy products" />
          <div className="container container-fluid">
            <h1 id="products_heading">Latest Products</h1>

            <section id="products" className="container mt-5">
              <div className="row">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} {...product} />
                  ))}
              </div>
            </section>
          </div>
        </>
      )}
    </>
  );
};

export default Home;
