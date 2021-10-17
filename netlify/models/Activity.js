const mongoose = require("mongoose");

const ActivitySchema = mongoose.Schema(
    {
        createdBy: {
            type: String,
        },
        form: {
            type: String,
        },
        name: {
            type: String,
        },
        activity: {
            type: Array,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Activity", ActivitySchema);
