const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "business.tiwarijieditz@gmail.com",
        pass: "wpcs oznf jgai qbju"
    }
});
module.exports = transport;