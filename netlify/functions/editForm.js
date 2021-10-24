const Form = require("../models/Form");
const Activity = require("../models/Activity");
const mongoose = require("mongoose");

const editForm = async (req, res) => {
    await Form.updateOne(
        { _id: res.id },
        {
            formName: `${res.program}-${res.fullName.replace(/\s/g, "")}-${
                res.chargeCode
            }-${res.regulatoryNctsCode}-${res.startDate}-${
                res.formNameLastDigit
            }`,
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
        }
    );

    await Activity.updateOne(
        { form: res.id },
        {
            $push: {
                activity: {
                    editedBy: res.email,
                    date: new Date(),
                },
            },
        }
    );

    return {
        statusCode: 200,
        body: JSON.stringify("Successful edit."),
    };
};

module.exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const db = await mongoose.connect(process.env.mongoURI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    return editForm(db, JSON.parse(event.body));
};