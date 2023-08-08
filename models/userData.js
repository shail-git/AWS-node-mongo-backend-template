import mongoose from "mongoose";

const CartItem = new mongoose.Schema({
  pid: String,
  name: String,
  variant: String,
  img: String,
  mrp: Number,
  price: Number,
  quantity: Number,
  subtotal: Number,
});

const Address = new mongoose.Schema({
  line1: String,
  line2: String,
  city: String,
  pincode: Number,
});

const Order = new mongoose.Schema({
  oid: String,
  uid: String,
  status: String,
  fullname:String,
  totalAmount: Number,
  totalQuantity: Number,
  items: [CartItem],
  diliveryAddress: Address,
});

const User = new mongoose.Schema({
  firstname: String,
  lastname: String,
  phone: { type: String, unique: true, required: true, dropDups: true },
  email: String,
  password: String,
  city:String,
  area:String,
  pincode:String,
  cart: [CartItem],
  Orders: [Order],
});

const UserData = mongoose.model("UserData", User);
export default UserData;
