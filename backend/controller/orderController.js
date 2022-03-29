import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../errors/not-found.js';
import { BadRequestError } from '../errors/bad-request.js';
import Order from '../model/orderModel.js';
import Product from '../model/productModel.js';

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
    createdBy: req.user._id, // logged in user id information.
  });

  res.status(StatusCodes.OK).json({
    success: true,
    order,
  });
};

export const getSingleOrder = async (req, res) => {
  // when user looks at single order they also get their information..
  const order = await Order.findById(req.params.id).populate(
    'createdBy',
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
  // we get user information through which we search in database the order..

  const order = await Order.find(req.user._id);

  if (!Order) {
    throw new NotFoundError('No order found with this ID');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    order,
  });
};

export const allOrders = async (req, res) => {
  // we find all the document object of that particular user..
  const order = await Order.find();

  // totalAmt = 0 , item is same as callback function in other array method.
  // item returns us object in an array.
  const totalAmount = order.reduce((totalAmt, item) => {
    // each items have totalPrice which we calculate to get total..
    return (totalAmt += item.totalPrice);
  }, 0);

  res.status(StatusCodes.OK).json({
    success: true,
    totalAmount,
    order,
  });
};

export const updateOrder = async (req, res) => {
  // admin click on order and get id.
  const order = await Order.findById(req.params.id);

  // if in document we get delivered throw an Error..
  if (order.orderStatus === 'Delivered') {
    throw new BadRequestError('You have already delivered this order');
  }

  // we save our product and order document with with clearing our stock..
  order.orderItems.forEach(async (item) => {
    await updateStock(item.product, item.quantity);
  });

  order.orderStatus = req.body.status;
  order.deliveredAt = Date.now();

  await order.save();

  res.status(StatusCodes.OK).json({
    success: 'true',
    message: 'updated Order Successfully!!',
  });
};

async function updateStock(id, quantity) {
  const product = await Product.findById(id);
  product.stock = product.stock - quantity;

  await product.save({ validateBeforeSave: false });
}

//......................................deleteOrder...................

export const deleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);

  if (!order) {
    throw new BadRequestError('No such Order found!! with this ID..');
  }

  await order.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: 'Order deleteOrder',
  });
};
