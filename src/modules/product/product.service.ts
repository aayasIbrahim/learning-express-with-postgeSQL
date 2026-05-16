import { pool } from "../../db";
import type { IProduct } from "./product.interface";

const createProductIntoDB = async (payload: IProduct) => {
  const { name, price, stock } = payload;
  const result = await pool.query(
    `INSERT INTO products (name,price,stock) VALUES($1,$2,$3) RETURNING *`,
    [name, price, stock],
  );
  return result;
};
const getAllProductFromDB = async () => {
  const result = await pool.query(`
      SELECT * FROM products
      `);
  return result;
};
const getSingleProducFromDB = async (id: string) => {
  const result = await pool.query(`SELECT * FROM products WHERE id=$1`, [id]);
  return result;
};
const updateProductFromDB = async (payload: IProduct, id: string) => {
  const { name, price, stock } = payload;
  const result = await pool.query(
    `UPDATE  products
       SET
        name=COALESCE($1,name) ,
        price=COALESCE($2,price),
         stock=COALESCE($3,stock)
          WHERE id=$4 RETURNING *`,
    [name, price, stock, id],
  );
  return result;
};
const deleteProductFormDB = async (id: string) => {
  const result = await pool.query(`DELETE  FROM products WHERE id=$1`, [id]);
  return result;
};
export const productService = {
  createProductIntoDB,
  getAllProductFromDB,
  getSingleProducFromDB,
  updateProductFromDB,
  deleteProductFormDB,
};
