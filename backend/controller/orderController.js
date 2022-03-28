import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/not-found.js';
import Order from '../model/orderModel.js';

export const newOrder = async (req, res) => {
  // order created by the client...
  const {
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
  } = req.body;

  const order = await Order.create({
    orderItems,
    shippingInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id, // logged in user id information.
  });

  res.status(StatusCodes.OK).json({
    success: true,
    order,
  });
};

export const getSingleOrder = async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'userName email'
  );

  if (!Order) {
    throw new NotFoundError('No order found with this ID');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    order,
  });
};

export const myOrder = async (req, res) => {
  const { user } = req.user._id;

  const order = await Order.find(user);

  if (!Order) {
    throw new NotFoundError('No order found with this ID');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    order,
  });
};
