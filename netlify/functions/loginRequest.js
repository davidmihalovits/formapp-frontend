const User = require("../models/User");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const { google } = require("googleapis");

const loginRequest = async (req, res) => {
    const user = await User.findOne({ credential: res.credential });

    if (!user) {
        return {
            statusCode: 500,
            body: JSON.stringify(`User not found.`),
        };
    }

    const CLIENT_ID = process.env.CLIENT_ID;
    const CLIENT_SECRET = process.env.CLIENT_SECRET;
    const REDIRECT_URI = process.env.REDIRECT_URI;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN;

    const oAuth2Client = new google.auth.OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

    const accessToken = await oAuth2Client.getAccessToken();

    const code = Math.floor(1000 + Math.random() * 10009000);

    const mailOptions = {
        from: "Travel PWA",
        to: res.credential,
        subject: "Login code",
        html: `Login code: ${code}`,
    };

    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            type: "OAuth2",
            user: "dev@webabstract.io",
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken,
        },
    });

    transporter.sendMail(mailOptions, (err, data) => {
        try {
            return {
                statusCode: 200,
                body: JSON.stringify(`Login code sent to ${res.credential}.`),
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify("Login code couldn't be sent."),
            };
        }
    });

    await User.updateOne({ email: res.credential }, { loginCode: code });

    return {
        statusCode: 200,
        body: JSON.stringify(`Login code sent to ${res.credential}.`),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return loginRequest(db, JSON.parse(event.body));
};
