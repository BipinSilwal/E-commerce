import express from 'express';
import {
  createProduct,
  getProducts,
  singleProduct,
  updateProducts,
} from '../controller/productController.js';

// it helps to create chaining method for same route handler.
const productRouter = express.Router();

// chaining is done here with route handler.
productRouter.route('/product/new').post(createProduct);
productRouter.route('/products').get(getProducts);
productRouter.route('/products/:id').get(singleProduct);
productRouter.route('/admin/product/:id').patch(updateProducts);

export default productRouter;
