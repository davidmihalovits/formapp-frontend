const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const getUser = async (req, res, next) => {
    const token = req.auth.authorization;

    if (!token) {
        return {
            statusCode: 401,
            body: JSON.stringify("No token"),
        };
    }

    const verified = jwt.verify(token, process.env.jwtSecret);

    if (!verified) {
        return {
            statusCode: 401,
            body: JSON.stringify("No token, or invalid."),
        };
    }

    const user = await User.findOne({ email: verified.user.email });

    return {
        statusCode: 200,
        body: JSON.stringify(user),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return getUser({ db: db, auth: event.headers });
};
