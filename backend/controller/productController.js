import { StatusCodes } from 'http-status-codes';
import Product from '../model/productModel.js';

//creating new Product => /api/v1/product/new

export const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(StatusCodes.OK).json({
    success: true,
    product,
  });
};

export const getProducts = (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Hello there!!',
  });
};
