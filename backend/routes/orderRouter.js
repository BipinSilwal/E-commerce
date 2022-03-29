import express from 'express';
import {
  allOrders,
  deleteOrder,
  getSingleOrder,
  myOrder,
  newOrder,
  updateOrder,
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
orderRouter
  .route('/admin/orders')
  .get(isAuthenticatedUser, isAuthorized('admin'), allOrders);
orderRouter
  .route('/admin/order/:id')
  .patch(isAuthenticatedUser, isAuthorized('admin'), updateOrder);
orderRouter
  .route('/admin/order/:id')
  .delete(isAuthenticatedUser, isAuthorized('admin'), deleteOrder);

// all done by admin...

export default orderRouter;
