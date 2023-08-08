import mongoose from "mongoose";

const PriceData = new mongoose.Schema({
  mrp: String,
  price: String,
});

const Variant = new mongoose.Schema({
  ProductVariant: String,
  img: String,
  urls: {
    jiomart: String,
    bigbasket: String,
    amazon: String,
    grofers: String,
    dmart: String,
    grocygo: String,
  },
  Prices: {
    jiomart: PriceData,
    bigbasket: PriceData,
    amazon: PriceData,
    grofers: PriceData,
    dmart: PriceData,
    grocygo: PriceData,
  },
});

const Product = new mongoose.Schema({
  PID: String,
  ProductName: String,
  Variants: [Variant],
  categories: String,
});

const ProductList = new mongoose.Schema({
  Products: [Product],
});

const ProductData = mongoose.model("ProductData", ProductList);

export default ProductData;