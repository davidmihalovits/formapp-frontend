const Activity = require("../models/Activity");
const mongoose = require("mongoose");

const getActivity = async (req, res) => {
    const activity = await Activity.find({
        form: req.headers.form,
    });

    return {
        statusCode: 200,
        body: JSON.stringify(activity[0]),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return getActivity({ db: db, headers: event.headers });
};
