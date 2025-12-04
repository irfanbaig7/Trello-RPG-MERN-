import express from "express"
import cors from "cors"
import connectDB from "./config/connectDB.js"
import testRoutes from "./routes/test.routes.js"
import authRoutes from "./routes/auth.route.js"
import protectedRoutes from "./routes/protected.routes.js"
import projectRoutes from "./routes/project.routes.js"

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Connect DB
connectDB();

// routes
app.use("/api/protected", protectedRoutes);
app.use("/api/test", testRoutes)
app.use("/api/auth", authRoutes)
app.use("/api/projects", projectRoutes)

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running on Port : ${PORT}`));
