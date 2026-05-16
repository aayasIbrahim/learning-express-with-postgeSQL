
import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoutes } from "./modules/user/user.router";
import { productRouter } from "./modules/product/product.router";

const app: Application = express();


app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded({ extended: true }));
app.use("/api/users",userRoutes)
app.use("/api/products",productRouter)


app.get("/", (req: Request, res: Response) => {
  //res.send("Hello World!");
  res.status(200).json({
    message: "Express Server Runing",
    author: "Ayas Ibrahim",
  });
});










export default app;
