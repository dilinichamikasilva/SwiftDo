import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/db";
import authRoutes from "./routes/auth.routes"
import { errorHandler } from "./middleware/errorHandler";
import taskRoutes from "./routes/task.routes";



dotenv.config()

const SERVER_PORT = process.env.PORT
const MONGO_URI = process.env.MONGO_URI as string

const app = express()

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ limit: '10mb', extended: true }));

const allowedOrigins = [process.env.CLIENT_URL, "http://localhost:5173"].filter(Boolean) as string[];

app.use(cors({
  origin: allowedOrigins, 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

app.use("/api/v1/auth" , authRoutes)
app.use("/api/v1/tasks" , taskRoutes)


app.use(errorHandler)

export default app;

connectDB(MONGO_URI).then(() => {
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });
});

