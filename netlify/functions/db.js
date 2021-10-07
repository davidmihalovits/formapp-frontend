const mongoose = require("mongoose");

exports.handler = async () => {
    try {
        await mongoose.connect(process.env.mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        return { statusCode: 200, body: JSON.stringify("MongoDB connected.") };
    } catch (error) {
        console.log(error);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: "MongoDB failed to connect." }),
        };
    }
};
