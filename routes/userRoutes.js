import express from "express";
import {User} from "../Models/userModel.js";
import { accessTokenSecret } from "../secretkey.js";
import path from "path";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// router.get('/', async(req,res) => {
//     res.sendFile(path.join(__dirname, 'public', 'signup.html'));
// })

router.post('/signin', async(req,res) => {
    try{
        const {first_name, last_name, username, email, password} = req.body;
    if(!first_name || !last_name || !username || !email || !password){
        return res.status(400).send({message: "Send all the required fields"})
    }
    const hashedPassword = await bcrypt.hash(password,10);
    const newUser = {
        first_name: first_name,
        last_name: last_name,
        username: username,
        email: email,
        password: hashedPassword
    }
    const user = await User.create(newUser);
    return res.status(201).send({message: "User Registered Successfully"});
    }
    catch(err){
        res.status(501).send({message: err.message})
    }
})

router.post('/login', async(req,res) => {
    try{
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user) {
            return res.status(400).send({message: "Login Failed"})
        }
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(!passwordMatch){
            return res.status(400).send({message: "Password is incorrect"})
        }
        const accessToken = jwt.sign({username: user.username, password: user.password}, accessTokenSecret);
        return res.status(200).json({username,accessToken});

    }
    catch(err) {
        return res.status(500).send({message: err.message});
    }
})

export default router;