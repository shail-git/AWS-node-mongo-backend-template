import ProductData from "../models/productData.js";
import mongoose from "mongoose";

export const getProducts = async (req, res) => {
  try {
    // const productData = await ProductData.find({}, {"Products": {$slice: [0, 150] }});
    const productData = await ProductData.find();
    // console.log("product data:",productData);
    res.status(200).json(productData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const createProduct = async (req, res) => {
  const product = req.body;
  const newProduct = new ProductData(product);

  try {
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  const { id: _id } = req.params;
  const product = req.body;
  if (!mongoose.Types.ObjectId.isValid(_id))
    return res.status(404).send("No Product with that id");
  try {
    const updatedProduct = await ProductData.findByIdAndUpdate(_id, {...product, _id}, {
      new: true,
    });
    // console.log("updatedProd:",updatedProduct);
    res.json(updatedProduct);
  } catch(error){
    res.status(409).json({ message: error });
  }
};
