import express, {
  type Application,
  type NextFunction,
  type Request,
  type Response,
} from "express";
  import CookieParser from "cookie-parser";
import { userRoute } from "./modules/user/user.route";
import { productRoute } from "./modules/product/product.route";
import { profileRoute } from "./modules/profile/profile.route";
import { authRouter } from "./modules/auth/auth.route";
import { logger } from "./middleware/logger";

const app: Application = express();

app.use(CookieParser())
app.use(express.json()); //built In middleware
app.use(express.text()); //built In middleware
app.use(express.urlencoded({ extended: true })); //built In middleware
app.use(logger); //custom middleware
app.get("/", (req: Request, res: Response) => {
  res.status(200).json({
    message: "Express Server Runing",
    author: "Ayas Ibrahim",
  });
});

app.use("/api/users", userRoute);
app.use("/api/products", productRoute);
app.use("/api/profile", profileRoute);
app.use("/api/auth", authRouter);

export default app;
