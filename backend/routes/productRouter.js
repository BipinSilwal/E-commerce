import express from 'express';
import { createProduct, getProducts } from '../controller/productController.js';

// it helps to create chaining method for same route handler.
const productRouter = express.Router();

// chaining is done here with route handler.
productRouter.route('/products').get(getProducts);
productRouter.route('/products').post(createProduct);

export default productRouter;
