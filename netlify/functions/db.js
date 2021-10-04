const { MongoClient } = require("mongodb");
require("dotenv").config();

exports.handler = async () => {
    try {
        const mongoURI = process.env.mongoURI;

        new MongoClient(mongoURI, {
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
