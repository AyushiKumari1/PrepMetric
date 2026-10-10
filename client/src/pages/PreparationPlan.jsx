import { Link } from "react-router-dom";
import {
    AlertCircle, ArrowRight, BookOpenCheck, CalendarDays, CheckCircle2,
    Clock3, Code2, FileCheck2, Flame, Goal, Map, MessageSquareText,
    Target, UsersRound,
} from "lucide-react";
import "../styles/preparationPlan.css";

const metrics = [
    { label: "Tasks Completed", value: "—", note: "No saved task data", Icon: CheckCircle2, color: "purple" },
    { label: "Tasks Remaining", value: "—", note: "No saved task data", Icon: BookOpenCheck, color: "blue" },
    { label: "Practice Hours", value: "—", note: "Time tracking unavailable", Icon: Clock3, color: "green" },
    { label: "Current Streak", value: "—", note: "Streak tracking unavailable", Icon: Flame, color: "amber" },
];
const modules = [
    { title: "Resume Analysis", description: "Review your resume and explore supported feedback.", to: "/resume-analysis", Icon: FileCheck2, color: "purple" },
    { title: "Technical Questions", description: "Choose a topic and difficulty for technical practice.", to: "/technical-question", Icon: Code2, color: "blue" },
    { title: "Behavioral Questions", description: "Explore behavioral question focus areas.", to: "/behavioral-question", Icon: UsersRound, color: "green" },
    { title: "Mock Interviews", description: "View the mock interview practice options.", to: "/mock-interviews", Icon: MessageSquareText, color: "amber" },
];
const roadmap = [
    { title: "Resume Preparation", description: "Analyze and improve your resume.", to: "/resume-analysis", Icon: FileCheck2 },
    { title: "Job & Skill Analysis", description: "Review job requirements and skill matches.", to: "/skill-gap-analysis", Icon: Target },
    { title: "Technical Preparation", description: "Practice technical concepts and questions.", to: "/technical-question", Icon: Code2 },
    { title: "Behavioral Preparation", description: "Practice behavioral questions and STAR responses.", to: "/behavioral-question", Icon: UsersRound },
    { title: "Mock Interviews", description: "Explore realistic interview practice.", to: "/mock-interviews", Icon: MessageSquareText },
];
const weekStartDate = new Date();
weekStartDate.setDate(weekStartDate.getDate() - ((weekStartDate.getDay() + 6) % 7));
const weekEndDate = new Date(weekStartDate);
weekEndDate.setDate(weekEndDate.getDate() + 6);
const dateFormat = new Intl.DateTimeFormat(undefined, { month: "short", day: "numeric" });
const dateLabels = {
    today: dateFormat.format(new Date()),
    range: `${dateFormat.format(weekStartDate)} – ${dateFormat.format(weekEndDate)}`,
};

function EmptyState({ title, description }) {
    return <div className="plan-empty-state"><span><AlertCircle size={18}/></span><strong>{title}</strong><p>{description}</p></div>;
}

function MetricCard({ label, value, note, Icon, color }) {
    return <article className="plan-metric-card">
        <div className="plan-metric-heading"><span className={`plan-icon-tile ${color}`}><Icon size={17}/></span><span>{label}</span></div>
        <strong className="plan-metric-value">{value}</strong><small>{note}</small>
        <div className="plan-metric-track" role="progressbar" aria-label={`${label} unavailable`} aria-valuemin="0" aria-valuemax="100" aria-valuetext="Not enough data yet"><span style={{ width: 0 }}/></div>
    </article>;
}

function PreparationPlan() {
    return <div className="page-container preparation-plan-page">
        <header className="page-header plan-page-header">
            <h1>Preparation Plan</h1>
            <p>Follow your personalized preparation roadmap and stay on track for your target interview.</p>
        </header>

        <section className="plan-overview-card">
            <div className="plan-overview-main">
                <span className="plan-overview-icon"><Map size={20}/></span>
                <div className="plan-overview-copy"><span className="plan-eyebrow">YOUR PREPARATION PLAN</span><h2>Target role not set</h2><span className="plan-personalized-badge">Plan data unavailable</span><p>A saved target role and preparation plan are not available in this prototype.</p></div>
            </div>
            <div className="plan-completion-summary"><strong>—</strong><span>Plan Completed</span></div>
            <div className="plan-completion-track" role="progressbar" aria-label="Plan completion unavailable" aria-valuemin="0" aria-valuemax="100" aria-valuetext="No preparation plan data yet"><span style={{ width: 0 }}/></div>
        </section>

        <section className="plan-metrics-grid" aria-label="Preparation plan metrics">{metrics.map((metric) => <MetricCard key={metric.label} {...metric}/>)}</section>

        <div className="plan-content-grid">
            <section className="plan-panel">
                <div className="plan-panel-heading"><span className="plan-panel-icon"><CalendarDays size={17}/></span><div><h2>Today's Preparation</h2><p>Complete these tasks to stay on track.</p></div><span className="plan-date-label">Today · {dateLabels.today}</span></div>
                <EmptyState title="No preparation tasks saved for today" description="Your daily checklist and completion state are not connected in this prototype."/>
                <div className="plan-module-links">{modules.map(({ title, description, to, Icon, color }) => <Link to={to} className="plan-module-link" key={title}><span className={`plan-icon-tile ${color}`}><Icon size={15}/></span><span className="plan-module-copy"><strong>{title}</strong><small>{description}</small></span><ArrowRight size={14}/></Link>)}</div>
            </section>

            <section className="plan-panel">
                <div className="plan-panel-heading"><span className="plan-panel-icon"><Goal size={17}/></span><div><h2>Weekly Goals</h2><p>Your preparation targets for this week.</p></div></div>
                <p className="plan-week-label">Current week · {dateLabels.range}</p>
                <EmptyState title="No weekly goals have been configured" description="Goal targets and completion values are not available yet."/>
            </section>
        </div>

        <section className="plan-panel plan-roadmap-panel">
            <div className="plan-panel-heading"><span className="plan-panel-icon"><Map size={17}/></span><div><h2>Preparation Roadmap</h2><p>Suggested module order; stage completion is not currently tracked.</p></div><span className="plan-role-placeholder">Target role: Not set</span></div>
            <div className="plan-roadmap-grid">{roadmap.map(({ title, description, to, Icon }, index) => <article className="plan-roadmap-stage" key={title}>
                <div className="plan-roadmap-marker">{index + 1}</div>
                <span className="plan-roadmap-icon"><Icon size={16}/></span>
                <h3>{title}</h3><p>{description}</p><span className="plan-stage-status">Status not tracked</span>
                <Link to={to}>Open module <ArrowRight size={12}/></Link>
            </article>)}</div>
        </section>
    </div>;
}

export default PreparationPlan;
