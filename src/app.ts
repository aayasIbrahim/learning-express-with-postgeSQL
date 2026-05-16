import express, {
  type Application,
  type Request,
  type Response,
} from "express";

import { userRoute } from "./modules/user/user.route";
import { productRoute } from "./modules/product/product.route";
import { profileRoute } from "./modules/profile/profile.route";

const app: Application = express();

app.use(express.json());
// app.use(express.text());
// app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  //res.send("Hello World!");
  res.status(200).json({
    message: "Express Server Runing",
    author: "Ayas Ibrahim",
  });
});

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/profile",profileRoute)

export default app;
