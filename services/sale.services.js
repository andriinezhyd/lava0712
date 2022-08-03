import Sale from "../models/Sale.js";

class SaleServices {
  async create(sale) {
      const createdSale = await Sale.create(sale)
      return createdSale
  }

  async getAll() {
      const sales = await Sale.find()
      return sales
  }
  async getOne(id) {
      if (!id) {
         throw new Error("Такого ID нет")
      }
      const sale = await Sale.findById(id)
      return sale
  }
  async update(sale) {
      if(!sale._id) {
        throw new Error("Такого ID нет")
      }
      const updatedSale = await Sale.findByIdAndUpdate(sale._id, sale, {new: true})
      return updatedSale
  }
  async delete(id) {
      if(!id) {
        throw new Error("Такого ID нет")
      }
      const sale = await Sale.findByIdAndDelete(id)
      return sale
  }
}

export default new SaleServices()