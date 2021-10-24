const Activity = require("../models/Activity");
const mongoose = require("mongoose");

const getActivity = async (req, res) => {
    const activity = await Activity.findOne({
        form: req.headers.form,
    });

    return {
        statusCode: 200,
        body: JSON.stringify(activity),
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
