const express = require("express");
const authMiddleware = require("../middleware/auth.middleware");

const {
    analyzeResumeSkillGaps,
} = require("../controllers/skillGap.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", analyzeResumeSkillGaps);

module.exports = router;