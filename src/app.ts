
import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import {pool } from "./db"
import config from "./config";
import { userRoutes } from "./modules/user/user.router";

const app: Application = express();


app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/users",userRoutes)


app.get("/", (req: Request, res: Response) => {
  //res.send("Hello World!");
  res.status(200).json({
    message: "Express Server Runing",
    author: "Ayas Ibrahim",
  });
});



app.post("/api/products", async (req: Request, res: Response) => {
  const { name, price, stock } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO products (name,price,stock) VALUES($1,$2,$3) RETURNING *`,
      [name, price, stock],
    );
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
});


app.get("/api/products", async (req: Request, res: Response) => {
  try {
    const result = await pool.query(`
      SELECT * FROM products
      `);
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
});



app.get("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`SELECT * FROM products WHERE id=$1`, [id]);

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
});


app.put("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, price, stock } = req.body;
  try {
    const result = await pool.query(
      `UPDATE  products
       SET
        name=COALESCE($1,name) ,
        price=COALESCE($2,price),
         stock=COALESCE($3,stock)
          WHERE id=$4 RETURNING *`,
      [name, price, stock, id],
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
});


app.delete("/api/products/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const result = await pool.query(`DELETE  FROM products WHERE id=$1`, [id]);

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
});

export default app;
