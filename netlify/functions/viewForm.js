const mongoose = require("mongoose");
const User = require("../models/User");
const Form = require("../models/Form");

const viewForm = async (req, res) => {
    const form = await Form.findOne({ _id: res._id }).populate({
        path: "activity.viewedBy",
        model: User,
    });
    const viewed = await form.activity
        .filter((a) => a.viewedBy)
        .map((a) => a.viewedBy);
    const viewedAlready = await viewed.map((e) => e.email);

    if (viewedAlready.includes(res.userEmail)) {
        return {
            statusCode: 200,
            body: JSON.stringify(`You already viewed this form.`),
        };
    }

    await Form.updateOne(
        { _id: res._id },
        {
            $push: {
                activity: {
                    viewedBy: res.user,
                    date: new Date(),
                },
            },
        }
    );

    return {
        statusCode: 200,
        body: JSON.stringify(`Form viewed.`),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return viewForm(db, JSON.parse(event.body));
};
