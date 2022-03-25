import express from 'express';
import { isAuthenticatedUser } from '../../middleware/authentication.js';
import {
  createProduct,
  deleteProducts,
  getProducts,
  singleProduct,
  updateProducts,
} from '../controller/productController.js';

// it helps to create chaining method for same route handler.
const productRouter = express.Router();

// chaining is done here with route handler.
productRouter.route('/admin/product/new').post(createProduct);
productRouter.route('/products').get(isAuthenticatedUser, getProducts);
productRouter.route('/products/:id').get(singleProduct);
productRouter
  .route('/admin/products/:id')
  .patch(updateProducts)
  .delete(deleteProducts);

export default productRouter;
