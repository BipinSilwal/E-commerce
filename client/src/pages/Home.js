import React, { useEffect, useState } from 'react';
import Metadata from '../components/Layouts/Metadata';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProduct } from '../Redux/Action/productAction';
import ProductCard from '../components/card/ProductCard';
import Loader from '../components/Loader';
import { useAlert } from 'react-alert';
import Pagination from 'react-js-pagination';
import { useParams } from 'react-router-dom';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import categories from '../components/categories';

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([1, 1000]);

  const [category, setCategory] = useState('');

  const [rating, setRating] = useState(0);

  const { keyword } = useParams();

  console.log(keyword);

  const { isLoading, products, error, totalProducts, limit, productCount } =
    useSelector((state) => state.products);

  const alert = useAlert();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProduct(currentPage, keyword, price, category, rating));

    if (error) {
      alert.error(error);
    }
  }, [dispatch, alert, error, currentPage, keyword, price, category, rating]);

  function setCurrentPageNo(pageNumber) {
    setCurrentPage(pageNumber);
  }

  let count = totalProducts;

  if (keyword) {
    count = productCount;
  }

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
                {keyword ? (
                  <>
                    <div className="col-6 col-md-3 mt-5 mb-5">
                      <div className="px-5">
                        <Range
                          marks={{
                            1: `$1`,
                            1000: `$1000`,
                          }}
                          min={1}
                          max={1000}
                          defaultValue={[1, 1000]}
                          tipFormatter={(value) => `$${value}`}
                          tipProps={{
                            placement: 'top',
                            visible: true,
                          }}
                          value={price}
                          onChange={(price) => setPrice(price)}
                        />
                        <hr className="my-5" />

                        <div className="mt-5">
                          <h4 className="mb-3">Categories</h4>
                          <ul className="pl-0">
                            {categories.map((item) => (
                              <>
                                <li
                                  style={{
                                    cursor: 'pointer',
                                    listStyleType: 'none',
                                  }}
                                  key={item}
                                  onClick={() => setCategory(item)}
                                >
                                  {item}
                                </li>
                              </>
                            ))}
                          </ul>
                        </div>
                        <hr className="my-3" />

                        <div className="mt-5">
                          <h4 className="mb-3">Ratings</h4>

                          <ul className="pl-0">
                            {[5, 4, 3, 2, 1].map((star) => (
                              <li
                                style={{
                                  cursor: 'pointer',
                                  listStyleType: 'none',
                                }}
                                key={star}
                                onClick={() => setRating(star)}
                              >
                                <div className="rating-outer">
                                  <div
                                    className="rating-inner"
                                    style={{
                                      width: `${star * 20}%`,
                                    }}
                                  ></div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="col-6 col-md-9">
                      <div className="row">
                        {products.map((product) => (
                          <ProductCard key={product._id} {...product} col={4} />
                        ))}
                      </div>
                    </div>
                  </>
                ) : (
                  products &&
                  products.map((product) => (
                    <ProductCard key={product._id} {...product} col={3} />
                  ))
                )}
              </div>
            </section>
            {limit <= count && (
              <div className="d-flex justify-content-center mt-5">
                <Pagination
                  activePage={currentPage}
                  itemsCountPerPage={limit}
                  totalItemsCount={totalProducts}
                  onChange={setCurrentPageNo}
                  nextPageText={'Next'}
                  prevPageText={'Prev'}
                  firstPageText={'First'}
                  lastPageText={'Last'}
                  itemClass="page-item"
                  linkClass="page-link"
                />
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Home;
