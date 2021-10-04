const Traveler = require("../models/Traveler");
const mongoose = require("mongoose");
const MONGODB_URI = process.env.mongoURI;

let cachedDb = null;

const connectToDatabase = async (uri) => {
    if (cachedDb) return cachedDb;

    const client = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    cachedDb = client;

    return cachedDb;
};

const queryDatabase = async (db, data) => {
    let newTraveler = new Traveler({
        fullName: data.fullName,
        email: data.email,
        employeeId: data.employeeId,
        program: data.program,
        chargeCode: data.chargeCode,
        workStreetAddress: data.workStreetAddress,
        workCity: data.workCity,
        workState: data.workState,
        workZipcode: data.workZipcode,
        travelDaysAway: data.travelDaysAway,
        travelMethod: data.travelMethod,
        startDate: data.startDate,
        endDate: data.endDate,
        travelCity: data.travelCity,
        travelState: data.travelState,
        travelCountry: data.travelCountry,
        justification: data.justification,
        travelAdvanceCheckbox: data.travelAdvanceCheckbox,
        travelAdvanceAmount: data.travelAdvanceAmount,
        transportCost: data.transportCost,
        rentalCost: data.rentalCost,
        mileageCost: data.mileageCost,
        lodgingCost: data.lodgingCost,
        mealsCost: data.mealsCost,
        registrationFees: data.registrationFees,
        otherCost: data.otherCost,
        totalCostAmount: data.totalCostAmount,
        regulatoryNctsCode: data.regulatoryNctsCode,
        regulatoryNctsEmail: data.regulatoryNctsEmail,
        regulatoryForeignTravel: data.regulatoryForeignTravel,
        regulatoryCiBrief: data.regulatoryCiBrief,
        regulatoryItEquipment: data.regulatoryItEquipment,
    });

    await newTraveler.save();

    return {
        statusCode: 200,
        body: JSON.stringify(`Traveler ${data.fullName} added.`),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await connectToDatabase(MONGODB_URI);

    switch (event.httpMethod) {
        case "POST":
            return queryDatabase(db, JSON.parse(event.body));
        default:
            return { statusCode: 400 };
    }
};
