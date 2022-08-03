import mongoose from "mongoose"

const Sale = new mongoose.Schema({
  link: {type: String, required: true},
  address: {type: String, required: true},
  fullname: {type: String, required: true},
  phone: {type: String, required: true},
  paid: {type: Number, required: true},
  telegramId: {type: Number, required: true},
  date: {type: String, required: true},
  product: {type: String, required: true},
})

export default mongoose.model("Sale", Sale)
