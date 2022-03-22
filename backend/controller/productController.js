import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../../errors/not-found.js';
import Product from '../model/productModel.js';

//creating new Product => /api/v1/product/new

export const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  res.status(StatusCodes.CREATED).json({
    success: true,
    product,
  });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.status(StatusCodes.OK).json({
    success: true,
    productCount: products.length,
    products,
  });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const singleProduct = async (req, res) => {
  // we get id from params. which is from url. req has access to url.
  const product = await Product.findById(req.params.id);

  if (!product) {
    throw new NotFoundError('No such Products');
  }

  res.status(StatusCodes.OK).json({
    success: true,
    product,
  });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const updateProducts = async (req, res) => {
  // we get id from params. which is from url. req has access to url.
  const { id: productId } = req.params;

  // finding that id in database..

  let product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError('No such Products');
  }

  product = await Product.findByIdAndUpdate({ _id: productId }, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json({
    success: true,
    product,
  });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const deleteProducts = async (req, res) => {
  // we get id from params. which is from url. req has access to url.
  const { id: productId } = req.params;

  // finding that id in database..

  let product = await Product.findOne({ _id: productId });

  if (!product) {
    throw new NotFoundError('No such Products');
  }

  // remove the document from database...
  await product.remove();

  res.status(StatusCodes.OK).json({
    success: true,
    message: `deleted product!!`,
  });
};
