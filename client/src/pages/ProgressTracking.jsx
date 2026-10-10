import { useState } from "react";
import {
    AlertCircle, BarChart3, Brain, CalendarClock, CheckCircle2,
    Code2, FileText, Goal, PieChart, Target,
} from "lucide-react";
import "../styles/progressTracking.css";

const categories = [
    { label: "Overall Progress", Icon: Target, color: "purple" },
    { label: "Resume Analysis", Icon: FileText, color: "blue" },
    { label: "Technical Practice", Icon: Code2, color: "green" },
    { label: "Behavioral Practice", Icon: Brain, color: "amber" },
];
const categoryBreakdown = [
    { label: "Technical Skills", color: "purple" },
    { label: "Behavioral Skills", color: "blue" },
    { label: "Resume & Profile", color: "green" },
    { label: "Skill Gap Analysis", color: "amber" },
];

function SummaryCard({ label, Icon, color }) {
    return <article className="tracking-summary-card">
        <div className="tracking-summary-top"><span className={`tracking-icon ${color}`}><Icon size={17}/></span><span>{label}</span></div>
        <strong className="tracking-summary-value">—</strong>
        <div className="tracking-progress-track" role="progressbar" aria-label={`${label} progress unavailable`} aria-valuemin="0" aria-valuemax="100" aria-valuetext="Not enough data yet"><span style={{ width: 0 }}/></div>
        <small>Not enough data yet</small>
    </article>;
}

function PanelHeading({ Icon, title, description, action }) {
    return <div className="tracking-panel-heading">
        <span className="tracking-panel-icon"><Icon size={17}/></span>
        <div className="tracking-heading-copy"><h2>{title}</h2><p>{description}</p></div>
        {action}
    </div>;
}

function EmptyState({ title, description }) {
    return <div className="tracking-empty-state">
        <span><AlertCircle size={19}/></span><strong>{title}</strong><p>{description}</p>
    </div>;
}

function ProgressTracking() {
    const [period, setPeriod] = useState("Last 8 Weeks");
    const [goalMessage, setGoalMessage] = useState("");

    return <div className="page-container progress-tracking-page">
        <header className="page-header tracking-page-header">
            <h1>Progress Tracking</h1>
            <p>Track your preparation progress and stay on top of your interview readiness journey.</p>
        </header>

        <section className="tracking-summary-grid" aria-label="Preparation progress summary">
            {categories.map(({ label, Icon, color }) => <SummaryCard key={label} label={label} Icon={Icon} color={color}/>)}
        </section>

        <div className="tracking-chart-grid">
            <section className="tracking-panel overview-panel">
                <PanelHeading Icon={BarChart3} title="Progress Overview" description="Your preparation progress across different areas."
                    action={<label className="tracking-period"> <span className="sr-only">Chart period</span><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Last 8 Weeks</option><option>Last 4 Weeks</option><option>Last 12 Weeks</option></select></label>}/>
                <EmptyState title="No progress history available" description="Weekly progress will appear here when the app records preparation history."/>
            </section>

            <section className="tracking-panel category-panel">
                <PanelHeading Icon={PieChart} title="Skill Category Progress" description="Your progress in different skill categories."/>
                <div className="tracking-category-layout">
                    <div className="tracking-donut-placeholder" aria-label="No category progress data"><span>—</span><small>Overall</small></div>
                    <div className="tracking-category-list">{categoryBreakdown.map((item) => <div className="tracking-category-row" key={item.label}><span className={`tracking-legend-dot ${item.color}`}/><span>{item.label}</span><strong>—</strong></div>)}</div>
                </div>
                <p className="tracking-data-note">Category scores are not available yet.</p>
            </section>
        </div>

        <div className="tracking-lower-grid">
            <section className="tracking-panel">
                <PanelHeading Icon={CalendarClock} title="Recent Activity" description="Your latest preparation activities."
                    action={<span className="tracking-unavailable-action">History unavailable</span>}/>
                <EmptyState title="No recent activity" description="Completed practice and analysis activity will appear here when recorded."/>
            </section>

            <section className="tracking-panel">
                <PanelHeading Icon={Goal} title="Upcoming Goals" description="Set and track your preparation goals."
                    action={<button className="tracking-secondary-button" type="button" onClick={() => setGoalMessage("Goal management is not connected in this prototype yet.")}>Manage Goals</button>}/>
                <EmptyState title="No goals have been added" description="Your saved goals and completion progress will appear here."/>
                {goalMessage && <p className="tracking-status" role="status">{goalMessage}</p>}
            </section>
        </div>
        <p className="tracking-source-note"><CheckCircle2 size={14}/> Progress displays real recorded data when available. No sample history or goals are shown.</p>
    </div>;
}

export default ProgressTracking;
