const Form = require("../models/Form");
const Activity = require("../models/Activity");
const mongoose = require("mongoose");

const submitForm = async (req, res) => {
    const counted = await Form.countDocuments();

    let newForm = await new Form({
        formName: `${res.program}-${res.fullName.replace(/\s/g, "")}-${
            res.chargeCode
        }-${res.regulatoryNctsCode}-${res.startDate}-${counted + 1}`,
        fullName: res.fullName,
        email: res.email,
        employeeId: res.employeeId,
        program: res.program,
        chargeCode: res.chargeCode,
        workStreetAddress: res.workStreetAddress,
        workCity: res.workCity,
        workState: res.workState,
        workZipcode: res.workZipcode,
        travelDaysAway: res.travelDaysAway,
        travelMethod: res.travelMethod,
        startDate: res.startDate,
        endDate: res.endDate,
        travelCity: res.travelCity,
        travelState: res.travelState,
        travelCountry: res.travelCountry,
        justification: res.justification,
        travelAdvanceCheckbox: res.travelAdvanceCheckbox,
        travelAdvanceAmount: res.travelAdvanceAmount,
        transportCost: res.transportCost,
        rentalCost: res.rentalCost,
        mileageCost: res.mileageCost,
        lodgingCost: res.lodgingCost,
        mealsCost: res.mealsCost,
        registrationFees: res.registrationFees,
        otherCost: res.otherCost,
        totalCostAmount: res.totalCostAmount,
        regulatoryNctsCode: res.regulatoryNctsCode,
        regulatoryNctsEmail: res.regulatoryNctsEmail,
        regulatoryForeignTravel: res.regulatoryForeignTravel,
        regulatoryCiBrief: res.regulatoryCiBrief,
        regulatoryItEquipment: res.regulatoryItEquipment,
        regulatoryVisa: res.regulatoryVisa,
    });

    await newForm.save();

    let newActivity = await new Activity({
        createdBy: res.email,
        form: newForm._id,
        name: newForm.formName,
    });

    await newActivity.save();

    return {
        statusCode: 200,
        body: JSON.stringify(`Form for ${res.fullName} submitted.`),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return submitForm(db, JSON.parse(event.body));
};
