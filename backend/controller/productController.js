import { StatusCodes } from 'http-status-codes';
import { NotFoundError } from '../../errors/not-found.js';
import { BadRequestError } from '../../errors/bad-request.js';
import Product from '../model/productModel.js';
import { apiFeatures } from '../utils/apiFeatures.js';

//creating new Product => /api/v1/product/new

export const createProduct = async (req, res, next) => {
  const product = await Product.create(req.body);

  if (!name || !description || !image) {
    throw new BadRequestError('Please provide all the values');
  }

  res.status(StatusCodes.CREATED).json({
    success: true,
    product,
  });
};

// >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

export const getProducts = async (req, res) => {
  const totalProducts = await Product.countDocuments();
  const limit = 3;
  const apiFeature = new apiFeatures(Product.find(), req.query)
    .searching()
    .filter()
    .pagination(limit);

  // here apiFeature is 'this' return from function inside apiFeatures
  // apiFeature has access to properties and method so we called query properties.
  const products = await apiFeature.query;

  res.status(StatusCodes.OK).json({
    success: true,
    totalProducts,
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
