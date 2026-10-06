const express = require("express");

const { uploadResume } = require("../controllers/resume.controller");
const authMiddleware = require("../middleware/auth.middleware");
const upload = require("../middleware/upload.middleware");

const router = express.Router();

router.post(
    "/upload",
    authMiddleware,
    upload.single("resume"),
    uploadResume
);

module.exports = router;