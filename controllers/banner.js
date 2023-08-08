import BannerData from "../models/bannerData.js";
import mongoose from "mongoose";

export const getBanner = async (req, res) => {
  try {
    const bannerData = await BannerData.find();
    // console.log("Banner data:",bannerData);
    res.status(200).json(bannerData);
  } catch (error) {
    res.status(404).json({ message: error });
  }
};

export const updateBanner = async (req, res) => {
    const { id: _id } = req.params;
    const Banner = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("No Banner with that id");
    try {
      const updatedBanner = await BannerData.findByIdAndUpdate(_id, {...Banner, _id}, {
        new: true,
      });
      // console.log("updatedProd:",updatedBanner);
      res.json(updatedBanner);
    } catch(error){
      res.status(409).json({ message: error });
    }
  };