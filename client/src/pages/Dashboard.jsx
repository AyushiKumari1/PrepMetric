import { Link } from "react-router-dom";
import { Activity, BarChart3, BookOpen, FileText, Target, UsersRound } from "lucide-react";
import "../styles/dashboard.css";

const preparationActions = [
    { title: "Resume Analysis", description: "Analyze your resume and identify areas for improvement.", button: "Continue", to: "/resume-analysis", Icon: FileText, color: "purple" },
    { title: "Skill Gap Analysis", description: "Discover the skills you need for your target role.", button: "Continue", to: "/skill-gap-analysis", Icon: Target, color: "blue" },
    { title: "Mock Interview", description: "Practice realistic interview questions with AI.", button: "Start Practice", to: "/mock-interviews", Icon: UsersRound, color: "green" },
];

function SummaryCard({ title, value, description, Icon, color }) {
    return <article className="stat-card">
        <div className={`dashboard-icon ${color}`}><Icon size={19} strokeWidth={1.9}/></div>
        <div className="stat-copy"><span className="stat-title">{title}</span><strong className="stat-value">{value}</strong><span className="stat-description">{description}</span></div>
    </article>;
}

function Dashboard() {
    return <div className="dashboard-content">
        <section className="welcome-section">
            <h1>Welcome to PrepMetric <span aria-hidden="true">👋</span></h1>
            <p>Prepare smarter. Perform better. Get interview ready.</p>
        </section>

        <section className="stats-grid" aria-label="Preparation overview">
            <SummaryCard title="Preparation Score" value="—" description="No readiness data yet" Icon={BarChart3} color="purple"/>
            <SummaryCard title="Interviews" value="—" description="History is not available" Icon={UsersRound} color="green"/>
            <SummaryCard title="Skills Covered" value="—" description="No practice records yet" Icon={BookOpen} color="blue"/>
        </section>

        <section className="dashboard-grid">
            <article className="dashboard-card progress-card">
                <div className="card-header"><h2>Preparation Progress</h2><strong>—</strong></div>
                <div className="progress-bar" role="progressbar" aria-label="Preparation progress unavailable" aria-valuemin="0" aria-valuemax="100" aria-valuetext="No preparation progress data yet"><div className="progress-fill" style={{ width: "0%" }}/></div>
                <p className="card-description">Progress will appear when preparation history is recorded.</p>
            </article>

            <article className="dashboard-card recent-card">
                <div className="card-header"><h2>Recent Activity</h2></div>
                <div className="activity-list"><p className="activity-empty-state">No recent activity recorded yet.</p></div>
            </article>
        </section>

        <section className="dashboard-card continue-section">
            <div className="card-header"><div><h2>Continue Preparation</h2><p>Pick up where you left off</p></div><Activity className="continue-heading-icon" size={18}/></div>
            <div className="preparation-options">{preparationActions.map(({ title, description, button, to, Icon, color }) => <article className="preparation-option" key={title}>
                <div className={`action-icon ${color}`}><Icon size={18}/></div>
                <h3>{title}</h3><p>{description}</p>
                <Link to={to} className="action-button">{button}<span aria-hidden="true">→</span></Link>
            </article>)}</div>
        </section>
    </div>;
}

export default Dashboard;
