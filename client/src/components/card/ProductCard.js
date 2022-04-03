import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ _id, images, names, ratings, numOfReviews, price }) => {
  return (
    <>
      <div key={_id} className="col-sm-12 col-md-6 col-lg-3 my-3">
        <div className="card p-3 rounded">
          <img
            className="card-img-top mx-auto"
            src={images[0].url}
            alt="products"
          />
          <div className="card-body d-flex flex-column">
            <h5 className="card-title">
              <Link to={`/product/${_id}`}>{names}</Link>
            </h5>
            <div className="ratings mt-auto">
              <div className="rating-outer">
                <div
                  className="rating-inner"
                  style={{ width: `${(ratings / 5) * 100}%` }}
                ></div>
              </div>
              <span id="no_of_reviews">({numOfReviews}Reviews)</span>
            </div>
            <p className="card-text">${price}</p>
            <Link
              to={`/product/${_id}`}
              className="btn btn-block"
              id="view_btn"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard;
