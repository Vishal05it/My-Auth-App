const express = require("express");
const userRouter = express.Router();
const bcrypt = require("bcryptjs");
const transporter = require("../mailer");
let jwt = require("jsonwebtoken");
const userModel = require("../Schema/user.model");
userRouter.post("/signup", async (req, res) => {
    try {
        let { email, password, name, age, bio, profilepic } = req.body
        let userExist = await userModel.findOne({ email });
        if (userExist) {
            res.status(400).send({
                message: "User already registered!",
                success: false,
                status: 400
            })
            return;
        }
        let salt = await bcrypt.genSalt(10);
        let hashPassword = await bcrypt.hash(password, salt);
        let newUser = await userModel.create({ email, password: hashPassword, name, age, bio, profilepic });
        let sendUser = await userModel.findById(newUser._id).select("-password");
        let message = {
            from: "business.tiwarijieditz@gmail.com",
            to: newUser.email,
            subject: "Welcome to My Authentication App – Account Successfully Created",
            text: `Hi ${newUser.name}, Welcome to My Authentication App Your account has been successfully created using this email address.You can now log in and start exploring the platform. If you did not create this account, please ignore this email.Thank you for joining us. 
            Best regards,Team My Authentication App.`
        }
        transporter.sendMail(message, (err, info) => {
            if (err) console.log("Error while sending the mail", err);
            console.log("Mail sent successgully", info);
        })
        res.status(200).send({
            message: "Account created successfully!",
            success: true,
            status: 200,
            sendUser
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false,
            status: 500
        })
    }
})
userRouter.post("/login", async (req, res) => {
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email });
        if (!user) {
            res.status(400).send({
                message: "Email not found!",
                success: false,
                status: 400,
            })
            return;
        }
        let passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            res.status(400).send({
                message: "Invalid Credentials!",
                success: false,
                status: 400,
            })
            return;
        }
        let sendUser = await userModel.findById(user._id).select("-password")
        let token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY)
        res.status(200).send({
            message: "Logged in successfully!",
            success: true,
            status: 200,
            user: sendUser,
            token
        })
    } catch (error) {
        console.log(error);
        // let errorFound = Object.values(error?.errors)[0]?.properties?.message;
        res.status(500).send({
            message: "Internal Server Error!",
            success: false,
            status: 500
        })
    }
})
userRouter.get("/profile", require("../Middlewares/verifyUser.middleware"), async (req, res) => {
    try {

        let user = await userModel.findById(req.userId).select("-password");
        if (!user) {
            res.status(400).send({
                message: "User not found!",
                success: false,
                status: 400,
            })
            return;
        }
        res.status(200).send({
            message: "Account fetched successfully!",
            success: true,
            status: 200,
            user,

        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: "Internal Server Error!",
            success: false,
            status: 500
        })
    }
})
module.exports = userRouter;