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

    if (req.body.routingPending === "notify") {
        await Form.updateOne(
            { _id: req.body.id },
            {
                COnotify: true,
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(`Routed to CO ${req.body.routingPending}.`),
        };
    }
    if (req.body.routingPending === "concurrence") {
        await Form.updateOne(
            { _id: req.body.id },
            {
                COconcurrence: true,
            }
        );

        return {
            statusCode: 200,
            body: JSON.stringify(`Routed to CO ${req.body.routingPending}.`),
        };
    }

    await Form.updateOne(
        { _id: req.body.id },
        {
            $push: {
                routingPending: req.body.routingPending,
            },
        }
    );

    if (req.body.routingPending === "CO" && req.body.messageToCO) {
        await Form.updateOne(
            { _id: req.body.id },
            {
                messageToCO: req.body.messageToCO,
            }
        );
    }

    await Form.updateOne(
        { _id: req.body.id },
        {
            $push: {
                activity: {
                    routedTo: req.body.routingPending,
                    routedBy: req.body.routedBy._id,
                    date: new Date(),
                },
            },
        }
    );

    return {
        statusCode: 200,
        body: JSON.stringify(`Routed to ${req.body.routingPending}.`),
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
