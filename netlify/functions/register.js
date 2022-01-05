const User = require("../models/User");
const mongoose = require("mongoose");

const register = async (req, res) => {
    const user = await User.findOne({ email: res.email });

    if (user) {
        return {
            statusCode: 500,
            body: JSON.stringify(`User already registered.`),
        };
    }

    if (!res.role) {
        return {
            statusCode: 500,
            body: JSON.stringify(`Choose a role.`),
        };
    }

    let newUser = new User({
        email: res.email,
        role: res.role,
    });

    await newUser.save();

    return {
        statusCode: 200,
        body: JSON.stringify(`User ${res.email} registered.`),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return register(db, JSON.parse(event.body));
};
