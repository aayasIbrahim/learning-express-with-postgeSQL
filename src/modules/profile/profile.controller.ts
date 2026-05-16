import type { Request, Response } from "express";
import { productService } from "../product/product.service";
import { profileService } from "./profile.service";

const createProfile = async (req: Request, res: Response) => {
  try {
    const result = await profileService.createUserIntoDB(req.body);
    res.status(201).json({
      success: true,
      message: "Profile created successfully!",
      data: result?.rows[0],
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
};
const getProfile = async () => {};
export const profileController = {
  createProfile,
  getProfile,
};
