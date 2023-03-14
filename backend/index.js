//entry point
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";
import cli from "cli-color";
import cors from "cors";
import cookieParser from 'cookie-parser';
import morgan from "morgan";
import allRoutes from './routes/index.js';

const PORT = process.env.PORT || 8000;
const app = express();

//middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser())


app.use("/api", allRoutes);

//error handling
app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal server error";

    return res.status(status).json({message, stack: err.stack});
})

const connectionToMDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to mongodb successfully")
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}





app.listen(PORT, ()=> {
    connectionToMDB()
    console.log(cli.red(`server is running at port ${PORT}`))
})