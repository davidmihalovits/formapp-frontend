const Form = require("../models/Form");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const getForms = async (req, res, next) => {
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

    const forms = await Form.find().sort({ updatedAt: -1 });

    const formsForTravelers = await Form.find({
        email: verified.user.email,
    }).sort({ updatedAt: -1 });

    if (
        verified.user.role === "Supervisor" ||
        verified.user.role === "TravelerSupervisor"
    ) {
        return {
            statusCode: 200,
            body: JSON.stringify(forms),
        };
    }

    if (verified.user.role === "Traveler") {
        return {
            statusCode: 200,
            body: JSON.stringify(formsForTravelers),
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

    return getForms({ db: db, auth: event.headers });
};
