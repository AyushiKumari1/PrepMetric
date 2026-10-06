const express = require("express");

const authMiddleware = require("../middleware/auth.middleware");

const {
    matchResumeToJob,
} = require("../controllers/matching.controller");

const router = express.Router();

router.use(authMiddleware);

router.post("/", matchResumeToJob);

module.exports = router;