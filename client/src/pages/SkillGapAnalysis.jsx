import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/skillGapAnalysis.css";

function SkillGapAnalysis() {
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [selectedJobId, setSelectedJobId] = useState("");
    const [result, setResult] = useState(null);
    const [loadingJobs, setLoadingJobs] = useState(false);
    const [analyzing, setAnalyzing] = useState(false);
    const [message, setMessage] = useState("");

    useEffect(() => {
        const loadJobDescriptions = async () => {
            try {
                setLoadingJobs(true);

                const response = await api.get("/api/job-descriptions");
                const jobs = response.data.jobDescriptions || [];

                setJobDescriptions(jobs);

                if (jobs.length > 0) {
                    setSelectedJobId(jobs[0]._id);
                }
            } catch (error) {
                console.error("Load job descriptions error:", error);

                if (error.response && error.response.data) {
                    setMessage(error.response.data.message);
                } else {
                    setMessage(
                        "Could not load job descriptions. Check your backend connection."
                    );
                }
            } finally {
                setLoadingJobs(false);
            }
        };

        loadJobDescriptions();
    }, []);

    const handleAnalyze = async () => {
        const resumeId = localStorage.getItem("resumeId");

        if (!resumeId) {
            setMessage(
                "Please upload your resume successfully from Resume Analysis first."
            );
            return;
        }

        if (!selectedJobId) {
            setMessage("Please select a job description first.");
            return;
        }

        try {
            setAnalyzing(true);
            setMessage("");
            setResult(null);

            const response = await api.post("/api/skill-gaps", {
                resumeId: resumeId,
                jobDescriptionId: selectedJobId
            });

            setResult(response.data.result);
            setMessage(response.data.message);
        } catch (error) {
            console.error("Skill gap analysis error:", error);

            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage(
                    "Analysis failed. Check your server and database connection."
                );
            }
        } finally {
            setAnalyzing(false);
        }
    };

    const summary = result ? result.summary : null;
    const skills = result ? result.skills : [];

    const matchPercentage = summary && summary.total > 0
        ? Math.round(
            (
                summary.matched +
                summary.partial * 0.5
            ) / summary.total * 100
        )
        : 0;

    const matchedSkills = skills.filter(
        (skill) => skill.classification === "matched"
    );

    const partialSkills = skills.filter(
        (skill) => skill.classification === "partial"
    );

    const missingSkills = skills.filter(
        (skill) => skill.classification === "not_found"
    );

    const verificationSkills = skills.filter(
        (skill) => skill.classification === "needs_verification"
    );

    const getPriority = (skill) => {
        if (skill.priority) {
            return skill.priority.charAt(0).toUpperCase()
                + skill.priority.slice(1);
        }

        return "Not specified";
    };

    const getClassification = (classification) => {
        const labels = {
            matched: "Matched",
            partial: "Partially matched",
            not_found: "Not found in resume",
            needs_verification: "Needs verification"
        };

        return labels[classification] || classification;
    };

    return (
        <div className="page-container">
            <div className="page-header skill-gap-page-header">
                <h1 className="skill-gap-page-title">
                    Skill Gap Analysis
                </h1>
                <p>
                    Compare your resume with a target job and discover
                    which skills are supported by your resume evidence.
                </p>
            </div>

            <section className="skill-section-card">
                <div className="skill-section-header">
                    <div>
                        <h2>Select Your Target Job</h2>
                        <p>
                            Choose a job description you have already saved.
                        </p>
                    </div>
                </div>

                {loadingJobs ? (
                    <p>Loading saved job descriptions...</p>
                ) : (
                    <select
                        value={selectedJobId}
                        onChange={(event) => {
                            setSelectedJobId(event.target.value);
                            setResult(null);
                            setMessage("");
                        }}
                        disabled={jobDescriptions.length === 0 || analyzing}
                        style={{
                            width: "100%",
                            padding: "12px",
                            marginBottom: "16px",
                            borderRadius: "8px"
                        }}
                    >
                        <option value="">
                            Select a job description
                        </option>

                        {jobDescriptions.map((job) => (
                            <option key={job._id} value={job._id}>
                                {job.title}
                                {job.company ? " - " + job.company : ""}
                            </option>
                        ))}
                    </select>
                )}

                {!loadingJobs && jobDescriptions.length === 0 && (
                    <p>
                        No saved job descriptions found. Visit the Job
                        Description page and save a job first.
                    </p>
                )}

                <button
                    type="button"
                    className="analyze-skill-gap-btn"
                    onClick={handleAnalyze}
                    disabled={
                        analyzing ||
                        loadingJobs ||
                        !selectedJobId ||
                        jobDescriptions.length === 0
                    }
                >
                    {analyzing
                        ? "Analyzing skills..."
                        : "Analyze Skill Gaps"}
                </button>

                {message && (
                    <p
                        role="status"
                        style={{ marginTop: "16px", overflowWrap: "anywhere" }}
                    >
                        {message}
                    </p>
                )}
            </section>

            {result && (
                <>
                    <section className="skill-overview-card">
                        <div className="skill-overview-content">
                            <div>
                                <span className="overview-label">
                                    Resume-to-Job Match
                                </span>

                                <strong className="overview-score">
                                    {matchPercentage}%
                                </strong>

                                <p>
                                   {summary.matched} of {summary.total} analyzed
                                   requirements matched, with{" "}
                                   {summary.partial} partially matched.
                                </p>
                                <p className="score-explanation">
                                   This estimate is based on the classifications of the requirements analyzed for this job. It is not an overall job-readiness or interview-readiness score. Verified evidence
                                   confirms that a quote appears in the resume and mentions the skill; it does not independently verify proficiency.
                                </p>

                            </div>

                            <div className="overview-progress">
                                <div className="skill-progress-bar">
                                    <div
                                        className="skill-progress-fill"
                                        style={{
                                            width: matchPercentage + "%"
                                        }}
                                    />
                                </div>

                                <span>
                                    {matchPercentage}% estimated match
                                </span>
                            </div>
                        </div>
                    </section>

                    <section className="skill-stats-grid">
                        <div className="skill-stat-card">
                            <span>Matched Skills</span>
                            <strong>{summary.matched}</strong>
                            <small>
                                Supported by resume evidence
                            </small>
                        </div>

                        <div className="skill-stat-card">
                            <span>Partially Matched</span>
                            <strong>{summary.partial}</strong>
                            <small>
                                Requirements with partial evidence
                            </small>
                        </div>

                        <div className="skill-stat-card">
                            <span>Not Found</span>
                            <strong>{summary.notFound}</strong>
                            <small>
                                No sufficient matching evidence found
                            </small>
                        </div>

                        <div className="skill-stat-card">
                            <span>Needs Verification</span>
                            <strong>{summary.needsVerification}</strong>
                            <small>
                                Require further review
                            </small>
                        </div>
                    </section>

                    <section className="skill-section-card">
                        <div className="skill-section-header">
                            <div>
                                <h2>Matched Skills</h2>
                                <p>
                                    Requirements supported by evidence
                                    from your resume.
                                </p>
                            </div>
                        </div>

                        {matchedSkills.length === 0 ? (
                            <p>No fully matched skills were identified.</p>
                        ) : (
                            <div className="skill-tags">
                                {matchedSkills.map((skill, index) => (
                                    <span key={skill.skill + index}>
                                        {skill.skill}
                                    </span>
                                ))}
                            </div>
                        )}
                    </section>

                    <section className="skill-section-card">
                        <div className="skill-section-header">
                            <div>
                                <h2>Skill Requirements and Evidence</h2>
                                <p>
                                    Review how each job requirement was
                                    classified and what evidence supports it.
                                </p>
                            </div>
                        </div>

                        {skills.map((skill, index) => (
                            <div
                                className="skill-gap-item"
                                key={skill.skill + index}
                                style={{
                                    padding: "16px 0",
                                    borderBottom: "1px solid #e5e7eb"
                                }}
                            >
                                <div>
                                    <strong>{skill.skill}</strong>

                                    <p>
                                        <strong>Requirement:</strong>{" "}
                                        {skill.requirement ||
                                        "Requirement details were not returned by the analysis."}
                                    </p>

                                    <p>
                                        Status:{" "}
                                        {getClassification(
                                            skill.classification
                                        )}
                                    </p>

                                    <p>
                                        Priority: {getPriority(skill)}
                                    </p>

                                    
                                {skill.evidence &&
                                    (skill.evidence.quote || skill.evidence.excerpt) && (
                                        <blockquote className="skill-evidence">
                                             <strong>Resume evidence:</strong>{" "}
                                             {skill.evidence.quote || skill.evidence.excerpt}
                                             <p>
                                                  Evidence verified:{" "}
                                                  {skill.evidence.verified ? "Yes" : "No"}
                                            </p>
                                        </blockquote>
                                    )}

                                    {skill.explanation && (
                                        <p>
                                            <strong>Explanation:</strong>{" "}
                                            {skill.explanation}
                                        </p>
                                    )}

                                    {skill.recommendation && (
                                        <p>
                                            <strong>Recommended action:</strong>{" "}
                                            {skill.recommendation}
                                        </p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                    <section className="skill-section-card">
                        <div className="skill-section-header">
                            <div>
                                <h2>Skills to Improve</h2>
                                <p>
                                    Requirements that need attention or
                                    further verification.
                                </p>
                            </div>
                        </div>

                        {missingSkills.length === 0 &&
                            partialSkills.length === 0 &&
                            verificationSkills.length === 0 && (
                                <p>
                                    No skill gaps requiring follow-up were
                                    returned by this analysis.
                                </p>
                            )}

                        {[...missingSkills, ...partialSkills,
                            ...verificationSkills].map((skill, index) => (
                            <div
                                className="skill-gap-item"
                                key={skill.skill + index}
                                style={{ padding: "12px 0" }}
                            >
                                <div>
                                    <strong>{skill.skill}</strong>
                                    <p>
                                        {getClassification(
                                            skill.classification
                                        )}
                                    </p>
                                    <p>
                                        Priority: {getPriority(skill)}
                                    </p>

                                    {skill.recommendation && (
                                        <p>{skill.recommendation}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </section>

                    
{(result.explanation ||
    result.explanation === "") && (
    <section className="skill-section-card">
        <div className="skill-section-header">
            <div>
                <h2>How to Interpret These Results</h2>
            </div>
        </div>

        {typeof result.explanation === "string" ? (
            <p>{result.explanation}</p>
        ) : (
            <>
                {result.explanation.evidencePolicy && (
                    <p>{result.explanation.evidencePolicy}</p>
                )}

                {result.explanation.limitation && (
                    <p>{result.explanation.limitation}</p>
                )}
            </>
        )}
    </section>
)}
                    <section className="skill-section-card">
                        <h2>Analysis Details</h2>

                        <p>
                            <strong>Resume:</strong>{" "}
                            {result.resume.fileName}
                        </p>

                        <p>
                            <strong>Target job:</strong>{" "}
                            {result.jobDescription.title}
                        </p>

                        {result.jobDescription.company && (
                            <p>
                                <strong>Company:</strong>{" "}
                                {result.jobDescription.company}
                            </p>
                        )}
                    </section>
                </>
            )}
        </div>
    );
}

export default SkillGapAnalysis;