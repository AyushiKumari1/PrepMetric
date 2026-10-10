import { useRef, useState } from "react";
import {
    BarChart3, CheckCircle2, Code2, Database,
    Lightbulb, Network, Play, Server, Target, FileText,
} from "lucide-react";
import "../styles/technicalQuestion.css";

const topics = ["All Topics", "JavaScript", "React", "Node.js", "MongoDB", "Data Structures", "System Design"];
function getDefaultDifficulty() {
    try {
        const value = localStorage.getItem("prepmetric-default-difficulty");
        return ["Easy", "Medium", "Hard"].includes(value) ? value : "Medium";
    } catch {
        return "Medium";
    }
}
const recommendations = [
    { topic: "System Design", description: "Practice architecture patterns, scalability, and system trade-offs.", Icon: Database, color: "purple" },
    { topic: "Data Structures", description: "Review algorithms, complexity, and common data structures.", Icon: Network, color: "blue" },
    { topic: "Node.js", description: "Study APIs, asynchronous programming, and server-side concepts.", Icon: Server, color: "green" },
];

function MetricCard({ label, value, description, Icon, color }) {
    return <article className="technical-stat-card"><span className={`technical-stat-icon ${color}`}><Icon size={18}/></span><div><span className="technical-stat-label">{label}</span><strong>{value}</strong><small>{description}</small></div></article>;
}

function RecommendationCard({ topic, description, Icon, color, onSelect }) {
    return <article className="recommended-topic"><span className={`recommendation-icon ${color}`}><Icon size={17}/></span><h3>{topic}</h3><p>{description}</p><button type="button" onClick={() => onSelect(topic)}>Practice Now <span aria-hidden="true">→</span></button></article>;
}

function TechnicalQuestion() {
    const [difficulty, setDifficulty] = useState(getDefaultDifficulty);
    const [topic, setTopic] = useState("All Topics");
    const [message, setMessage] = useState("");
    const practiceRef = useRef(null);

    const handleStartPractice = () => {
        setMessage("Practice sessions are not connected in this prototype yet. Your selected difficulty and topic are ready to use when that flow is added.");
    };
    const selectRecommendedTopic = (selectedTopic) => {
        setTopic(selectedTopic);
        setMessage(`${selectedTopic} selected. Practice sessions are not connected in this prototype yet.`);
        practiceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return <div className="page-container technical-question-page">
        <div className="page-header technical-page-header">
            <h1>Technical Question</h1>
            <p>Practice technical interview questions based on your skills, experience, and target role.</p>
        </div>

        <section className="technical-practice-card" ref={practiceRef}>
            <div className="technical-card-header">
                <span className="technical-hero-icon"><Code2 size={20}/></span>
                <div className="technical-intro-copy">
                    <span className="technical-label">AI TECHNICAL PRACTICE</span>
                    <h2>Test your technical knowledge</h2>
                    <p>Answer technical questions and improve your understanding of important concepts.</p>
                </div>
                <span className="question-count"><FileText size={14}/>10 Questions</span>
            </div>

            <div className="technical-options">
                <label className="technical-option"><span>Difficulty</span><select value={difficulty} onChange={(event) => setDifficulty(event.target.value)}><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
                <label className="technical-option"><span>Topic</span><select value={topic} onChange={(event) => { setTopic(event.target.value); setMessage(""); }}>{topics.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>

            <button className="start-technical-button" type="button" onClick={handleStartPractice}><Play size={15} fill="currentColor"/>Start Practice</button>
            {message && <p className="technical-status-message" role="status">{message}</p>}
        </section>

        <section className="technical-stats-grid" aria-label="Technical practice metrics">
            <MetricCard label="Questions Attempted" value="0" description="No questions answered yet" Icon={FileText} color="purple"/>
            <MetricCard label="Average Score" value="—" description="Available after evaluated answers" Icon={BarChart3} color="blue"/>
            <MetricCard label="Correct Answers" value="0" description="No evaluated answers yet" Icon={CheckCircle2} color="green"/>
        </section>

        <section className="technical-section-card">
            <div className="technical-section-header"><span className="technical-section-icon target"><Target size={17}/></span><div><h2>Topic Accuracy</h2><p>See how well you perform in different technical topics.</p></div></div>
            <div className="topic-list">{topics.slice(1).map((item) => <div className="topic-item" key={item}><strong>{item}</strong><div className="topic-progress" role="progressbar" aria-label={`${item} accuracy`} aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div style={{ width: "0%" }}/></div><span className="topic-no-data">Not enough data yet</span></div>)}</div>
        </section>

        <section className="technical-section-card recommended-section">
            <div className="technical-section-header"><span className="technical-section-icon idea"><Lightbulb size={17}/></span><div><h2>Recommended Practice</h2><p>Focus on these topics to build your technical readiness.</p></div></div>
            <div className="recommended-topic-grid">{recommendations.map((item) => <RecommendationCard key={item.topic} {...item} onSelect={selectRecommendedTopic}/>)}</div>
        </section>
    </div>;
}

export default TechnicalQuestion;
