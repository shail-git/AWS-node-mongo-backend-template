import mongoose from "mongoose";

const Categories = new mongoose.Schema({
  data: Object,
  message:String,
  img: Object,
});


const CategoriesData = mongoose.model("CategoriesData", Categories);
export default CategoriesData;
