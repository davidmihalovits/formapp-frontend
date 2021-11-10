const mongoose = require("mongoose");
const User = require("../models/User");
const Form = require("../models/Form");
const jwt = require("jsonwebtoken");

const getForm = async (req, res, next) => {
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

    const form = await Form.findOne({ _id: req.id }).populate({
        path: "creator approvalBy activity.viewedBy activity.signedBy activity.editedBy activity.commentBy",
        model: "users",
    });

    return {
        statusCode: 200,
        body: JSON.stringify(form),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return getForm({
        db: db,
        auth: event.headers,
        id: event.queryStringParameters.id,
    });
};
