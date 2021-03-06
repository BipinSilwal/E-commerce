import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  names: {
    type: String,
    required: [true, 'Please enter product Name'],
    trim: true,
    maxLength: [100, 'Product name cannot exceed 100 characters'],
  },

  price: {
    type: Number,
    required: [true, 'Please enter price'],
    maxLength: [5, 'Price  cannot exceed 5 characters '],
    default: 0.0,
  },
  description: {
    type: String,
    required: [true, 'Please enter product description'],
  },
  ratings: {
    type: Number,
    default: 0.0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  seller: {
    type: String,
    required: true,
  },
  stock: {
    type: Number,
    required: [true, 'Please enter product stock'],
    maxLength: [5, 'Product name cannot exceed 5 characters'],
    default: 0,
  },
  numOfReviews: {
    type: Number,
    default: 0.0,
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: [true, 'Please provide user'],
  },
  reviews: [
    {
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  category: {
    type: String,
    required: [true, 'Please select category fort this product'],
    enum: {
      values: [
        'Electronics',
        'Cameras',
        'Laptops',
        'Accessories',
        'Headphones',
        'Food',
        'Books',
        'Clothes/Shoes',
        'Beauty/Health',
        'Sports',
        'Outdoor',
        'Home',
      ],
      message: 'Please select correct category for product',
    },
  },
});

const Product = mongoose.model('Product', productSchema);

export default Product;
