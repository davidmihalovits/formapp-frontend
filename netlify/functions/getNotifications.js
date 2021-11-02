const Notification = require("../models/Notification");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const getNotifications = async (req, res, next) => {
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

    const notificationForSupervisors = await Notification.find({
        recipient: { $elemMatch: { email: verified.user.email } },
    }).sort({ createdAt: -1 });

    if (
        verified.user.role === "Supervisor" ||
        verified.user.role === "TravelerSupervisor"
    ) {
        return {
            statusCode: 200,
            body: JSON.stringify(notificationForSupervisors),
        };
    }

    return {
        statusCode: 200,
        body: JSON.stringify([]),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return getNotifications({ db: db, auth: event.headers });
};
