const mongoose = require("mongoose");

const NotificationSchema = mongoose.Schema(
    {
        notification: String,
        formId: String,
        formName: String,
        read: Array,
        recipient: Array,
    },
    { timestamps: true }
);

module.exports = mongoose.model("Notification", NotificationSchema);
