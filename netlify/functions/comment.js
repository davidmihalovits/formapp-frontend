const mongoose = require("mongoose");
const User = require("../models/User");
const Form = require("../models/Form");
const Notification = require("../models/Notification");

const comment = async (req, res) => {
    await Form.updateOne(
        { _id: res.id },
        {
            $push: {
                activity: {
                    commentBy: res.user._id,
                    comment: res.comment,
                    date: new Date(),
                },
            },
        }
    );

    const everyoneExceptOnlyTravelers = await User.find({
        $or: [{ role: "Supervisor" }, { role: "TravelerSupervisor" }],
        email: { $ne: res.user.email },
    });
    let newNotification = await new Notification({
        notification: `${res.user.email} commented on form "${res.formName}".`,
        formId: res.id,
        formName: res.formName,
        read: [],
        recipient: everyoneExceptOnlyTravelers,
    });
    await newNotification.save();

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
