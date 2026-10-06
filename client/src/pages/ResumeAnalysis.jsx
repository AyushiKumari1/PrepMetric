import { useRef, useState } from "react";
import axios from "axios";
import "../styles/resumeAnalysis.css";

function ResumeAnalysis() {
    const fileInputRef = useRef(null);

    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChooseResume = () => {
        fileInputRef.current.click();
    };

    const handleFileChange = async (event) => {
        const file = event.target.files[0];

        if (!file) {
            return;
        }

        // Check file type
        const allowedTypes = [
            "application/pdf",
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ];

        if (!allowedTypes.includes(file.type)) {
            setMessage("Only PDF and DOCX files are allowed.");
            return;
        }

        // Check file size
        if (file.size > 5 * 1024 * 1024) {
            setMessage("File size must be less than 5 MB.");
            return;
        }

        setSelectedFile(file);
        setMessage("");

        const formData = new FormData();
        formData.append("resume", file);

        try {
            setUploading(true);

            const token = localStorage.getItem("token");

            const response = await axios.post(
                "http://localhost:3000/api/resume/upload",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data"
                    },
                    withCredentials: true
                }
            );

            const resumeId = response.data.resume.id;

            localStorage.setItem("resumeId", resumeId);

            setMessage(
                "Resume uploaded successfully! Resume ID: " + resumeId
            );

        } catch (error) {
            console.error("Resume upload error:", error);

            setMessage(
                error.response?.data?.message ||
                "Failed to upload resume."
            );

        } finally {
            setUploading(false);
        }
    };

    return (
        <div className="page-container">

            <div className="page-header">
                <h1>Resume Analysis</h1>

                <p>
                    Upload your resume and get personalized insights to improve
                    your interview readiness.
                </p>
            </div>


            {/* Resume Upload */}

            <section className="resume-upload-card">

                <div className="upload-icon">
                    📄
                </div>

                <h2>Upload Your Resume</h2>

                <p>
                    Upload your latest resume in PDF or DOCX format.
                </p>

                <input
                    type="file"
                    ref={fileInputRef}
                    accept=".pdf,.docx"
                    onChange={handleFileChange}
                    style={{ display: "none" }}
                />

                <button
                    type="button"
                    className="upload-button"
                    onClick={() => fileInputRef.current?.click()}
                    disabled={uploading}
                >
                    {uploading ? "Uploading..." : "Choose Resume"}
                </button>

                {selectedFile && (
                    <p>
                        Selected: <strong>{selectedFile.name}</strong>
                    </p>
                )}

                {message && (
                    <p>
                        {message}
                    </p>
                )}

                <small>
                    Maximum file size: 5 MB
                </small>

            </section>


            {/* Analysis Overview */}

            <section className="analysis-grid">

                <div className="analysis-card">

                    <span className="analysis-label">
                        Resume Score
                    </span>

                    <strong className="analysis-score">
                        78%
                    </strong>

                    <p>
                        Good resume with some areas for improvement.
                    </p>

                </div>


                <div className="analysis-card">

                    <span className="analysis-label">
                        Skills Detected
                    </span>

                    <strong className="analysis-score">
                        18
                    </strong>

                    <p>
                        Technical and professional skills identified.
                    </p>

                </div>


                <div className="analysis-card">

                    <span className="analysis-label">
                        Improvements
                    </span>

                    <strong className="analysis-score">
                        6
                    </strong>

                    <p>
                        Recommendations available for your resume.
                    </p>

                </div>

            </section>


            {/* Strengths and Improvements */}

            <section className="resume-analysis-grid">

                <div className="resume-card">

                    <h2>Key Strengths</h2>

                    <div className="analysis-list">

                        <div className="analysis-list-item">
                            ✓ Strong technical skills
                        </div>

                        <div className="analysis-list-item">
                            ✓ Good project experience
                        </div>

                        <div className="analysis-list-item">
                            ✓ Relevant education
                        </div>

                        <div className="analysis-list-item">
                            ✓ Clear career objective
                        </div>

                    </div>

                </div>


                <div className="resume-card">

                    <h2>Areas for Improvement</h2>

                    <div className="analysis-list">

                        <div className="analysis-list-item">
                            ⚠ Improve resume formatting
                        </div>

                        <div className="analysis-list-item">
                            ⚠ Add measurable achievements
                        </div>

                        <div className="analysis-list-item">
                            ⚠ Strengthen professional summary
                        </div>

                        <div className="analysis-list-item">
                            ⚠ Add more relevant keywords
                        </div>

                    </div>

                </div>

            </section>


            {/* Recommendations */}

            <section className="resume-card recommendations-card">

                <h2>Resume Recommendations</h2>

                <p>
                    Based on your current resume, here are some suggestions
                    to improve your chances during the interview process.
                </p>

                <div className="recommendation-item">
                    <strong>1. Improve your professional summary</strong>

                    <span>
                        Highlight your strongest skills and relevant experience.
                    </span>
                </div>

                <div className="recommendation-item">
                    <strong>2. Add measurable achievements</strong>

                    <span>
                        Use numbers and measurable results wherever possible.
                    </span>
                </div>

                <div className="recommendation-item">
                    <strong>3. Match your resume with the target role</strong>

                    <span>
                        Include relevant skills and keywords from the job description.
                    </span>
                </div>

            </section>

        </div>
    );
}

export default ResumeAnalysis;

