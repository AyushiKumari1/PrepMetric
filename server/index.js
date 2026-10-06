const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const authRoutes = require("./routes/auth.routes");
const resumeRoutes = require("./routes/resume.routes");
const { testGemini } = require("./services/gemini.service");
const jobDescriptionRoutes = require("./routes/jobDescription.routes");
const matchingRoutes = require("./routes/matching.routes");
const skillGapRoutes = require("./routes/skillGap.routes");

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/job-descriptions", jobDescriptionRoutes);
app.use("/api/matching", matchingRoutes);
app.use("/api/skill-gaps", skillGapRoutes);

app.get("/", (req, res) => {
    res.json({
        message: "PrepMetric server is running!"
    });
});

app.get("/api/test-gemini", async(req, res) => {
    try {
        const result = await testGemini();

        res.json({
            success: true,
            message: result
        });
    } catch (error) {
        console.error("Gemini test error:", error);

        res.status(500).json({
            success: false,
            message: "Gemini connection failed"
        });
    }
});

const PORT = process.env.PORT || 3000;

connectDB()

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});