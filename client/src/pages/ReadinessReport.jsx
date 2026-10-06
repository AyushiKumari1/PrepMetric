import "../styles/readinessReport.css";

function ReadinessReport() {
    return (
        <div className="page-container">

            {/* Page Header */}

            <div className="page-header">
                <h1>Readiness Report</h1>

                <p>
                    Get a complete overview of your interview preparation
                    and understand where you are ready and where you need
                    more practice.
                </p>
            </div>


            {/* Overall Readiness */}

            <section className="readiness-overview-card">

                <div className="readiness-overview-content">

                    <div>
                        <span className="readiness-label">
                            Overall Interview Readiness
                        </span>

                        <strong className="readiness-score">
                            78%
                        </strong>

                        <p>
                            Your current preparation shows good progress
                            toward your target role.
                        </p>
                    </div>


                    <div className="readiness-status">
                        <strong>
                            Good Progress
                        </strong>

                        <span>
                            Keep practicing to improve your readiness.
                        </span>
                    </div>

                </div>


                <div className="readiness-progress-bar">

                    <div
                        className="readiness-progress-fill"
                        style={{ width: "78%" }}
                    ></div>

                </div>

            </section>


            {/* Readiness Statistics */}

            <section className="readiness-stats-grid">

                <div className="readiness-stat-card">

                    <span>
                        Resume Readiness
                    </span>

                    <strong>
                        78%
                    </strong>

                    <small>
                        Resume quality and relevance
                    </small>

                </div>


                <div className="readiness-stat-card">

                    <span>
                        Skill Match
                    </span>

                    <strong>
                        72%
                    </strong>

                    <small>
                        Match with target role
                    </small>

                </div>


                <div className="readiness-stat-card">

                    <span>
                        Technical Readiness
                    </span>

                    <strong>
                        76%
                    </strong>

                    <small>
                        Technical preparation
                    </small>

                </div>


                <div className="readiness-stat-card">

                    <span>
                        Behavioral Readiness
                    </span>

                    <strong>
                        81%
                    </strong>

                    <small>
                        Behavioral preparation
                    </small>

                </div>

            </section>


            {/* Readiness Breakdown */}

            <section className="readiness-section-card">

                <div className="readiness-section-header">

                    <h2>
                        Readiness Breakdown
                    </h2>

                    <p>
                        Review your preparation across the major interview areas.
                    </p>

                </div>


                <div className="readiness-breakdown-list">

                    <div className="readiness-breakdown-item">

                        <div className="readiness-breakdown-info">

                            <strong>
                                Resume
                            </strong>

                            <span>
                                78%
                            </span>

                        </div>

                        <div className="readiness-breakdown-bar">

                            <div style={{ width: "78%" }}></div>

                        </div>

                    </div>


                    <div className="readiness-breakdown-item">

                        <div className="readiness-breakdown-info">

                            <strong>
                                Job Description Understanding
                            </strong>

                            <span>
                                80%
                            </span>

                        </div>

                        <div className="readiness-breakdown-bar">

                            <div style={{ width: "80%" }}></div>

                        </div>

                    </div>


                    <div className="readiness-breakdown-item">

                        <div className="readiness-breakdown-info">

                            <strong>
                                Skill Match
                            </strong>

                            <span>
                                72%
                            </span>

                        </div>

                        <div className="readiness-breakdown-bar">

                            <div style={{ width: "72%" }}></div>

                        </div>

                    </div>


                    <div className="readiness-breakdown-item">

                        <div className="readiness-breakdown-info">

                            <strong>
                                Technical Questions
                            </strong>

                            <span>
                                76%
                            </span>

                        </div>

                        <div className="readiness-breakdown-bar">

                            <div style={{ width: "76%" }}></div>

                        </div>

                    </div>


                    <div className="readiness-breakdown-item">

                        <div className="readiness-breakdown-info">

                            <strong>
                                Behavioral Questions
                            </strong>

                            <span>
                                81%
                            </span>

                        </div>

                        <div className="readiness-breakdown-bar">

                            <div style={{ width: "81%" }}></div>

                        </div>

                    </div>


                    <div className="readiness-breakdown-item">

                        <div className="readiness-breakdown-info">

                            <strong>
                                Mock Interview Performance
                            </strong>

                            <span>
                                78%
                            </span>

                        </div>

                        <div className="readiness-breakdown-bar">

                            <div style={{ width: "78%" }}></div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Strengths and Improvements */}

            <section className="readiness-two-column">

                <div className="readiness-section-card">

                    <div className="readiness-section-header">

                        <h2>
                            Your Strengths
                        </h2>

                        <p>
                            Areas where your preparation is currently strong.
                        </p>

                    </div>


                    <div className="readiness-list">

                        <div>
                            ✓ Strong communication skills
                        </div>

                        <div>
                            ✓ Good behavioral interview performance
                        </div>

                        <div>
                            ✓ Solid technical fundamentals
                        </div>

                        <div>
                            ✓ Relevant project experience
                        </div>

                    </div>

                </div>


                <div className="readiness-section-card">

                    <div className="readiness-section-header">

                        <h2>
                            Focus Areas
                        </h2>

                        <p>
                            Areas that could benefit from additional preparation.
                        </p>

                    </div>


                    <div className="readiness-list">

                        <div>
                            ⚠ System design
                        </div>

                        <div>
                            ⚠ Advanced technical concepts
                        </div>

                        <div>
                            ⚠ Problem-solving speed
                        </div>

                        <div>
                            ⚠ Skill gaps for target role
                        </div>

                    </div>

                </div>

            </section>


            {/* Interview Readiness */}

            <section className="readiness-section-card">

                <div className="readiness-section-header">

                    <h2>
                        Interview Readiness
                    </h2>

                    <p>
                        Summary of your current interview preparation.
                    </p>

                </div>


                <div className="readiness-summary-grid">

                    <div className="readiness-summary-item">

                        <span>
                            Technical
                        </span>

                        <strong>
                            76%
                        </strong>

                        <small>
                            Good foundation
                        </small>

                    </div>


                    <div className="readiness-summary-item">

                        <span>
                            Behavioral
                        </span>

                        <strong>
                            81%
                        </strong>

                        <small>
                            Strong preparation
                        </small>

                    </div>


                    <div className="readiness-summary-item">

                        <span>
                            Communication
                        </span>

                        <strong>
                            84%
                        </strong>

                        <small>
                            Strong performance
                        </small>

                    </div>


                    <div className="readiness-summary-item">

                        <span>
                            Confidence
                        </span>

                        <strong>
                            75%
                        </strong>

                        <small>
                            Needs more practice
                        </small>

                    </div>

                </div>

            </section>


            {/* Final Recommendations */}

            <section className="readiness-section-card">

                <div className="readiness-section-header">

                    <h2>
                        Final Recommendations
                    </h2>

                    <p>
                        Follow these steps to continue improving your interview readiness.
                    </p>

                </div>


                <div className="readiness-recommendation-list">

                    <div className="readiness-recommendation">

                        <div className="recommendation-number">
                            1
                        </div>

                        <div>
                            <strong>
                                Practice System Design
                            </strong>

                            <span>
                                Focus on architecture, scalability,
                                databases, and system design concepts.
                            </span>
                        </div>

                    </div>


                    <div className="readiness-recommendation">

                        <div className="recommendation-number">
                            2
                        </div>

                        <div>
                            <strong>
                                Close Your Skill Gaps
                            </strong>

                            <span>
                                Work on the missing skills identified
                                for your target role.
                            </span>
                        </div>

                    </div>


                    <div className="readiness-recommendation">

                        <div className="recommendation-number">
                            3
                        </div>

                        <div>
                            <strong>
                                Complete More Mock Interviews
                            </strong>

                            <span>
                                Practice realistic interviews to improve
                                confidence and response quality.
                            </span>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default ReadinessReport;