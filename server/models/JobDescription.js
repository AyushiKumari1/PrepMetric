const mongoose = require("mongoose");

const jobDescriptionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 200,
    },

    company: {
        type: String,
        trim: true,
        default: "",
        maxlength: 200,
    },

    description: {
        type: String,
        required: true,
        trim: true,
        maxlength: 50000,
    },

    requiredSkills: {
        type: [String],
        default: [],
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model(
    "JobDescription",
    jobDescriptionSchema
);