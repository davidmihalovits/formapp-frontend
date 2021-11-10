const mongoose = require("mongoose");

const FormSchema = mongoose.Schema(
    {
        creator: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        formName: {
            type: String,
        },
        travelPurposeDropdown: {
            type: String,
        },
        travelPurpose: {
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
        task: {
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
        destinationStreetAddress: {
            type: String,
        },
        destinationCity: {
            type: String,
        },
        destinationState: {
            type: String,
        },
        destinationZipcode: {
            type: String,
        },
        justification: {
            type: String,
        },
        justificationType: {
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
        regulatoryVisa: {
            type: String,
        },
        approved: {
            type: String,
        },
        comment: {
            type: String,
        },
        approvalBy: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
        routing: {
            type: String,
        },
        activity: [
            {
                viewedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                signedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                editedBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                commentBy: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "users",
                },
                approved: String,
                comment: String,
                date: Date,
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("forms", FormSchema);
