import { Router } from "express";
import { productController } from "./product.controller";
const router = Router();

router.post("/", productController.createProduct);
router.get("/", productController.getAllProduct);
router.get("/:id", productController.getSingleProduct);
router.put("/:id", productController.updateProduct);
router.delete("/:id", productController.deleteProduct);

export const productRouter = router;
