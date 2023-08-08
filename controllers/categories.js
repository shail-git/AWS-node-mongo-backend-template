import CategoriesData from "../models/CategoriesData.js";
import mongoose from "mongoose";

export const getCategories = async (req, res) => {
  try {
    const categoriesData = await CategoriesData.find();
    // console.log("Categories data:",categoriesData);
    res.status(200).json(categoriesData);
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: error });
  }
};

export const updateCategories = async (req, res) => {
    const { id: _id } = req.params;
    const Categories = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No Categories with that id");
    try {
      const updatedCategories = await CategoriesData.findByIdAndUpdate(_id, {...Categories, _id}, {
        new: true,
      });
      // console.log("updatedProd:",updatedCategories);
      res.json(updatedCategories);
    } catch(error){
      res.status(409).json({ message: error });
    }
  };