import fetch from "node-fetch";

const places = async () => {
    try {
        const response = await fetch(
            "https://maps.googleapis.com/maps/api/place/autocomplete/json?input=amoeba&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyAZnYhmoJdbX9Bs3-SbiGF50LKqmvipoqg",
            { method: "GET" }
        );
        const data = await response.json();

        return { statusCode: 200, body: JSON.stringify(data) };
    } catch (error) {
        console.log(error);

        return {
            statusCode: 500,
            body: JSON.stringify(error),
        };
    }
};

exports.handler = async (event, context) => {
    return places({ body: JSON.parse(event.body) });
};
