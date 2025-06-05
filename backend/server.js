import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js"
import jobRoutes from "./routes/job.route.js"
import applicationRoute from "./routes/job.application.route.js"
import { connectDb } from "./lib/db.js";
import path from 'path'

const app = express();
dotenv.config()
 

// Enable CORS
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true
}));

// middleware 
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRoutes)
app.use("/api/job",jobRoutes)
app.use("/api/applications",applicationRoute)

// ✅ Serve static files from the uploads folder
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));
const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get(/.*/, (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}


 
const PORT = process.env.PORT || 5000
app.listen(PORT, ()=> {
  console.log("Server is running on This Port : 5000 ")
  connectDb();
})


 