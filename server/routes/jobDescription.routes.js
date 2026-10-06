const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const {
    createJobDescription,
    getJobDescriptions,
    getJobDescriptionById,
} = require("../controllers/jobDescription.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", createJobDescription);
router.get("/", getJobDescriptions);
router.get("/:id", getJobDescriptionById);

module.exports = router;