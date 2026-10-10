
import { useEffect, useState } from "react";
import { FileText } from "lucide-react";
import api from "../services/api";
import "../styles/jobDescription.css";

function JobDescription() {
    const [title, setTitle] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [jobDescriptions, setJobDescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const [loadError, setLoadError] = useState("");

    const loadJobDescriptions = async () => {
        try {
            const response = await api.get("/api/job-descriptions");

            setJobDescriptions(response.data.jobDescriptions || []);
        } catch (error) {
            console.error("Load job descriptions error:", error);
            setLoadError(error.response?.data?.message || "Failed to load saved job descriptions.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        Promise.resolve().then(loadJobDescriptions);
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

            setMessage(response.data.message || "Job description saved successfully.");

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
        <div className="page-container job-description-page">
            <div className="page-header">
                <h1>Job Description</h1>
                <p>
                    Save a target job description to identify its requirements and analyze your skill gaps.
                </p>
            </div>

            <section className="job-description-card">
                <div className="job-card-header">
                    <span className="job-form-icon"><FileText size={18}/></span>
                    <div className="job-form-heading">
                        <h2>Enter Job Description</h2>
                        <p>
                            Add the role details and paste the job requirements.
                        </p>
                    </div>
                </div>

                <div className="job-fields-row">
                    <div className="job-field"><label htmlFor="job-title">Job title (e.g. Junior Software Developer)</label><input id="job-title" type="text" className="job-description-input" placeholder="Job title (e.g. Junior Software Developer)" value={title} onChange={(event) => setTitle(event.target.value)} maxLength={200}/></div>
                    <div className="job-field"><label htmlFor="company-name">Company name (optional)</label><input id="company-name" type="text" className="job-description-input" placeholder="Company name (optional)" value={company} onChange={(event) => setCompany(event.target.value)} maxLength={200}/></div>
                </div>
                <div className="job-field description-field"><label htmlFor="job-description">Job description</label><textarea id="job-description" className="job-description-input" placeholder="Paste the complete job description here..." value={description} onChange={(event) => setDescription(event.target.value)} maxLength={50000}/></div>

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

                {message && <p className={`job-form-message ${message.toLowerCase().includes("fail") || message.toLowerCase().includes("please enter") ? "error" : "success"}`} role="status">{message}</p>}
            </section>

            <section className="job-card">
                <div className="saved-jobs-heading"><span className="job-form-icon"><FileText size={17}/></span><h2>Saved Job Descriptions</h2></div>

                {loading && <p>Loading saved job descriptions...</p>}

                {!loading && loadError && <div className="saved-jobs-error"><strong>Failed to load saved job descriptions.</strong><p>Check your connection and try again.</p>{loadError !== "Failed to load saved job descriptions." && <small>{loadError}</small>}<button type="button" onClick={() => { setLoading(true); setLoadError(""); loadJobDescriptions(); }}>Retry</button></div>}
                {!loading && !loadError && jobDescriptions.length === 0 && <div className="saved-jobs-empty"><FileText size={22}/><p>No saved job descriptions yet. Add one above.</p></div>}

                {!loading && !loadError && jobDescriptions.map((job) => (
                    <div className="requirement-list" key={job._id}>
                        <h3>{job.title}</h3>

                        {job.company && <p>{job.company}</p>}

                        <p>
                            {job.description.length > 250
                                ? job.description.substring(0, 250) + "..."
                                : job.description}
                        </p>

                        {job.createdAt && <small>{new Date(job.createdAt).toLocaleDateString()}</small>}
                    </div>
                ))}
            </section>
        </div>
    );
}

export default JobDescription;
