const Form = require("../models/Form");
const User = require("../models/User");
const Notification = require("../models/Notification");
const mongoose = require("mongoose");
const moment = require("moment");

const submitForm = async (req, res) => {
    const counted = await Form.countDocuments();

    let newForm = await new Form({
        creator: res.creator,
        formName: `${res.program}-${res.fullName.replace(/\s/g, "")}-${
            res.chargeCode
        }-${res.regulatoryNctsCode}-${moment(res.startDate).format("L")}-${
            counted + 1
        }`,
        travelPurposeDropdown: res.travelPurposeDropdown,
        travelPurpose: res.travelPurpose,
        fullName: res.fullName,
        email: res.email,
        employeeId: res.employeeId,
        program: res.program,
        chargeCode: res.chargeCode,
        task: res.task,
        workStreetAddress: res.workStreetAddress,
        workCity: res.workCity,
        workState: res.workState,
        workZipcode: res.workZipcode,
        travelDaysAway: res.travelDaysAway,
        travelMethod: res.travelMethod,
        startDate: res.startDate,
        endDate: res.endDate,
        destinationStreetAddress: res.destinationStreetAddress,
        destinationCity: res.destinationCity,
        destinationState: res.destinationState,
        destinationZipcode: res.destinationZipcode,
        justification: res.justification,
        justificationType: res.justificationType,
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
        approved: "pending",
    });

    await newForm.save();
    await Form.populate(newForm, { path: "creator" });

    const everyoneExceptOnlyTravelers = await User.find({
        $or: [{ role: "Supervisor" }, { role: "TravelerSupervisor" }],
        email: { $ne: res.email },
    });
    let newNotification = await new Notification({
        notification: `New form "${newForm.formName}" has been submitted by ${res.email}.`,
        formId: newForm._id,
        formName: newForm.formName,
        read: [],
        recipient: everyoneExceptOnlyTravelers,
    });
    await newNotification.save();

    return {
        statusCode: 200,
        body: JSON.stringify(`Form for ${newForm.email} submitted.`),
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
