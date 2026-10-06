const fs = require("fs");
const path = require("path");
const { PDFParse } = require("pdf-parse");
const mammoth = require("mammoth");

const Resume = require("../models/Resume");

const uploadResume = async(req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "Resume file is required"
            });
        }

        const filePath = path.resolve(req.file.path);

        let extractedText = "";

        // Extract text from PDF
        if (req.file.mimetype === "application/pdf") {
            const fileBuffer = fs.readFileSync(filePath);

            const parser = new PDFParse({
                data: fileBuffer
            });

            const pdfData = await parser.getText();

            extractedText = pdfData.text;

            await parser.destroy();
        }

        // Extract text from DOCX
        else if (
            req.file.mimetype ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
            const result = await mammoth.extractRawText({
                path: filePath
            });

            extractedText = result.value;
        }

        // Save resume information in MongoDB
        const resume = await Resume.create({
            userId: req.user.userId,
            fileName: req.file.originalname,
            fileType: req.file.mimetype,
            filePath: req.file.path,
            extractedText
        });

        res.status(201).json({
            message: "Resume uploaded and text extracted successfully",
            resume: {
                id: resume._id,
                fileName: resume.fileName,
                fileType: resume.fileType,
                extractedText: resume.extractedText
            }
        });

    } catch (error) {
        console.error("Resume processing error:", error);

        res.status(500).json({
            message: "Failed to process resume"
        });
    }
};

module.exports = {
    uploadResume
};