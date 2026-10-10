import { useState } from "react";
import { Link } from "react-router-dom";
import {
    AlertCircle, ArrowDownToLine, ArrowRight, Award, BarChart3, CheckCircle2,
    Code2, FileText, Lightbulb,
    ListChecks, MessageSquareText, RotateCcw, Target, UsersRound,
} from "lucide-react";
import "../styles/readinessReport.css";

const categoryReadiness = [
    { label: "Resume & Profile", Icon: FileText, color: "blue" },
    { label: "Technical Skills", Icon: Code2, color: "purple" },
    { label: "Behavioral Skills", Icon: UsersRound, color: "green" },
    { label: "Skill Gap Analysis", Icon: Target, color: "amber" },
];
const readinessStages = ["Beginner", "Developing", "Good", "Excellent"];
const skillDimensions = ["Technical Knowledge", "Communication", "Problem Solving", "Leadership", "Confidence", "Resume & Profile"];
const nextStepItems = [
    { title: "Practice behavioral questions", description: "Work through teamwork, leadership, and communication prompts.", to: "/behavioral-question", Icon: UsersRound, color: "purple" },
    { title: "Review technical topics", description: "Choose a topic and difficulty for technical practice.", to: "/technical-question", Icon: Code2, color: "blue" },
    { title: "Try a mock interview", description: "Explore the available interview practice modes.", to: "/mock-interviews", Icon: MessageSquareText, color: "green" },
    { title: "Review your resume", description: "Upload a resume to view the analysis supported by the app.", to: "/resume-analysis", Icon: FileText, color: "amber" },
];

function PanelHeading({ Icon, title, description }) {
    return <div className="readiness-panel-heading">
        <span className="readiness-panel-icon"><Icon size={17}/></span>
        <div><h2>{title}</h2><p>{description}</p></div>
    </div>;
}

function EmptyState({ title, description, Icon = AlertCircle }) {
    return <div className="readiness-empty-state"><span><Icon size={18}/></span><strong>{title}</strong><p>{description}</p></div>;
}

function ReadinessReport() {
    const [actionMessage, setActionMessage] = useState("");

    return <div className="page-container readiness-report-page">
        <header className="readiness-page-header">
            <div><h1>Readiness Report</h1><p>Get a complete analysis of your interview readiness with personalized insights and recommendations.</p></div>
            <div className="readiness-header-actions">
                <button type="button" className="readiness-button secondary" onClick={() => setActionMessage("Report download is not available because this prototype does not yet generate readiness reports.")}><ArrowDownToLine size={15}/>Download Report</button>
                <button type="button" className="readiness-button primary" onClick={() => setActionMessage("Readiness assessment retakes are not connected yet. Use the practice modules below to continue preparing.")}><RotateCcw size={15}/>Retake Assessment</button>
            </div>
        </header>
        {actionMessage && <p className="readiness-action-message" role="status">{actionMessage}</p>}

        <section className="readiness-summary-grid" aria-label="Readiness summary">
            <article className="readiness-panel readiness-overall-card">
                <div className="readiness-overall-layout">
                    <div className="readiness-score-ring" aria-label="Overall readiness not yet available"><div><strong>—</strong><span>Overall</span></div></div>
                    <div className="readiness-overall-copy">
                        <span className="readiness-eyebrow">Overall Readiness</span><h2>Your Interview Readiness</h2>
                        <span className="readiness-level-pending">Assessment needed</span>
                        <p>Complete an assessment to calculate your readiness and receive a report tailored to your results.</p>
                        <small><AlertCircle size={13}/> No readiness assessment data is available yet.</small>
                    </div>
                </div>
            </article>

            <article className="readiness-panel readiness-category-card">
                <PanelHeading Icon={BarChart3} title="Category Readiness" description="Readiness across key preparation areas."/>
                <div className="readiness-category-list">{categoryReadiness.map(({ label, Icon, color }) => <div className="readiness-category-row" key={label}>
                    <span className={`readiness-category-icon ${color}`}><Icon size={14}/></span><span className="readiness-category-name">{label}</span>
                    <div className="readiness-category-track" role="progressbar" aria-label={`${label}: not enough data yet`} aria-valuemin="0" aria-valuemax="100" aria-valuetext="Not enough data yet"><span style={{ width: 0 }}/></div><strong>—</strong>
                </div>)}</div>
                <small className="readiness-data-caption">Not enough data yet</small>
            </article>

            <article className="readiness-panel readiness-level-card">
                <PanelHeading Icon={Award} title="Readiness Level" description="Current assessment stage."/>
                <div className="readiness-current-level"><span>Your Level</span><strong>Not assessed</strong></div>
                <div className="readiness-stage-chart" aria-label="Readiness level thresholds are not defined">
                    {readinessStages.map((stage) => <div className="readiness-stage" key={stage}><span className="readiness-stage-bar"/><small>{stage}</small></div>)}
                </div>
                <p className="readiness-data-caption">Level classification requires an assessment and defined thresholds.</p>
            </article>
        </section>

        <div className="readiness-middle-grid">
            <section className="readiness-panel readiness-radar-panel">
                <PanelHeading Icon={Target} title="Skill-wise Readiness Radar" description="Compare your readiness across key skill areas."/>
                <div className="readiness-chart-placeholder">
                    <EmptyState title="Assessment results are needed" description={`The radar will show evaluated skill scores for ${skillDimensions.join(", ")}.`} Icon={Target}/>
                </div>
            </section>

            <section className="readiness-panel readiness-strength-panel">
                <PanelHeading Icon={Target} title="Strengths & Areas for Improvement" description="Identify strong areas and focus on improving weaker areas."/>
                <div className="readiness-strength-grid">
                    <div className="readiness-strength-box positive"><h3><CheckCircle2 size={15}/>Your Strengths</h3><EmptyState title="Not enough data yet" description="Strengths will be identified from assessment results."/></div>
                    <div className="readiness-strength-box focus"><h3><AlertCircle size={15}/>Areas to Improve</h3><EmptyState title="Not enough data yet" description="Focus areas will be based on actual skill scores."/></div>
                </div>
            </section>
        </div>

        <div className="readiness-bottom-grid">
            <section className="readiness-panel">
                <PanelHeading Icon={Lightbulb} title="Personalized Recommendations" description="Recommendations will be based on your assessment results."/>
                <EmptyState title="Complete an assessment to get recommendations" description="This prototype does not yet generate personalized recommendation data." Icon={Lightbulb}/>
                <Link className="readiness-inline-link" to="/mock-interviews">Explore practice modules <ArrowRight size={14}/></Link>
            </section>

            <section className="readiness-panel readiness-next-steps">
                <PanelHeading Icon={ListChecks} title="Next Steps" description="Suggested modules to explore; these are not assessment-generated."/>
                <div className="readiness-steps-list">{nextStepItems.map(({ title, description, to, Icon, color }, index) => <div className="readiness-step" key={title}>
                    <span className="readiness-step-number">{index + 1}</span>
                    <span className={`readiness-step-icon ${color}`}><Icon size={15}/></span>
                    <div className="readiness-step-copy"><strong>{title}</strong><p>{description}</p></div>
                    <Link to={to} aria-label={`Open ${title}`}><ArrowRight size={15}/></Link>
                </div>)}</div>
            </section>
        </div>
    </div>;
}

export default ReadinessReport;
