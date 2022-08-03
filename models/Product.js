import mongoose from "mongoose"

const Product = new mongoose.Schema({
  id: {type: String, required: true},
  name: {type: String, required: true},
  model: {type: String, required: true},
  color: {type: String, required: true},
  size: {type: String, required: true},
  fabric: {type: String, required: true},
  price: {type: Number, required: true}
})

export default mongoose.model("Product", Product)
