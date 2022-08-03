import {Router} from "express";
import Sale from "../models/Sale.js";
import SaleController from "../controllers/sale.controllers.js";
const router = Router()


router.post("/sales", SaleController.create)
router.get("/sales", SaleController.getAll)
router.get("/sales/:id", SaleController.getOne)
router.put("/sales", SaleController.update)
router.delete("/sales/:id", SaleController.delete)

export default router