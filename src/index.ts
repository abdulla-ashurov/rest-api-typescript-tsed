import express, { Application } from "express";
import morgan from "morgan";
import Router from "./routes";
import swaggerUi from "swagger-ui-express";

import swaggerJSONDoc from '../public/swagger.json'

const PORT = process.env.PORT || 8000;

const app: Application = express();

app.use(express.json());
app.use(morgan("tiny"));
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  async (_req: express.Request, res: express.Response) => {
    return res.send(swaggerUi.generateHTML(swaggerJSONDoc))
  }
);

app.use(Router);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
