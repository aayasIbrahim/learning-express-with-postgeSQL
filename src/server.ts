import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import { Pool } from "pg";
const app: Application = express();
const port = 3000;
const pool = new Pool();
app.use(express.json());

app.get("/api/users", async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "hello word",
  });
});
app.post("/api/users", (req: Request, res: Response) => {
  const { name, age } = req.body;
  res.status(200).json({
    name: name,
    age: age,
  });

  console.log(name, age);
});
app.get("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
