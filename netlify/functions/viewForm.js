const Activity = require("../models/Activity");
const mongoose = require("mongoose");
const moment = require("moment");

const viewForm = async (req, res) => {
    const form = await Activity.findOne({
        form: res._id,
    });

    const alreadyViewed = form.activity.map((v) => v.viewedBy);

    if (alreadyViewed.includes(res.user)) {
        return {
            statusCode: 200,
            body: JSON.stringify(`You already viewed this form.`),
        };
    }

    await Activity.updateOne(
        { form: res._id },
        {
            $push: {
                activity: {
                    viewedBy: res.user,
                    date: moment().utc().format("MMMM Do YYYY, h:mm:ss a"),
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
