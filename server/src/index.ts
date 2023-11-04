import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import bodyParser from "body-parser";
import { createServer } from "http";

//* Setup Environment Variables
dotenv.config();

const { PORT } = process.env || 8000;
const app = express();
const server = createServer(app);

// Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const swaggerOptions = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: 'SICEF Hackathon API',
        version: '1.0.0',
        description: 'SICEF Hackathon API',
      },
    },
    apis: ['src/routes/*.ts', 'src/index.ts', 'routes/*.ts', 'index.ts'], // adjust the path accordingly
};

const swaggerSpec = swaggerJSdoc(swaggerOptions);
app.use("/swagger-goat", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());

// Root Route
app.get("/", (req: Request, res: Response) =>
  res.status(200).json({ status: "Backend running." })
);

app.get('/health', (req: Request, res: Response) => res.status(200).json({ status: 'Healthy.' }));

//* 404 Route
app.use((req: Request, res: Response) =>
  res.status(404).json({ status: "Page not found." })
);

const initializeApp = async (): Promise<void> => {
    try {
      // server.listen(8001, () => console.log("Socket listening on port 8001"));
      server.listen(PORT, () => console.log(`Backend listening on port ${PORT}`));
    } catch (e) {
      console.log(e);
    }
};
  
initializeApp();