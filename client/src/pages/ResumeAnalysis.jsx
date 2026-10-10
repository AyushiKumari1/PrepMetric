import { useRef, useState } from "react";
import { BarChart3, Check, FileText, Lightbulb, TriangleAlert } from "lucide-react";
import api from "../services/api";
import "../styles/resumeAnalysis.css";

function SummaryCard({ icon: Icon, color, title, value, description }) {
    return <article className="resume-summary-card">
        <div className={`resume-summary-icon ${color}`}><Icon size={19} strokeWidth={1.9}/></div>
        <div className="resume-summary-copy">
            <span>{title}</span>
            <strong>{value}</strong>
            <p>{description}</p>
        </div>
    </article>;
}

function InsightCard({ title, items, type }) {
    const Icon = type === "positive" ? Check : TriangleAlert;
    return <article className="resume-card insight-card">
        <h2>{title}</h2>
        <div className="analysis-list">
            {items.length === 0 && <p className="analysis-empty">Resume scoring and generated insights are not available in the current backend yet.</p>}
            {items.map((item) => <div className="analysis-list-item" key={item}>
                <Icon className={type} size={16} strokeWidth={2}/><span>{item}</span>
            </div>)}
        </div>
    </article>;
}

function ResumeAnalysis() {
    const fileInputRef = useRef(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [message, setMessage] = useState("");

    const handleFileChange = async (event) => {
        const file = event.target.files?.[0];
        if (!file) return;
        const extension = file.name.split(".").pop()?.toLowerCase();
        const allowedTypes = ["application/pdf", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        if (!["pdf", "docx"].includes(extension) || (file.type && !allowedTypes.includes(file.type))) {
            setMessage("Only PDF and DOCX files are allowed.");
            event.target.value = "";
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setMessage("File size must be less than 5 MB.");
            event.target.value = "";
            return;
        }
        setSelectedFile(file);
        setMessage("");
        const formData = new FormData();
        formData.append("resume", file);
        try {
            setUploading(true);
            const response = await api.post("/api/resume/upload", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            const resumeId = response.data.resume.id;
            localStorage.setItem("resumeId", resumeId);
            setMessage("Resume uploaded successfully! Resume ID: " + resumeId);
        } catch (error) {
            console.error("Resume upload error:", error);
            setMessage(error.response?.data?.message || "Failed to upload resume.");
        } finally {
            setUploading(false);
        }
    };

    return <div className="resume-analysis-page">
        <section className="resume-intro">
            <h1>Resume Analysis</h1>
            <p>Upload your resume and get personalized insights to improve your interview readiness.</p>
        </section>

        <section className="resume-upload-card">
            <div className="upload-icon"><FileText size={25} strokeWidth={1.8}/></div>
            <h2>Upload Your Resume</h2>
            <p>Upload your latest resume in PDF or DOCX format.</p>
            <input type="file" ref={fileInputRef} accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" onChange={handleFileChange} hidden/>
            <button type="button" className="upload-button" onClick={() => fileInputRef.current?.click()} disabled={uploading}>
                {uploading ? "Uploading..." : "Choose Resume"}
            </button>
            {selectedFile && <p className="selected-file">Selected: <strong>{selectedFile.name}</strong></p>}
            {message && <p className={`upload-message ${message.startsWith("Resume uploaded") ? "success" : "error"}`} role="status">{message}</p>}
            <small>Maximum file size: 5 MB</small>
        </section>

        <section className="analysis-grid" aria-label="Resume summary">
            <SummaryCard icon={FileText} color="purple" title="Resume Score" value="—" description="Scoring is not available yet."/>
            <SummaryCard icon={BarChart3} color="green" title="Skills Detected" value="—" description="No analysis result available."/>
            <SummaryCard icon={Lightbulb} color="amber" title="Improvements" value="—" description="Recommendations are not generated yet."/>
        </section>

        <section className="resume-analysis-grid">
            <InsightCard title="Key Strengths" type="positive" items={[]}/>
            <InsightCard title="Areas for Improvement" type="warning" items={[]}/>
        </section>

        <section className="resume-card recommendations-card">
            <h2>General Resume Checklist</h2>
            <p>These general suggestions are not generated from an analysis of your uploaded resume.</p>
            <div className="recommendation-item"><div className="recommendation-number">1</div><div><strong>Improve your professional summary</strong><span>Highlight your strongest skills and relevant experience.</span></div></div>
            <div className="recommendation-item"><div className="recommendation-number">2</div><div><strong>Add measurable achievements</strong><span>Use numbers and measurable results wherever possible.</span></div></div>
            <div className="recommendation-item"><div className="recommendation-number">3</div><div><strong>Match your resume with the target role</strong><span>Include relevant skills and keywords from the job description.</span></div></div>
        </section>
    </div>;
}

export default ResumeAnalysis;
