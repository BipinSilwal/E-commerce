import express from 'express';
import {
  isAuthenticatedUser,
  isAuthorized,
} from '../middleware/authentication.js';
import {
  createProduct,
  deleteProducts,
  getProducts,
  createReview,
  getProductReviews,
  singleProduct,
  updateProducts,
  deleteProductReviews,
} from '../controller/productController.js';

// it helps to create chaining method for same route handler.
const productRouter = express.Router();

// chaining is done here with route handler.
productRouter
  .route('/admin/product/new')
  .post(isAuthenticatedUser, isAuthorized('admin'), createProduct);
productRouter.route('/products').get(getProducts);
productRouter.route('/product/:id').get(singleProduct);
productRouter
  .route('/admin/products/:id')
  .patch(isAuthenticatedUser, isAuthorized('admin'), updateProducts)
  .delete(isAuthenticatedUser, isAuthorized('admin'), deleteProducts);

// reviews.....
productRouter.route('/review').patch(isAuthenticatedUser, createReview);
productRouter.route('/review').get(isAuthenticatedUser, getProductReviews);
productRouter.route('/review').get(isAuthenticatedUser, deleteProductReviews);

export default productRouter;
