import "../styles/behavioralQuestion.css";

function BehavioralQuestion() {
    return (
        <div className="page-container">

            {/* Page Header */}

            <div className="page-header">
                <h1>Behavioral Question</h1>

                <p>
                    Practice behavioral interview questions and improve
                    the way you communicate your experiences.
                </p>
            </div>


            {/* Practice Card */}

            <section className="behavioral-practice-card">

                <div className="behavioral-card-header">

                    <div>
                        <span className="behavioral-label">
                            AI Behavioral Practice
                        </span>

                        <h2>
                            Practice real interview situations
                        </h2>

                        <p>
                            Answer questions about teamwork, leadership,
                            problem-solving, communication, and workplace situations.
                        </p>
                    </div>

                    <div className="question-count">
                        10 Questions
                    </div>

                </div>


                <div className="behavioral-options">

                    <div className="behavioral-option">

                        <span>
                            Difficulty
                        </span>

                        <select defaultValue="Medium">

                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>

                        </select>

                    </div>


                    <div className="behavioral-option">

                        <span>
                            Interview Focus
                        </span>

                        <select defaultValue="Mixed">

                            <option>Mixed</option>
                            <option>Teamwork</option>
                            <option>Leadership</option>
                            <option>Communication</option>
                            <option>Problem Solving</option>
                            <option>Conflict Management</option>

                        </select>

                    </div>

                </div>


                <button className="start-behavioral-button">
                    Start Practice
                </button>

            </section>


            {/* Statistics */}

            <section className="behavioral-stats-grid">

                <div className="behavioral-stat-card">

                    <span>
                        Questions Attempted
                    </span>

                    <strong>
                        32
                    </strong>

                    <small>
                        Behavioral questions answered
                    </small>

                </div>


                <div className="behavioral-stat-card">

                    <span>
                        Average Score
                    </span>

                    <strong>
                        81%
                    </strong>

                    <small>
                        Across behavioral practice
                    </small>

                </div>


                <div className="behavioral-stat-card">

                    <span>
                        Interviews Completed
                    </span>

                    <strong>
                        4
                    </strong>

                    <small>
                        Behavioral sessions completed
                    </small>

                </div>

            </section>


            {/* Behavioral Skills */}

            <section className="behavioral-section-card">

                <div className="behavioral-section-header">

                    <h2>
                        Behavioral Skills
                    </h2>

                    <p>
                        Track your performance across important behavioral areas.
                    </p>

                </div>


                <div className="behavioral-skill-list">

                    <div className="behavioral-skill-item">

                        <div>
                            <strong>Communication</strong>

                            <span>
                                86% score
                            </span>
                        </div>

                        <div className="behavioral-progress">

                            <div style={{ width: "86%" }}></div>

                        </div>

                    </div>


                    <div className="behavioral-skill-item">

                        <div>
                            <strong>Teamwork</strong>

                            <span>
                                82% score
                            </span>
                        </div>

                        <div className="behavioral-progress">

                            <div style={{ width: "82%" }}></div>

                        </div>

                    </div>


                    <div className="behavioral-skill-item">

                        <div>
                            <strong>Problem Solving</strong>

                            <span>
                                78% score
                            </span>
                        </div>

                        <div className="behavioral-progress">

                            <div style={{ width: "78%" }}></div>

                        </div>

                    </div>


                    <div className="behavioral-skill-item">

                        <div>
                            <strong>Leadership</strong>

                            <span>
                                71% score
                            </span>
                        </div>

                        <div className="behavioral-progress">

                            <div style={{ width: "71%" }}></div>

                        </div>

                    </div>


                    <div className="behavioral-skill-item">

                        <div>
                            <strong>Conflict Management</strong>

                            <span>
                                64% score
                            </span>
                        </div>

                        <div className="behavioral-progress">

                            <div style={{ width: "64%" }}></div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Recommended Practice */}

            <section className="behavioral-section-card">

                <div className="behavioral-section-header">

                    <h2>
                        Recommended Practice
                    </h2>

                    <p>
                        Focus on these areas to improve your behavioral interview performance.
                    </p>

                </div>


                <div className="behavioral-recommendation-grid">

                    <div className="behavioral-recommendation">

                        <h3>
                            Conflict Management
                        </h3>

                        <p>
                            Practice explaining how you handle disagreements
                            and difficult workplace situations.
                        </p>

                        <button>
                            Practice Now
                        </button>

                    </div>


                    <div className="behavioral-recommendation">

                        <h3>
                            Leadership
                        </h3>

                        <p>
                            Prepare examples that demonstrate ownership,
                            decision-making, and leadership.
                        </p>

                        <button>
                            Practice Now
                        </button>

                    </div>


                    <div className="behavioral-recommendation">

                        <h3>
                            Problem Solving
                        </h3>

                        <p>
                            Practice explaining how you approach challenges
                            and achieve successful outcomes.
                        </p>

                        <button>
                            Practice Now
                        </button>

                    </div>

                </div>

            </section>


            {/* STAR Method */}

            <section className="behavioral-star-card">

                <div className="behavioral-section-header">

                    <h2>
                        Answer Using the STAR Method
                    </h2>

                    <p>
                        Structure your behavioral answers using four simple steps.
                    </p>

                </div>


                <div className="star-grid">

                    <div className="star-item">

                        <strong>
                            S — Situation
                        </strong>

                        <span>
                            Describe the situation or context.
                        </span>

                    </div>


                    <div className="star-item">

                        <strong>
                            T — Task
                        </strong>

                        <span>
                            Explain your responsibility or goal.
                        </span>

                    </div>


                    <div className="star-item">

                        <strong>
                            A — Action
                        </strong>

                        <span>
                            Explain what you specifically did.
                        </span>

                    </div>


                    <div className="star-item">

                        <strong>
                            R — Result
                        </strong>

                        <span>
                            Describe the outcome of your actions.
                        </span>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default BehavioralQuestion;