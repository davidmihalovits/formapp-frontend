const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
        },
        role: {
            type: String,
        },
        supervisorRole: {
            type: String,
        },
        loginCode: {
            type: String,
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("users", UserSchema);
