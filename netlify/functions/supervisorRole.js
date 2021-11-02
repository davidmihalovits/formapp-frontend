const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const supervisorRole = async (req, res, next) => {
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

    await User.updateOne(
        { email: verified.user.email },
        { supervisorRole: req.body.supervisorRole }
    );

    return {
        statusCode: 200,
        body: JSON.stringify(`You picked ${req.body.supervisorRole}.`),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return supervisorRole({
        db: db,
        auth: event.headers,
        body: JSON.parse(event.body),
    });
};
