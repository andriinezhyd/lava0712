import {Router} from "express";
import ProductController from "../controllers/product.controllers.js";
const router = Router()


router.post("/products", ProductController.create)
router.get("/products", ProductController.getAll)
router.get("/products/:id", ProductController.getOne)
router.put("/products", ProductController.update)
router.delete("/products/:id", ProductController.delete)

export default router