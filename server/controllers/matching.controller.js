const mongoose = require("mongoose");

const Resume = require("../models/Resume");
const JobDescription = require("../models/JobDescription");

const {
    generateEmbedding,
    cosineSimilarity,
} = require("../services/gemini.service");

const matchResumeToJob = async(req, res) => {
    try {
        const { resumeId, jobDescriptionId } = req.body;
        const userId = req.user.userId;

        if (!resumeId || !jobDescriptionId) {
            return res.status(400).json({
                message: "resumeId and jobDescriptionId are required",
            });
        }

        if (!mongoose.isValidObjectId(resumeId) ||
            !mongoose.isValidObjectId(jobDescriptionId)
        ) {
            return res.status(400).json({
                message: "Invalid resume or job description ID",
            });
        }

        // Only retrieve records belonging to the logged-in user.
        const resume = await Resume.findOne({
            _id: resumeId,
            userId,
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found",
            });
        }

        const jobDescription = await JobDescription.findOne({
            _id: jobDescriptionId,
            userId,
        });

        if (!jobDescription) {
            return res.status(404).json({
                message: "Job description not found",
            });
        }

        const resumeText = (resume.extractedText || "").trim();
        const jobText = (jobDescription.description || "").trim();

        if (!resumeText) {
            return res.status(400).json({
                message: "The selected resume contains no extracted text. Please upload a readable PDF or DOCX resume.",
            });
        }

        if (!jobText) {
            return res.status(400).json({
                message: "The selected job description is empty",
            });
        }

        // Generate embeddings using the working Gemini service.
        const resumeVector = await generateEmbedding(resumeText);
        const jobVector = await generateEmbedding(jobText);

        const similarity = cosineSimilarity(
            resumeVector,
            jobVector
        );

        return res.status(200).json({
            message: "Resume and job description compared successfully",

            result: {
                resume: {
                    id: resume._id,
                    fileName: resume.fileName,
                },

                jobDescription: {
                    id: jobDescription._id,
                    title: jobDescription.title,
                    company: jobDescription.company,
                },

                semanticSimilarity: {
                    value: Number(similarity.toFixed(4)),
                    percentage: Number(
                        (similarity * 100).toFixed(2)
                    ),
                    interpretation: "Measures semantic similarity between the resume text and job description. It is not a candidate qualification score.",
                },

                explanation: {
                    method: "Gemini text embeddings and cosine similarity",
                    evidence: {
                        resumeTextAvailable: true,
                        jobDescriptionTextAvailable: true,
                        resumeCharacters: resumeText.length,
                        jobDescriptionCharacters: jobText.length,
                    },
                    limitation: "Semantic similarity alone does not establish which required skills the candidate possesses or lacks. A separate evidence-based skill analysis is needed.",
                },
            },
        });
    } catch (error) {
        console.error("Resume-job matching error:", error);

        return res.status(500).json({
            message: "Failed to compare resume and job description",
        });
    }
};

module.exports = {
    matchResumeToJob,
};