import express from "express"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import testRoutes from "./routes/test.routes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// Test route
app.use("/api/test", testRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port : ${PORT}`));
