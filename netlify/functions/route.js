const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Form = require("../models/Form");

const route = async (req, res, next) => {
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

    await Form.updateOne({ _id: req.body.id }, { routing: req.body.routing });

    return {
        statusCode: 200,
        body: JSON.stringify(
            `Routing of this form changed to ${req.body.routing}.`
        ),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return route({
        db: db,
        auth: event.headers,
        body: JSON.parse(event.body),
    });
};