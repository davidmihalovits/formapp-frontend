const Notification = require("../models/Notification");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const readNotification = async (req, res, next) => {
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

    const alreadyRead = await Notification.findOne({ _id: req.body.id });

    if (alreadyRead.read.includes(req.body.user.email)) {
        return {
            statusCode: 200,
            body: JSON.stringify("Already read this notification."),
        };
    }

    await Notification.updateOne(
        { _id: req.body.id },
        { read: req.body.user.email }
    );

    return {
        statusCode: 200,
        body: JSON.stringify("Notification read."),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return readNotification({
        db: db,
        auth: event.headers,
        body: JSON.parse(event.body),
    });
};
