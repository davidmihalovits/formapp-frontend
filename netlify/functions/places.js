const https = require("https");
const options = {
    hostname: "maps.googleapis.com",
    //port: 443,
    path: "/maps/api/place/autocomplete/json?input=amoeba&types=establishment&location=37.76999%2C-122.44696&radius=500&key=AIzaSyAZnYhmoJdbX9Bs3-SbiGF50LKqmvipoqg",
    method: "GET",
};

const req = https.request(options, (res) => {
    console.log(`statusCode: ${res.statusCode}`);

    res.on("data", (d) => {
        process.stdout.write(d);
    });
});

req.on("error", (error) => {
    console.error(error);
});

req.end();
