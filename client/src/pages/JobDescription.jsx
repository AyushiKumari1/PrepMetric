
import { useEffect, useState } from "react";
import api from "../services/api";
import "../styles/jobDescription.css";

function JobDescription() {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");

    const loadJobDescriptions = async () => {
        try {
            setLoading(true);

            const response = await api.get("/api/job-descriptions");

            setJobDescriptions(response.data.jobDescriptions || []);
        } catch (error) {
            console.error("Load job descriptions error:", error);

            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Failed to load saved job descriptions.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadJobDescriptions();
    }, []);

    const handleSave = async () => {
        if (!title.trim() || !description.trim()) {
            setMessage("Please enter a job title and description.");
            return;
        }

        try {
            setSaving(true);
            setMessage("");

            const response = await api.post("/api/job-descriptions", {
                title: title.trim(),
                company: company.trim(),
                description: description.trim()
            });

            setMessage(response.data.message);

            setTitle("");
            setCompany("");
            setDescription("");

            await loadJobDescriptions();
        } catch (error) {
            console.error("Save job description error:", error);

            if (error.response && error.response.data) {
                setMessage(error.response.data.message);
            } else {
                setMessage("Failed to save job description.");
            }
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="page-container">
            <div className="page-header">
                <h1>Job Description</h1>
                <p>
                    Save a target job description to identify its
                    requirements and analyze your skill gaps.
                </p>
            </div>

            <section className="job-description-card">
                <div className="job-card-header">
                    <div>
                        <h2>Enter Job Description</h2>
                        <p>
                            Add the role details and paste the job requirements.
                        </p>
                    </div>
                </div>

                <input
                    type="text"
                    className="job-description-input"
                    placeholder="Job title (e.g. Junior Software Developer)"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    maxLength={200}
                />

                <input
                    type="text"
                    className="job-description-input"
                    placeholder="Company name (optional)"
                    value={company}
                    onChange={(event) => setCompany(event.target.value)}
                    maxLength={200}
                />

                <textarea
                    className="job-description-input"
                    placeholder="Paste the complete job description here..."
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    maxLength={50000}
                />

                <div className="job-description-actions">
                    <span>Required: job title and description</span>

                    <button
                        type="button"
                        className="analyze-job-button"
                        onClick={handleSave}
                        disabled={saving}
                    >
                        {saving ? "Saving..." : "Save Job Description"}
                    </button>
                </div>

                {message && <p>{message}</p>}
            </section>

            <section className="job-card">
                <h2>Saved Job Descriptions</h2>

                {loading && <p>Loading saved job descriptions...</p>}

                {!loading && jobDescriptions.length === 0 && (
                    <p>No saved job descriptions yet. Add one above.</p>
                )}

                {!loading && jobDescriptions.map((job) => (
                    <div className="requirement-list" key={job._id}>
                        <h3>{job.title}</h3>

                        {job.company && <p>{job.company}</p>}

                        <p>
                            {job.description.length > 250
                                ? job.description.substring(0, 250) + "..."
                                : job.description}
                        </p>

                        <small>
                            Record ID: {job._id}
                        </small>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default JobDescription;