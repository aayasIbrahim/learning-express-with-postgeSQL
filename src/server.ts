import express, {
  type Application,
  type Request,
  type Response,
} from "express";
import config from "./config";
import { Pool } from "pg";
const app: Application = express();
app.use(express.json());
const port = config.port;

const pool = new Pool({
  connectionString: config.connection_string,
});
const initDB = async () => {
  await pool.query(`

     CREATE TABLE IF NOT EXISTS users
     (
        id SERIAL PRIMARY KEY,
        name VARCHAR(20),
        email VARCHAR(30) UNIQUE NOT NULL,
        password VARCHAR(20) NOT NULL,
        is_active BOOLEAN DEFAULT true,
        age INT,

        created_at TIMESTAMP DEFAULT NOW(),
        updated_at TIMESTAMP DEFAULT NOW()
        );
        
        `);
  console.log("Database connected successfully!");
};

initDB();

//P0ST METHOD
app.post("/api/users", async (req: Request, res: Response): Promise<void> => {
  const { name, email, password, age } = req.body;
  try {
    const result = await pool.query(
      `INSERT INTO users(name, email, password, age) VALUES($1, $2, $3, $4) RETURNING *;`,
      [name, email, password, age],
    );

    console.log(result);

    res.status(200).json({
      success: true,
      message: "User Created Successfully",
      data: result.rows[0],
    });
  } catch (error: any) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: error.message,
      error: error,
    });
  }
});
app.get("/api/users", async (req: Request, res: Response): Promise<void> => {
  res.status(200).json({
    message: "hello word",
  });
});

app.get("/api/users/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  console.log(id);
});
app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
