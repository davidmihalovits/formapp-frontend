const User = require("../models/User");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
    const user = await User.findOne({ loginCode: res.code });

    if (user.loginCode !== res.code) {
        return {
            statusCode: 500,
            body: JSON.stringify(`Wrong login code.`),
        };
    }

    await User.updateOne({ loginCode: res.code }, { loginCode: "" });

    var token = jwt.sign({ user: user }, process.env.jwtSecret, {
        expiresIn: "1d",
    });

    return {
        statusCode: 200,
        body: JSON.stringify({ token }),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return login(db, JSON.parse(event.body));
};
