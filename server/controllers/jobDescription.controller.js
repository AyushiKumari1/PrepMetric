const mongoose = require("mongoose");
const JobDescription = require("../models/JobDescription");
const { extractRequiredSkills } = require("../services/gemini.service");

const createJobDescription = async(req, res) => {
    try {
        const title = typeof req.body.title === "string" ? req.body.title.trim() : "";
        const company = typeof req.body.company === "string" ? req.body.company.trim() : "";
        const description = typeof req.body.description === "string" ? req.body.description.trim() : "";

        if (!title || !description) {
            return res.status(400).json({ message: "Job title and description are required" });
        }

        if (title.length > 200 || company.length > 200) {
            return res.status(400).json({ message: "Title or company name is too long" });
        }

        if (description.length > 50000) {
            return res.status(400).json({ message: "Job description must be 50,000 characters or fewer" });
        }

        const requiredSkills = await extractRequiredSkills(description);

        const jobDescription = await JobDescription.create({
            userId: req.user.userId,
            title,
            company,
            description,
            requiredSkills
        });

        return res.status(201).json({
            message: "Job description saved successfully",
            jobDescription
        });
    } catch (error) {
        console.error("Create job description error:", error.message);
        return res.status(500).json({ message: "Failed to save job description" });
    }
};
const getJobDescriptions = async(req, res) => {
    try {
        const jobDescriptions = await JobDescription.find({
            userId: req.user.userId,
        }).sort({ createdAt: -1 });

        return res.status(200).json({ jobDescriptions });
    } catch (error) {
        console.error("Get job descriptions error:", error);

        return res.status(500).json({
            message: "Failed to retrieve job descriptions",
        });
    }
};

const getJobDescriptionById = async(req, res) => {
    try {
        const { id } = req.params;

        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({
                message: "Invalid job description ID",
            });
        }

        const jobDescription = await JobDescription.findOne({
            _id: id,
            userId: req.user.userId,
        });

        if (!jobDescription) {
            return res.status(404).json({
                message: "Job description not found",
            });
        }

        return res.status(200).json({ jobDescription });
    } catch (error) {
        console.error("Get job description error:", error);

        return res.status(500).json({
            message: "Failed to retrieve job description",
        });
    }
};

module.exports = {
    createJobDescription,
    getJobDescriptions,
    getJobDescriptionById,
};