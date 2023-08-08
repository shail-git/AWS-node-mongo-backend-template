import mongoose from "mongoose";

const Banner = new mongoose.Schema({
  ban1: [Object],
  ban2: [Object],
  ban3: [Object],
  pinBan:[Object],
});


const BannerData = mongoose.model("BannerData", Banner);
export default BannerData;
