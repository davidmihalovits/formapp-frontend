const mongoose = require("mongoose");

const FormSchema = mongoose.Schema(
    {
        formName: {
            type: String,
        },
        fullName: {
            type: String,
        },
        email: {
            type: String,
        },
        employeeId: {
            type: String,
        },
        program: {
            type: String,
        },
        chargeCode: {
            type: String,
        },
        workStreetAddress: {
            type: String,
        },
        workCity: {
            type: String,
        },
        workState: {
            type: String,
        },
        workZipcode: {
            type: String,
        },
        travelDaysAway: {
            type: String,
        },
        travelMethod: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        travelCity: {
            type: String,
        },
        travelState: {
            type: String,
        },
        travelCountry: {
            type: String,
        },
        justification: {
            type: String,
        },
        travelAdvanceCheckbox: {
            type: Boolean,
        },
        travelAdvanceAmount: {
            type: String,
        },
        transportCost: {
            type: String,
        },
        rentalCost: {
            type: String,
        },
        mileageCost: {
            type: String,
        },
        lodgingCost: {
            type: String,
        },
        mealsCost: {
            type: String,
        },
        registrationFees: {
            type: String,
        },
        otherCost: {
            type: String,
        },
        totalCostAmount: {
            type: String,
        },
        regulatoryNctsCode: {
            type: String,
        },
        regulatoryNctsEmail: {
            type: String,
        },
        regulatoryForeignTravel: {
            type: String,
        },
        regulatoryCiBrief: {
            type: Boolean,
        },
        regulatoryItEquipment: {
            type: Boolean,
        },
        approved: {
            type: String,
        },
        comment: {
            type: String,
        },
        approvalBy: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Form", FormSchema);
