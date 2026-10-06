const mongoose = require("mongoose");

const Resume = require("../models/Resume");
const JobDescription = require("../models/JobDescription");
const { analyzeSkillGaps } = require("../services/gemini.service");

const normalizeForComparison = (value) => {
    return String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9.+#]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
};

const normalizeSkillKey = (value) => {
    const compact = String(value || "")
        .toLowerCase()
        .replace(/[^a-z0-9]/g, "");

    const aliases = {
        javascript: "javascript",
        ecmascript: "javascript",
        react: "react",
        reactjs: "react",
        node: "nodejs",
        nodejs: "nodejs",
        restapi: "restapi",
        restfulapi: "restapi",
        restbased: "restapi",
        restservices: "restapi",
        mongodb: "mongodb",
        mongodbatabase: "mongodb"
    };

    return aliases[compact] || compact;
};

const supportsSkill = (skillName, evidenceQuote) => {
    const skill = normalizeSkillKey(skillName);
    const quote = normalizeForComparison(evidenceQuote);
    const compactQuote = quote.replace(/[^a-z0-9]/g, "");

    if (!quote) {
        return false;
    }

    const patterns = {
        javascript: [
            /\bjavascript\b/i,
            /\bjava script\b/i,
            /\becmascript\b/i
        ],
        react: [
            /\breact\b/i,
            /\breact js\b/i,
            /\breactjs\b/i
        ],
        nodejs: [
            /\bnode js\b/i,
            /\bnodejs\b/i
        ],
        restapi: [
            /\brest api\b/i,
            /\brestful api\b/i,
            /\brest based\b/i,
            /\brest services\b/i,
            /\brest based integration services\b/i
        ],
        mongodb: [
            /\bmongodb\b/i,
            /\bmongo db\b/i
        ]
    };

    if (patterns[skill]) {
        return patterns[skill].some((pattern) =>
            pattern.test(quote)
        );
    }

    // Generic skills must appear explicitly in the evidence.
    const normalizedSkill = normalizeForComparison(skillName);

    if (!normalizedSkill) {
        return false;
    }

    const compactSkill = normalizedSkill.replace(
        /[^a-z0-9]/g,
        ""
    );

    return (
        quote.includes(normalizedSkill) ||
        (
            compactSkill.length >= 2 &&
            compactQuote.includes(compactSkill)
        )
    );
};

// A quote is valid only if it can be found in the actual resume.
const verifyEvidenceQuote = (resumeText, evidenceQuote) => {
    const normalizedResume = normalizeForComparison(resumeText);
    const normalizedQuote = normalizeForComparison(evidenceQuote);

    if (!normalizedQuote) {
        return false;
    }

    return normalizedResume.includes(normalizedQuote);
};

// Determine whether a skill was explicitly required by the selected job.
const isRequiredSkill = (skillName, requiredSkillKeys) => {
    return requiredSkillKeys.has(normalizeSkillKey(skillName));
};

// Determine a consistent priority using job requirements and evidence.
const getSkillPriority = (
    classification,
    importance,
    required
) => {
    const status = String(classification || "")
        .toLowerCase()
        .replace(/[\s-]+/g, "_");

    const level = String(importance || "")
        .toLowerCase()
        .trim();

    // Confirmed matches do not need immediate gap-remediation priority.
    if (status === "matched") {
        return "low";
    }

    // Explicitly required skills receive high priority when not confirmed.
    if (required) {
        return "high";
    }

    if (
        level === "required" ||
        level === "mandatory" ||
        level === "critical" ||
        level === "high"
    ) {
        return "high";
    }

    if (level === "low") {
        return "low";
    }

    return "medium";
};

const getSkillRecommendation = (skill, classification) => {
    const name = skill || "this skill";

    switch (classification) {
        case "matched":
            return (
                "Keep your resume evidence current and prepare a " +
                `concrete example demonstrating ${name}.`
            );

        case "partial":
            return (
                `Strengthen the resume evidence for ${name} by adding ` +
                "specific responsibilities, projects, and outcomes."
            );

        case "needs_verification":
            return (
                `Verify your experience with ${name} before treating it ` +
                "as a confirmed skill gap. Review relevant projects or " +
                "work examples and add specific evidence if available. " +
                "If you have not practised it, complete a relevant " +
                "exercise and reassess."
            );

        case "not_found":
        default:
            return (
                `The resume does not currently demonstrate ${name}. ` +
                "If you have relevant experience, add a concrete example. " +
                "Otherwise, consider a focused exercise or project to " +
                "develop and demonstrate it."
            );
    }
};

const normalizeClassification = (classification) => {
    const value = String(classification || "")
        .toLowerCase()
        .trim()
        .replace(/[\s-]+/g, "_");

    const allowed = [
        "matched",
        "partial",
        "not_found",
        "needs_verification"
    ];

    return allowed.includes(value) ? value : "needs_verification";
};

const getUserId = (user) => {
    if (!user) {
        return null;
    }

    return user.id || user._id || user.userId || null;
};

const analyzeSkillGapsController = async(req, res) => {
    try {
        const { resumeId, jobDescriptionId } = req.body;
        const userId = getUserId(req.user);

        // Validate authentication identity.
        if (!userId || !mongoose.isValidObjectId(userId)) {
            return res.status(401).json({
                message: "Valid authentication is required."
            });
        }

        // Validate both requested document IDs.
        if (!mongoose.isValidObjectId(resumeId) ||
            !mongoose.isValidObjectId(jobDescriptionId)
        ) {
            return res.status(400).json({
                message: "A valid resume ID and job description ID are required."
            });
        }

        // Only analyze a resume belonging to the logged-in user.
        const resume = await Resume.findOne({
            _id: resumeId,
            userId
        });

        if (!resume) {
            return res.status(404).json({
                message: "Resume not found for this user."
            });
        }

        // Use the exact job description ID supplied by the frontend.
        const jobDescription = await JobDescription.findOne({
            _id: jobDescriptionId,
            userId
        });

        if (!jobDescription) {
            return res.status(404).json({
                message: "Job description not found for this user."
            });
        }
        console.log("Selected job:", jobDescription.title);
        console.log("Required skills:", jobDescription.requiredSkills);
        const resumeText = String(resume.extractedText || "").trim();
        const jobText = String(jobDescription.description || "").trim();

        if (!resumeText) {
            return res.status(400).json({
                message: "The selected resume has no extracted text. Upload or reprocess the resume."
            });
        }

        if (!jobText) {
            return res.status(400).json({
                message: "The selected job description has no description text."
            });
        }

        const requiredSkills = Array.isArray(
                jobDescription.requiredSkills
            ) ?
            jobDescription.requiredSkills
            .map((skill) => String(skill || "").trim())
            .filter(Boolean) : [];

        const requiredSkillKeys = new Set(
            requiredSkills.map((skill) => normalizeSkillKey(skill))
        );

        // Ask Gemini to analyze this exact resume against this exact job.
        const aiSkills = await analyzeSkillGaps(
            resumeText,
            jobText,
            requiredSkills
        );

        if (!Array.isArray(aiSkills)) {
            throw new Error(
                "Skill gap analysis returned an invalid result."
            );
        }

        const skills = aiSkills.map((item) => {
            const skillName = String(
                item.skill || item.name || ""
            ).trim();

            const originalClassification = normalizeClassification(
                item.classification || item.status
            );

            const rawEvidenceQuote = String(
                item.evidenceQuote ||
                item.evidence ||
                ""
            ).trim();

            // The quote must exist in the resume AND explicitly support
            // the skill. A quote mentioning AngularJS cannot, by itself,
            // confirm explicit JavaScript experience.
            const quoteExists = verifyEvidenceQuote(
                resumeText,
                rawEvidenceQuote
            );

            const skillSupported =
                quoteExists &&
                supportsSkill(skillName, rawEvidenceQuote);

            let classification = originalClassification;

            // Do not accept a model classification without evidence.
            if (
                classification === "matched" ||
                classification === "partial"
            ) {
                if (!skillSupported) {
                    classification = "needs_verification";
                }
            }

            const required = isRequiredSkill(
                skillName,
                requiredSkillKeys
            );

            const importance = required ?
                "required" :
                String(item.importance || "other")
                .toLowerCase()
                .trim();

            const explanation = String(
                item.explanation || ""
            ).trim();

            const recommendation = String(
                item.recommendation || ""
            ).trim();

            // Never display an unverified quote as verified evidence.
            const verifiedEvidence = skillSupported ?
                rawEvidenceQuote :
                null;

            return {
                skill: skillName,
                requirement: String(
                    item.requirement || item.description || ""
                ).trim(),
                classification,
                importance,
                required,
                priority: getSkillPriority(
                    classification,
                    importance,
                    required
                ),
                evidence: {
                    quote: verifiedEvidence,
                    verified: Boolean(skillSupported)
                },
                evidenceQuote: verifiedEvidence,
                explanation: explanation ||
                    (
                        classification === "needs_verification" ?
                        "The available resume evidence needs further verification." :
                        classification === "not_found" ?
                        "Sufficient evidence for this requirement was not found in the resume." :
                        "Review the available resume evidence for this requirement."
                    ),
                recommendation: recommendation ||
                    getSkillRecommendation(
                        skillName,
                        classification
                    )
            };
        });

        const summary = {
            total: skills.length,
            matched: skills.filter(
                (skill) => skill.classification === "matched"
            ).length,
            partial: skills.filter(
                (skill) => skill.classification === "partial"
            ).length,
            notFound: skills.filter(
                (skill) => skill.classification === "not_found"
            ).length,
            needsVerification: skills.filter(
                (skill) =>
                skill.classification === "needs_verification"
            ).length
        };

        const explanation =
            "The estimated match reflects the classifications of the " +
            "analyzed job requirements. Verified evidence means the " +
            "quoted text appears in the resume and explicitly mentions " +
            "the skill; it does not independently establish proficiency. " +
            "Missing evidence does not prove the candidate lacks a skill.";

        return res.status(200).json({
            message: "Skill gap analysis completed",
            result: {
                resume: {
                    id: resume._id,
                    fileName: resume.fileName
                },
                jobDescription: {
                    id: jobDescription._id,
                    title: jobDescription.title,
                    company: jobDescription.company
                },
                summary,
                skills,
                explanation
            }
        });
    } catch (error) {
        console.error(
            "Skill gap analysis error:",
            error.message
        );

        return res.status(500).json({
            message: "Failed to analyze skill gaps.",
            error: error.message
        });
    }
};


module.exports = {
    analyzeResumeSkillGaps: analyzeSkillGapsController
};