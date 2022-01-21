const mongoose = require("mongoose");
const User = require("../models/User");
const Form = require("../models/Form");
const Notification = require("../models/Notification");
const jwt = require("jsonwebtoken");

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

    if (req.body.user.supervisorRole === "CO") {
        await Form.updateOne(
            { _id: req.body.formDetails._id },
            {
                approved: req.body.approved,
                comment: req.body.comment,
                approvalBy: req.body.user._id,
            }
        );
    }

    await Form.updateOne(
        { _id: req.body.formDetails._id },
        {
            $push: {
                activity: {
                    signedBy: req.body.user._id,
                    approved: req.body.approved,
                    comment: req.body.comment,
                    date: new Date(),
                },
            },
        }
    );

    if (req.body.approved === "approved") {
        await Form.updateOne(
            { _id: req.body.formDetails._id },
            {
                $push: {
                    routingApproved: req.body.user.supervisorRole,
                },
                $pull: {
                    routingPending: req.body.user.supervisorRole,
                    routingRejected: req.body.user.supervisorRole,
                },
            }
        );
    }
    if (req.body.approved === "rejected") {
        await Form.updateOne(
            { _id: req.body.formDetails._id },
            {
                $push: {
                    routingRejected: req.body.user.supervisorRole,
                },
                $pull: {
                    routingPending: req.body.user.supervisorRole,
                    routingApproved: req.body.user.supervisorRole,
                },
            }
        );
    }

    const onlyForCreator = await User.find({
        email: req.body.formDetails.email,
    });
    let newNotification = await new Notification({
        notification: `${req.body.user.email} signed your form "${req.body.formDetails.formName}".`,
        formId: req.body.formDetails._id,
        formName: req.body.formDetails.formName,
        read: [],
        recipient: onlyForCreator,
    });
    await newNotification.save();

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
