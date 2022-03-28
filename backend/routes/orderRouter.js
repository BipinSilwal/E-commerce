import express from 'express';
import {
  getSingleOrder,
  myOrder,
  newOrder,
} from '../controller/orderController.js';
import {
  isAuthenticatedUser,
  isAuthorized,
} from '../middleware/authentication.js';

const orderRouter = express.Router();

// all done by client...
orderRouter.route('/order/new').post(isAuthenticatedUser, newOrder);
orderRouter.route('/order/:id').get(isAuthenticatedUser, getSingleOrder);
orderRouter.route('/orders/me').get(isAuthenticatedUser, myOrder);

export default orderRouter;
