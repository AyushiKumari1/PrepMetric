import { useState } from "react";
import {
    AlertCircle, Award, BarChart3, Brain, Clock3, Code2, FileText,
    PieChart, Target,
} from "lucide-react";
import "../styles/performance.css";

const metricCards = [
    { label: "Overall Score", Icon: Award, color: "purple" },
    { label: "Resume Analysis", Icon: FileText, color: "blue" },
    { label: "Technical Practice", Icon: Code2, color: "green" },
    { label: "Behavioral Practice", Icon: Brain, color: "amber" },
];
const categories = ["Technical", "Behavioral", "Resume", "Skill Gap"];
const tableColumns = {
    Technical: ["Topic", "Questions Attempted", "Correct", "Accuracy"],
    Behavioral: ["Area", "Responses", "Evaluated", "Score"],
    Resume: ["Criterion", "Reviewed", "Met", "Score"],
    "Skill Gap": ["Skill", "Requirements", "Matched", "Match"],
};

function EmptyState({ title, description }) {
    return <div className="performance-empty-state">
        <span><AlertCircle size={18}/></span><strong>{title}</strong><p>{description}</p>
    </div>;
}

function MetricCard({ label, Icon, color }) {
    return <article className="performance-metric-card">
        <div className="performance-metric-heading"><span className={`performance-icon-tile ${color}`}><Icon size={17}/></span><span>{label}</span></div>
        <strong className="performance-metric-value">—</strong>
        <div className="performance-metric-track" role="progressbar" aria-label={`${label} unavailable`} aria-valuemin="0" aria-valuemax="100" aria-valuetext="No performance data yet"><span style={{ width: 0 }}/></div>
        <small>No recorded score yet</small>
    </article>;
}

function PanelHeading({ Icon, title, description, action }) {
    return <div className="performance-panel-heading">
        <span className="performance-panel-icon"><Icon size={17}/></span>
        <div className="performance-heading-copy"><h2>{title}</h2><p>{description}</p></div>
        {action}
    </div>;
}

function Performance() {
    const [period, setPeriod] = useState("Last 8 Weeks");
    const [activeCategory, setActiveCategory] = useState("Technical");
    const columns = tableColumns[activeCategory];

    return <div className="page-container performance-page">
        <header className="page-header performance-page-header">
            <h1>Performance</h1>
            <p>Analyze your interview preparation performance and identify areas for improvement.</p>
        </header>

        <section className="performance-metrics-grid" aria-label="Performance summary">
            {metricCards.map(({ label, Icon, color }) => <MetricCard key={label} label={label} Icon={Icon} color={color}/>)}
        </section>

        <div className="performance-charts-grid">
            <section className="performance-panel">
                <PanelHeading Icon={BarChart3} title="Performance Trends" description="Track your improvement over time across different areas."
                    action={<label className="performance-period"><span className="performance-sr-only">Chart period</span><select value={period} onChange={(event) => setPeriod(event.target.value)}><option>Last 8 Weeks</option><option>Last 4 Weeks</option><option>Last 12 Weeks</option></select></label>}/>
                <div className="performance-chart-empty"><EmptyState title="No performance history available" description={`Trend lines for ${period.toLowerCase()} will appear after evaluated practice results are recorded.`}/></div>
                <div className="performance-legend" aria-label="Chart categories"><span><i className="purple"/>Overall</span><span><i className="blue"/>Resume</span><span><i className="green"/>Technical</span><span><i className="amber"/>Behavioral</span></div>
            </section>

            <section className="performance-panel">
                <PanelHeading Icon={PieChart} title="Category Performance" description="Performance across preparation areas."/>
                <div className="performance-category-empty">
                    <EmptyState title="Category scores are unavailable" description="A category breakdown will appear when the application has evaluated performance data."/>
                </div>
                <p className="performance-chart-note">Separate category scores are not a percentage distribution.</p>
            </section>
        </div>

        <div className="performance-detail-grid">
            <section className="performance-panel performance-detail-panel">
                <PanelHeading Icon={BarChart3} title="Detailed Performance" description="Your performance breakdown by category and subtopics."/>
                <div className="performance-tabs" role="tablist" aria-label="Performance category">
                    {categories.map((category) => <button key={category} type="button" role="tab" aria-selected={activeCategory === category} className={activeCategory === category ? "active" : ""} onClick={() => setActiveCategory(category)}>{category}</button>)}
                </div>
                <div className="performance-table-wrap">
                    <table className="performance-data-table">
                        <thead><tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
                        <tbody><tr><td colSpan={columns.length}><EmptyState title={`No ${activeCategory.toLowerCase()} results yet`} description="Evaluated records will appear here when available."/></td></tr></tbody>
                    </table>
                </div>
            </section>

            <div className="performance-side-column">
                <section className="performance-panel">
                    <PanelHeading Icon={Target} title="Strengths & Weaknesses" description="Your strong areas and areas to focus on."/>
                    <div className="performance-strength-grid">
                        <div className="performance-strength-block strength"><h3>Strengths</h3><EmptyState title="Not enough data yet" description="Strengths will be identified from evaluated results."/></div>
                        <div className="performance-strength-block weakness"><h3>Areas to Improve</h3><EmptyState title="Not enough data yet" description="Areas to improve will be based on your actual scores."/></div>
                    </div>
                </section>
                <section className="performance-panel performance-activity-panel">
                    <PanelHeading Icon={Clock3} title="Recent Activity" description="Your latest preparation activities."/>
                    <EmptyState title="No recent activity" description="Completed sessions and analysis records will appear here."/>
                </section>
            </div>
        </div>
    </div>;
}

export default Performance;
