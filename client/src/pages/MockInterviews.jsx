import "../styles/mockInterviews.css";

function MockInterviews() {
    return (
        <div className="page-container">

            {/* Page Header */}

            <div className="page-header">
                <h1>Mock Interviews</h1>

                <p>
                    Practice realistic interviews and improve your
                    confidence before the real interview.
                </p>
            </div>


            {/* Start Interview */}

            <section className="mock-start-card">

                <div>
                    <span className="mock-label">
                        AI-Powered Interview Practice
                    </span>

                    <h2>
                        Ready for your next interview?
                    </h2>

                    <p>
                        Choose an interview type and start a realistic
                        practice session tailored to your target role.
                    </p>
                </div>

                <button className="start-interview-button">
                    Start Mock Interview
                </button>

            </section>


            {/* Interview Types */}

            <section className="mock-section">

                <div className="section-header">
                    <h2>Choose Interview Type</h2>

                    <p>
                        Select the type of interview you want to practice.
                    </p>
                </div>


                <div className="interview-type-grid">

                    <div className="interview-type-card">

                        <div className="interview-icon">
                            💻
                        </div>

                        <h3>Technical Interview</h3>

                        <p>
                            Practice technical questions based on your
                            skills, resume, and target role.
                        </p>

                        <button>
                            Practice Technical
                        </button>

                    </div>


                    <div className="interview-type-card">

                        <div className="interview-icon">
                            🗣️
                        </div>

                        <h3>Behavioral Interview</h3>

                        <p>
                            Practice questions about communication,
                            teamwork, leadership, and situations.
                        </p>

                        <button>
                            Practice Behavioral
                        </button>

                    </div>


                    <div className="interview-type-card">

                        <div className="interview-icon">
                            🎯
                        </div>

                        <h3>Mixed Interview</h3>

                        <p>
                            Combine technical and behavioral questions
                            in one complete interview.
                        </p>

                        <button>
                            Start Mixed Interview
                        </button>

                    </div>

                </div>

            </section>


            {/* Interview Statistics */}

            <section className="mock-stats-grid">

                <div className="mock-stat-card">

                    <span>
                        Interviews Completed
                    </span>

                    <strong>
                        4
                    </strong>

                    <small>
                        Total mock interviews
                    </small>

                </div>


                <div className="mock-stat-card">

                    <span>
                        Average Score
                    </span>

                    <strong>
                        78%
                    </strong>

                    <small>
                        Across completed interviews
                    </small>

                </div>


                <div className="mock-stat-card">

                    <span>
                        Last Interview
                    </span>

                    <strong>
                        82%
                    </strong>

                    <small>
                        Most recent performance
                    </small>

                </div>

            </section>


            {/* Recent Interviews */}

            <section className="mock-section">

                <div className="section-header">
                    <h2>Recent Interviews</h2>

                    <p>
                        Review your previous mock interview sessions.
                    </p>
                </div>


                <div className="recent-interviews">

                    <div className="recent-interview-item">

                        <div>
                            <strong>
                                Technical Interview
                            </strong>

                            <span>
                                React Developer
                            </span>
                        </div>

                        <div className="interview-score">
                            82%
                        </div>

                    </div>


                    <div className="recent-interview-item">

                        <div>
                            <strong>
                                Behavioral Interview
                            </strong>

                            <span>
                                Software Developer
                            </span>
                        </div>

                        <div className="interview-score">
                            76%
                        </div>

                    </div>


                    <div className="recent-interview-item">

                        <div>
                            <strong>
                                Mixed Interview
                            </strong>

                            <span>
                                Full Stack Developer
                            </span>
                        </div>

                        <div className="interview-score">
                            79%
                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default MockInterviews;