import express from 'express';
import { newOrder } from '../controller/orderController.js';
import {
  isAuthenticatedUser,
  isAuthorized,
} from '../middleware/authentication.js';

const orderRouter = express.Router();

orderRouter.route('/order/new').post(isAuthenticatedUser, newOrder);

export default orderRouter;
