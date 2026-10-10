import { useRef, useState } from "react";
import {
    BarChart3, BookOpen, CalendarCheck, Lightbulb,
    MessageCircle, Play, Target, Users, Wrench, ClipboardList,
} from "lucide-react";
import "../styles/behavioralQuestion.css";

const focuses = ["Mixed", "Teamwork", "Leadership", "Communication", "Problem Solving", "Conflict Management"];
function getDefaultDifficulty() {
    try {
        const value = localStorage.getItem("prepmetric-default-difficulty");
        return ["Easy", "Medium", "Hard"].includes(value) ? value : "Medium";
    } catch {
        return "Medium";
    }
}
const skills = ["Communication", "Teamwork", "Problem Solving", "Leadership", "Conflict Management"];
const recommendations = [
    { topic: "Conflict Management", description: "Practice explaining how you handle disagreements and difficult workplace situations.", Icon: Users, color: "purple" },
    { topic: "Leadership", description: "Prepare examples that demonstrate ownership, decision-making, and leadership.", Icon: Target, color: "blue" },
    { topic: "Problem Solving", description: "Practice explaining how you approach challenges and achieve successful outcomes.", Icon: Wrench, color: "green" },
];
const starSteps = [
    { letter: "S", title: "Situation", description: "Describe the situation or context.", Icon: ClipboardList, color: "purple" },
    { letter: "T", title: "Task", description: "Explain your responsibility or goal.", Icon: Target, color: "blue" },
    { letter: "A", title: "Action", description: "Explain what you specifically did.", Icon: Wrench, color: "green" },
    { letter: "R", title: "Result", description: "Describe the outcome of your actions.", Icon: BarChart3, color: "amber" },
];

function MetricCard({ label, value, description, Icon, color }) {
    return <article className="behavioral-stat-card">
        <span className={`behavioral-icon-tile ${color}`}><Icon size={18}/></span>
        <div className="behavioral-metric-copy"><span>{label}</span><strong>{value}</strong><small>{description}</small></div>
    </article>;
}

function SectionHeading({ Icon, title, description }) {
    return <div className="behavioral-section-header">
        <span className="behavioral-section-icon"><Icon size={17}/></span>
        <div><h2>{title}</h2><p>{description}</p></div>
    </div>;
}

function BehavioralQuestion() {
    const [difficulty, setDifficulty] = useState(getDefaultDifficulty);
    const [focus, setFocus] = useState("Mixed");
    const [message, setMessage] = useState("");
    const practiceRef = useRef(null);

    const handleStartPractice = () => {
        setMessage("Behavioral practice sessions are not connected in this prototype yet. Your selected options are ready when that flow is available.");
    };

    const selectRecommendation = (topic) => {
        setFocus(topic);
        setMessage(`${topic} selected. Behavioral practice sessions are not connected in this prototype yet.`);
        practiceRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    };

    return <div className="page-container behavioral-question-page">
        <div className="page-header behavioral-page-header">
            <h1>Behavioral Question</h1>
            <p>Practice behavioral interview questions and improve the way you communicate your experiences.</p>
        </div>

        <section className="behavioral-practice-card" ref={practiceRef}>
            <div className="behavioral-card-header">
                <span className="behavioral-hero-icon"><Users size={20}/></span>
                <div className="behavioral-intro-copy">
                    <span className="behavioral-label">AI BEHAVIORAL PRACTICE</span>
                    <h2>Practice real interview situations</h2>
                    <p>Answer questions about teamwork, leadership, problem-solving, communication, and workplace situations.</p>
                </div>
                <span className="behavioral-question-count"><MessageCircle size={14}/>10 Questions</span>
            </div>
            <div className="behavioral-options">
                <label className="behavioral-option"><span>Difficulty</span><select value={difficulty} onChange={(event) => { setDifficulty(event.target.value); setMessage(""); }}><option>Easy</option><option>Medium</option><option>Hard</option></select></label>
                <label className="behavioral-option"><span>Interview Focus</span><select value={focus} onChange={(event) => { setFocus(event.target.value); setMessage(""); }}>{focuses.map((item) => <option key={item}>{item}</option>)}</select></label>
            </div>
            <button className="start-behavioral-button" type="button" onClick={handleStartPractice}><Play size={15} fill="currentColor"/>Start Practice</button>
            {message && <p className="behavioral-status-message" role="status">{message}</p>}
        </section>

        <section className="behavioral-stats-grid" aria-label="Behavioral practice metrics">
            <MetricCard label="Questions Attempted" value="0" description="No behavioral answers recorded" Icon={BookOpen} color="purple"/>
            <MetricCard label="Average Score" value="—" description="Available after evaluated answers" Icon={BarChart3} color="blue"/>
            <MetricCard label="Interviews Completed" value="0" description="No completed sessions recorded" Icon={CalendarCheck} color="green"/>
        </section>

        <section className="behavioral-section-card">
            <SectionHeading Icon={Target} title="Behavioral Skills" description="Track your performance across important behavioral areas."/>
            <div className="behavioral-skill-list">{skills.map((skill) => <div className="behavioral-skill-item" key={skill}>
                <strong>{skill}</strong>
                <div className="behavioral-progress" role="progressbar" aria-label={`${skill} score`} aria-valuemin="0" aria-valuemax="100" aria-valuenow="0"><div style={{ width: "0%" }}/></div>
                <span className="behavioral-no-data">Not enough data yet</span>
            </div>)}</div>
        </section>

        <section className="behavioral-section-card">
            <SectionHeading Icon={Lightbulb} title="Recommended Practice" description="Choose an area to set it as your interview focus."/>
            <div className="behavioral-recommendation-grid">{recommendations.map(({ topic, description, Icon, color }) => <article className="behavioral-recommendation" key={topic}>
                <span className={`behavioral-icon-tile ${color}`}><Icon size={17}/></span>
                <h3>{topic}</h3><p>{description}</p>
                <button type="button" onClick={() => selectRecommendation(topic)}>Practice Now <span aria-hidden="true">→</span></button>
            </article>)}</div>
        </section>

        <section className="behavioral-section-card behavioral-star-card">
            <SectionHeading Icon={BookOpen} title="Answer Using the STAR Method" description="A practical guide for structuring behavioral answers."/>
            <div className="star-grid">{starSteps.map(({ letter, title, description, Icon, color }) => <article className="star-item" key={letter}>
                <span className={`behavioral-icon-tile ${color}`}><Icon size={17}/></span>
                <strong><span className="star-letter">{letter}</span>{title}</strong><p>{description}</p>
            </article>)}</div>
        </section>
    </div>;
}

export default BehavioralQuestion;
