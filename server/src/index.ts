import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import swaggerJSdoc from 'swagger-jsdoc';
import bodyParser from "body-parser";
import cors from 'cors';

import authRouter from "./routes/auth.routes";
import ticketRouter from "./routes/ticket.routes"
import containerRouter from "./routes/container.routes"
import { createServer } from "http";
import { Server } from "socket.io";

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

//* Setup Environment Variables
dotenv.config();

const { PORT } = process.env || 8000;
const app = express();
const server = createServer(app);

const swaggerSpec = swaggerJSdoc(swaggerOptions);
app.use("/swagger-goat", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use(bodyParser.json());

//* Middleware
app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

const io = new Server(server, {
  cors: {
    origin: "*", // Replace with your frontend URL
    methods: ["GET", "POST"],
    allowedHeaders: ["my-custom-header"],
    credentials: true,
  },
});

io
  .of("/goat-chat")
  .on("connection", (socket) => {
  console.log("a user connected", socket.id);

  socket.on("join_room", (roomId) => {
    socket.join(roomId);
    console.log(`user with id-${socket.id} joined room - ${roomId}`);
  });

  socket.on("send_msg", (data) => {
    console.log(`User ${socket.id} has sent a message "${data}"`);
    socket.to(data.roomId).emit("receive_msg", data);
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected:", socket.id);
  });
});

//* Root Route
app.get("/", (req: Request, res: Response) =>
  res.status(200).json({ status: "Backend running." })
);
app.get("/test", (req: Request, res: Response) =>
  res.status(200).json({ status: "RI SPONS." })
);
//* Use Routes
app.use("/api/auth", authRouter);
app.use("/api/ticket", ticketRouter);
app.use("/api/container", containerRouter);

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