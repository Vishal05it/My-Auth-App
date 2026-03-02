const jwt = require("jsonwebtoken");

let verifyUser = async (req, res, next) => {
    try {
        const SECRET_KEY = process.env.SECRET_KEY;
        let token = req.header("userToken");
        if (!token) {
            res.status(400).send({
                message: "Unauthorized, Please login!",
                success: false,
                status: 400
            })
            return;
        }
        let decode = jwt.verify(token, SECRET_KEY);
        if (!decode) {
            res.status(400).send({
                message: "Invalid Token, Please login again!",
                success: false,
                status: 400
            })
            return;
        }
        req.userId = decode.userId;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Token expired, Please login again!",
            success: false,
            status: 401
        })
        return;
    }
}
module.exports = verifyUser;