import express from "express";
import nodemailer from "nodemailer";
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const config = {
            service: "gmail",
            host: "smtp@gmail.com",
            port: 587,
            secure: true,
            auth: {
                user: "your@gmail.com",
                pass: "yourpassword",
            },
        };
        const transporter = nodemailer.createTransport(config);
        const { from, to, subject, text } = req.body;
        if (!to || !text) {
            return res.status(400).send({ message: "Fill the required fields!" })
        }
        const newEmail = {
            from: "your@gmail.com",
            to: to,
            subject: subject,
            text: text
        }
        const mail = await transporter.sendMail(newEmail);
        return res.status(201).send({message: "Mail Sent!"}); 
    }
    catch(err) {
        return res.status(500).send({message: err.message});
    }
})

export default router;