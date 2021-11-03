const Activity = require("../models/Activity");
const Notification = require("../models/Notification");
const mongoose = require("mongoose");

const comment = async (req, res) => {
    await Activity.updateOne(
        { form: res.id },
        {
            $push: {
                activity: {
                    commentBy: res.email,
                    comment: res.comment,
                    date: new Date(),
                },
            },
        }
    );

    return {
        statusCode: 200,
        body: JSON.stringify("Successful comment."),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return comment(db, JSON.parse(event.body));
};
