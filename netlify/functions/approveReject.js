const Form = require("../models/Form");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Activity = require("../models/Activity");
const moment = require("moment");

const approveReject = async (req, res, next) => {
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

    await Form.updateOne(
        { _id: req.body.formDetails._id },
        { approved: req.body.approved }
    );

    await Form.updateOne(
        { _id: req.body.formDetails._id },
        { comment: req.body.comment }
    );

    await Form.updateOne(
        { _id: req.body.formDetails._id },
        { approvalBy: verified.user.email }
    );

    await Activity.updateOne(
        { form: req.body.formDetails._id },
        {
            $push: {
                activity: {
                    signedBy: req.body.email,
                    date: moment().format("MMMM Do YYYY, h:mm:ss a"),
                },
            },
        }
    );

    return {
        statusCode: 200,
        body: JSON.stringify(
            `Form ${req.body.formDetails.formName} ${req.body.approved}`
        ),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return approveReject({
        db: db,
        auth: event.headers,
        body: JSON.parse(event.body),
    });
};
