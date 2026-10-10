import { Link } from "react-router-dom";
import { useRef } from "react";
import {
    ArrowRight, BarChart3, Clock3, Code2, FileText, Grid2X2, MessageSquareText,
    Play, Target, Trophy, UsersRound,
} from "lucide-react";
import "../styles/mockInterviews.css";

const interviewTypes = [
    { title: "Technical Interview", description: "Practice technical questions based on your skills, resume, and target role.", action: "Practice Technical", to: "/technical-question", Icon: Code2, color: "purple" },
    { title: "Behavioral Interview", description: "Practice questions about communication, teamwork, leadership, and situations.", action: "Practice Behavioral", to: "/behavioral-question", Icon: MessageSquareText, color: "blue" },
    { title: "Mixed Interview", description: "Combine technical and behavioral questions in one complete interview.", action: "Mixed mode unavailable", Icon: Target, color: "green", unavailable: true },
];

function InterviewTypeCard({ title, description, action, to, Icon, color, unavailable }) {
    return <article className="interview-type-card">
        <span className={`interview-icon ${color}`}><Icon size={18}/></span>
        <h3>{title}</h3>
        <p>{description}</p>
        {unavailable ? <button type="button" disabled title="Mixed interview sessions are not implemented yet">{action}</button> : <Link className="interview-action-button" to={to}>{action}<ArrowRight size={14}/></Link>}
    </article>;
}

function SummaryCard({ title, value, description, Icon, color }) {
    return <article className="mock-stat-card">
        <span className={`mock-stat-icon ${color}`}><Icon size={18}/></span>
        <div className="mock-stat-copy"><span>{title}</span><strong>{value}</strong><small>{description}</small></div>
    </article>;
}

function MockInterviews() {
    const typesRef = useRef(null);
    const startRef = () => {
        typesRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
        typesRef.current?.focus({ preventScroll: true });
    };

    return <div className="page-container mock-interviews-page">
        <div className="page-header mock-page-header">
            <h1>Mock Interviews</h1>
            <p>Practice realistic interviews and improve your confidence before the real interview.</p>
        </div>

        <section className="mock-start-card">
            <div className="mock-hero-icon"><UsersRound size={20}/></div>
            <div className="mock-hero-copy">
                <span className="mock-label">AI-POWERED INTERVIEW PRACTICE</span>
                <h2>Ready for your next interview?</h2>
                <p>Choose an interview type and start a realistic practice session tailored to your target role.</p>
            </div>
            <button className="start-interview-button" type="button" onClick={startRef}><Play size={15} fill="currentColor"/>Start Mock Interview</button>
        </section>

        <section className="mock-section interview-types-section" ref={typesRef} tabIndex={-1}>
            <div className="section-header"><span className="mock-section-icon"><Grid2X2 size={17}/></span><div><h2>Choose Interview Type</h2><p>Select the type of interview you want to practice.</p></div></div>
            <div className="interview-type-grid">{interviewTypes.map((type) => <InterviewTypeCard key={type.title} {...type}/>)}</div>
        </section>

        <section className="mock-stats-grid" aria-label="Interview performance summary">
            <SummaryCard title="Interviews Completed" value="0" description="No completed sessions recorded" Icon={FileText} color="purple"/>
            <SummaryCard title="Average Score" value="—" description="Available after a completed session" Icon={BarChart3} color="blue"/>
            <SummaryCard title="Last Interview" value="—" description="No completed sessions yet" Icon={Trophy} color="green"/>
        </section>

        <section className="mock-section recent-section">
            <div className="section-header"><span className="mock-section-icon"><Clock3 size={17}/></span><div><h2>Recent Interviews</h2><p>Review your previous mock interview sessions.</p></div></div>
            <div className="recent-empty-state"><span><Clock3 size={20}/></span><p>No completed interview sessions recorded yet.</p><Link to="/technical-question">Start your first practice session</Link></div>
        </section>
    </div>;
}

export default MockInterviews;
