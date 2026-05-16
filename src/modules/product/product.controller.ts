import type { Request, Response } from "express";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  // const { name, price, stock } = req.body;
  try {
    const result = await productService.createProductIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Product Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const getAllProduct = async (req: Request, res: Response) => {
  try {
    const result = await productService.getAllProductFromDB();
    res.status(200).json({
      success: true,
      message: "Products Retrived Successfully",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const getSingleProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await productService.getSingleProducFromDB(id as string);

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "User Not found!",
        data: {},
      });
    }
    res.status(200).json({
      success: true,
      message: "User Found Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  // const { name, price, stock } = req.body;
  try {
    const result = await productService.updateProductFromDB(
      req.body,
      id as string,
    );
    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Product Not found!",
      });
    }

    // console.log(result);
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await productService.deleteProductFormDB(id as string);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Product Not found!",
      });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: {},
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
export const productController = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
};
