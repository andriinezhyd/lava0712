import Sale from "../models/Sale.js";
import SaleServices from "../services/sale.services.js";

class SaleControllers {
  async create(req, res) {
    try {
      const sale = await SaleServices.create(req.body)
      res.json(sale)
    } catch (e) {
      res.status(500).json(e)
    }
  }

  async getAll(req, res) {
    try {
      const sales = await SaleServices.getAll()
      return res.json(sales)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async getOne(req, res) {
    try {
      const sale = await SaleServices.getOne(req.params.id)
      return res.json(sale)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async update(req, res) {
    try {
      const updatedSale = await SaleServices.update(req.body)
      return res.json(updatedSale)
    } catch (e) {
      res.status(500).json(e)
    }
  }
  async delete(req, res) {
    try {
      const sale = await SaleServices.delete(req.params.id)
      return res.json(sale)
    } catch (e) {
      res.status(500).json(e.message)
    }
}
}
export default new SaleControllers()
