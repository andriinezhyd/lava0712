import Product from "../models/Product.js";

class SaleServices {
  async create(product) {
    const createdSale = await Product.create(product)
    return createdSale
  }

  async getAll() {
    const products = await Product.find()
    return products
  }
  async getOne(id) {
    if (!id) {
      throw new Error("Такого ID нет")
    }
    const product = await Product.findById(id)
    return product
  }
  async update(product) {
    if(!product._id) {
      throw new Error("Такого ID нет")
    }
    const updatedProduct = await Product.findByIdAndUpdate(product._id, product, {new: true})
    return updatedProduct
  }
  async delete(id) {
    if(!id) {
      throw new Error("Такого ID нет")
    }
    const product = await Product.findByIdAndDelete(id)
    return product
  }
}

export default new ProductServices()