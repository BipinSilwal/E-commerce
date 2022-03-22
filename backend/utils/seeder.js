import Product from '../model/productModel.js';
import dotenv from 'dotenv';
import connectDb from '../config/dbConnection.js';
import { readFile } from 'fs/promises';

dotenv.config({ path: 'backend/config/config.env' });

const sampleProducts = async () => {
  try {
    connectDb();
    // using collection call Product to delete document if there is any..
    await Product.deleteMany();
    console.log('Products are deleted');

    const products = JSON.parse(
      await readFile(new URL('../data/product.json', import.meta.url))
    );

    // inserting document inside the collection..
    await Product.insertMany(products);
    console.log('All products are added');
    // if success process exit without error or any issues.
    process.exit(0);
  } catch (error) {
    console.log(error.message);
    // if error process exit..
    process.exit(1);
  }
};

sampleProducts();
