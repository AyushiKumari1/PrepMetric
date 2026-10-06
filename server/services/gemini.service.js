const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

// Keep the existing Gemini connection test.
const testGemini = async() => {
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash",
        contents: "Say hello to PrepMetric in one short sentence.",
    });

    return response.text;
};

// Generate a semantic embedding for resume or job-description text.
const generateEmbedding = async(text) => {
    if (typeof text !== "string" || !text.trim()) {
        throw new Error("Text is required to generate an embedding");
    }

    const response = await ai.models.embedContent({
        model: "gemini-embedding-001",
        contents: text.trim(),
        config: {
            taskType: "SEMANTIC_SIMILARITY",
        },
    });

    const values = response.embeddings && response.embeddings[0] && response.embeddings[0].values;

    if (!Array.isArray(values) || values.length === 0) {
        throw new Error("Gemini returned an empty embedding");
    }

    return values;
};

// Compare two embeddings using cosine similarity.
const cosineSimilarity = (vectorA, vectorB) => {
    if (!Array.isArray(vectorA) ||
        !Array.isArray(vectorB) ||
        vectorA.length === 0 ||
        vectorA.length !== vectorB.length
    ) {
        throw new Error("Embeddings must have equal, non-zero dimensions");
    }

    let dotProduct = 0;
    let magnitudeA = 0;
    let magnitudeB = 0;

    for (let i = 0; i < vectorA.length; i++) {
        dotProduct += vectorA[i] * vectorB[i];
        magnitudeA += vectorA[i] * vectorA[i];
        magnitudeB += vectorB[i] * vectorB[i];
    }

    const denominator = Math.sqrt(magnitudeA) * Math.sqrt(magnitudeB);

    if (denominator === 0) {
        throw new Error("Cannot compare zero-magnitude embeddings");
    }

    return dotProduct / denominator;
};

// Add this function above module.exports in gemini.service.js

const analyzeSkillGaps = async(resumeText, jobDescription, requiredSkills) => {
    if (typeof resumeText !== "string" || !resumeText.trim()) {
        throw new Error("Resume text is required");
    }

    if (typeof jobDescription !== "string" || !jobDescription.trim()) {
        throw new Error("Job description is required");
    }

    const prompt = `
You are an evidence-based resume and job-requirement analyst.

Analyze the resume against the job description.

RESUME TEXT:
${JSON.stringify(resumeText)}

JOB DESCRIPTION:
${JSON.stringify(jobDescription)}

EXPLICITLY LISTED REQUIRED SKILLS:
${JSON.stringify(requiredSkills || [])}

RULES:
1. Identify distinct technical skills, tools, qualifications, and important role requirements.
2. Include explicitly listed required skills and other important requirements found in the job description.
3. For every skill in EXPLICITLY LISTED REQUIRED SKILLS, set importance to "required". Do not label these skills as "preferred" or "other".
4. Do not invent job requirements.
5. Every evidenceQuote must be copied verbatim from the resume, including its original wording.
6. If no supporting evidence exists, evidenceQuote must be an empty string.
7. Do not infer that a person lacks a skill just because the resume does not mention it.
8. Use "matched" only when the resume clearly demonstrates the requirement.
9. Use "partial" when relevant evidence exists but does not fully establish the requirement.
10. Use "not_found" when no supporting evidence was identified in the resume.
11. Use "needs_verification" when the available evidence is ambiguous or insufficient to decide.
12. Explain the classification using the evidence and requirement, not unsupported assumptions.
13. Recommendations must be specific and actionable.
14. Set importance to "required" for skills explicitly listed in EXPLICITLY LISTED REQUIRED SKILLS or clearly described as mandatory in the job description.
15. Set importance to "preferred" for skills described as preferred, desirable, or optional.
16. Set importance to "other" for relevant requirements whose importance is not explicitly stated.
17. Set priority to "high", "medium", or "low", based on job importance and the evidence gap. Missing or unverified required skills should normally be high priority; matched skills should be low priority.
18. Return valid JSON only, with no Markdown fences.

Return this structure:
{
  "skills": [
    {
      "skill": "Skill or requirement name",
      "requirement": "Relevant job requirement",
      "importance": "required or preferred or other",
      "classification": "matched or partial or not_found or needs_verification",
      "evidenceQuote": "Exact excerpt from resume, or empty string",
      "explanation": "Why this classification was assigned",
      "recommendation": "Specific next preparation action",
      "priority": "high or medium or low"
    }
  ]
}
`;

    let response;
    let lastError;

    for (let attempt = 1; attempt <= 3; attempt++) {
        try {
            response = await ai.models.generateContent({
                model: "gemini-3.5-flash-lite",
                contents: prompt,
                config: {
                    responseMimeType: "application/json",
                },
            });

            break;
        } catch (error) {
            lastError = error;

            const status = error.status || error.code;

            const retryable =
                status === 503 ||
                status === 429 ||
                status === 500 ||
                status === 502 ||
                status === 504;

            if (!retryable || attempt === 3) {
                throw error;
            }

            const delay = attempt * 2000;

            console.log(
                "Temporary Gemini error. Retrying attempt " +
                (attempt + 1) +
                " of 3 in " +
                delay +
                " ms."
            );

            await new Promise((resolve) => {
                setTimeout(resolve, delay);
            });
        }
    }

    if (!response) {
        throw lastError || new Error("Gemini did not return a response");
    }

    if (!response.text) {
        throw new Error("Gemini returned an empty skill-gap analysis");
    }

    let parsed;

    try {
        parsed = JSON.parse(response.text);
    } catch (error) {
        throw new Error("Gemini returned invalid JSON for skill-gap analysis");
    }

    if (!parsed || !Array.isArray(parsed.skills)) {
        throw new Error("Gemini returned an invalid skill-gap response");
    }

    return parsed.skills;
};

const extractRequiredSkills = async(jobDescription) => {
    if (typeof jobDescription !== "string" || !jobDescription.trim()) {
        throw new Error("Job description is required");
    }
    const prompt = `Extract technical skills and qualifications explicitly required or preferred in this job description.
JOB DESCRIPTION:
${JSON.stringify(jobDescription)}
Rules:
- Include only skills supported by the description.
- Include technical skills, tools, frameworks, databases, and platforms.
- Do not invent skills.
- Remove duplicates.
- Return valid JSON only.
Return this structure:
{
  "requiredSkills": ["JavaScript", "React", "Node.js"]
}
Include only explicitly required skills in requiredSkills. Do not include preferred or optional skills.`;
    const response = await ai.models.generateContent({
        model: "gemini-3.5-flash-lite",
        contents: prompt,
        config: {
            responseMimeType: "application/json"
        }
    });
    if (!response.text) {
        throw new Error("Gemini returned an empty skill extraction");
    }
    let parsed;
    try {
        parsed = JSON.parse(response.text);
    } catch (error) {
        throw new Error("Gemini returned invalid JSON for skill extraction");
    }
    if (!parsed || !Array.isArray(parsed.requiredSkills)) {
        throw new Error("Gemini returned an invalid required skills list");
    }
    return Array.from(new Set(
        parsed.requiredSkills
        .filter((skill) => typeof skill === "string")
        .map((skill) => skill.trim())
        .filter(Boolean)
    ));
};

module.exports = {
    testGemini,
    generateEmbedding,
    cosineSimilarity,
    analyzeSkillGaps,
    extractRequiredSkills
};