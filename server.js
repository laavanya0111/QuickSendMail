
import express from "express";
// import path from "path";
import nodemailer from "nodemailer";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from 'cors';
import { mongoDBURL } from "./config.js";
import userRoutes from './routes/userRoutes.js';
import emailRoutes from './routes/emailRoutes.js'
const app = express();

// app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(cors());

app.use('/user', userRoutes);
app.use('/email', emailRoutes);


mongoose.connect(mongoDBURL)
.then(() => {
    console.log("Database is connected");
    app.listen(3000, () => {
        console.log("Server is running on port 3000");
    })
})
.catch((error) => {
    console.log(error);
})