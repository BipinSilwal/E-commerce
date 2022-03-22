import express from 'express';
import { getProducts } from '../controller/productController.js';

// it helps to create chaining method for same route handler.
const productRouter = express.Router();

// chaining is done here with route handler.
productRouter.route('/products').get(getProducts);

export default productRouter;
