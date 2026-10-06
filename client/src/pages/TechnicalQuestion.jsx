import "../styles/technicalQuestion.css";

function TechnicalQuestion() {
    return (
        <div className="page-container">

            {/* Page Header */}

            <div className="page-header">
                <h1>Technical Question</h1>

                <p>
                    Practice technical interview questions based on your
                    skills, experience, and target role.
                </p>
            </div>


            {/* Question Practice */}

            <section className="technical-practice-card">

                <div className="technical-card-header">

                    <div>
                        <span className="technical-label">
                            AI Technical Practice
                        </span>

                        <h2>
                            Test your technical knowledge
                        </h2>

                        <p>
                            Answer technical questions and improve your
                            understanding of important concepts.
                        </p>
                    </div>

                    <div className="question-count">
                        10 Questions
                    </div>

                </div>


                <div className="technical-options">

                    <div className="technical-option">

                        <span>
                            Difficulty
                        </span>

                        <select defaultValue="Medium">

                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>

                        </select>

                    </div>


                    <div className="technical-option">

                        <span>
                            Topic
                        </span>

                        <select defaultValue="All Topics">

                            <option>All Topics</option>
                            <option>JavaScript</option>
                            <option>React</option>
                            <option>Node.js</option>
                            <option>MongoDB</option>
                            <option>Data Structures</option>
                            <option>System Design</option>

                        </select>

                    </div>

                </div>


                <button className="start-technical-button">
                    Start Practice
                </button>

            </section>


            {/* Technical Statistics */}

            <section className="technical-stats-grid">

                <div className="technical-stat-card">

                    <span>
                        Questions Attempted
                    </span>

                    <strong>
                        48
                    </strong>

                    <small>
                        Total questions answered
                    </small>

                </div>


                <div className="technical-stat-card">

                    <span>
                        Average Score
                    </span>

                    <strong>
                        76%
                    </strong>

                    <small>
                        Across technical questions
                    </small>

                </div>


                <div className="technical-stat-card">

                    <span>
                        Correct Answers
                    </span>

                    <strong>
                        37
                    </strong>

                    <small>
                        Questions answered correctly
                    </small>

                </div>

            </section>


            {/* Topics */}

            <section className="technical-section-card">

                <div className="technical-section-header">

                    <h2>
                        Technical Topics
                    </h2>

                    <p>
                        Track your practice across different technical areas.
                    </p>

                </div>


                <div className="topic-list">

                    <div className="topic-item">

                        <div>
                            <strong>JavaScript</strong>

                            <span>
                                82% accuracy
                            </span>
                        </div>

                        <div className="topic-progress">

                            <div style={{ width: "82%" }}></div>

                        </div>

                    </div>


                    <div className="topic-item">

                        <div>
                            <strong>React</strong>

                            <span>
                                78% accuracy
                            </span>
                        </div>

                        <div className="topic-progress">

                            <div style={{ width: "78%" }}></div>

                        </div>

                    </div>


                    <div className="topic-item">

                        <div>
                            <strong>Node.js</strong>

                            <span>
                                70% accuracy
                            </span>
                        </div>

                        <div className="topic-progress">

                            <div style={{ width: "70%" }}></div>

                        </div>

                    </div>


                    <div className="topic-item">

                        <div>
                            <strong>Data Structures</strong>

                            <span>
                                65% accuracy
                            </span>
                        </div>

                        <div className="topic-progress">

                            <div style={{ width: "65%" }}></div>

                        </div>

                    </div>


                    <div className="topic-item">

                        <div>
                            <strong>System Design</strong>

                            <span>
                                52% accuracy
                            </span>
                        </div>

                        <div className="topic-progress">

                            <div style={{ width: "52%" }}></div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Recommended Topics */}

            <section className="technical-section-card">

                <div className="technical-section-header">

                    <h2>
                        Recommended Practice
                    </h2>

                    <p>
                        Focus on these topics to improve your technical readiness.
                    </p>

                </div>


                <div className="recommended-topic-grid">

                    <div className="recommended-topic">

                        <h3>
                            System Design
                        </h3>

                        <p>
                            Your current accuracy is lower in this area.
                            Practice architecture and scalability questions.
                        </p>

                        <button>
                            Practice Now
                        </button>

                    </div>


                    <div className="recommended-topic">

                        <h3>
                            Data Structures
                        </h3>

                        <p>
                            Strengthen your understanding of algorithms,
                            complexity, and common data structures.
                        </p>

                        <button>
                            Practice Now
                        </button>

                    </div>


                    <div className="recommended-topic">

                        <h3>
                            Node.js
                        </h3>

                        <p>
                            Practice backend concepts, APIs, asynchronous
                            programming, and server-side development.
                        </p>

                        <button>
                            Practice Now
                        </button>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default TechnicalQuestion;