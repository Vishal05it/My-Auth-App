const dotenv = require("dotenv");
dotenv.config();
const connectToDB = require("./connectToDB");
const express = require("express");
const app = express();
const userRouter = require("./Router/user.router");
const PORT = process.env.PORT || 3000;
const cors = require("cors");
app.use(cors({
    methods: ["GET", "POST", "PUT", "DELETE"],
    origin: ["http://localhost:5173", "http://localhost:5174"]
}))
app.use(express.json());
app.use("/user/api", userRouter);
app.listen(PORT, () => {
    console.log(`Server is running at : http://localhost:${PORT}`)
})
connectToDB();

