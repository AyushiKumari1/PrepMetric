import "../styles/performance.css";

function Performance() {
    return (
        <div className="page-container">

            {/* Page Header */}

            <div className="page-header">
                <h1>Performance</h1>

                <p>
                    Review your interview performance and identify areas
                    where you can improve.
                </p>
            </div>


            {/* Overall Performance */}

            <section className="performance-overview-card">

                <div className="performance-overview-content">

                    <div>
                        <span className="performance-label">
                            Overall Performance
                        </span>

                        <strong className="performance-score">
                            78%
                        </strong>

                        <p>
                            Your average performance across interview practice.
                        </p>
                    </div>


                    <div className="performance-summary">

                        <div>
                            <span>
                                Previous Score
                            </span>

                            <strong>
                                72%
                            </strong>
                        </div>

                        <div>
                            <span>
                                Improvement
                            </span>

                            <strong>
                                +6%
                            </strong>
                        </div>

                    </div>

                </div>

            </section>


            {/* Performance Statistics */}

            <section className="performance-stats-grid">

                <div className="performance-stat-card">

                    <span>
                        Technical Score
                    </span>

                    <strong>
                        76%
                    </strong>

                    <small>
                        Technical questions
                    </small>

                </div>


                <div className="performance-stat-card">

                    <span>
                        Behavioral Score
                    </span>

                    <strong>
                        81%
                    </strong>

                    <small>
                        Behavioral questions
                    </small>

                </div>


                <div className="performance-stat-card">

                    <span>
                        Communication
                    </span>

                    <strong>
                        84%
                    </strong>

                    <small>
                        Communication performance
                    </small>

                </div>


                <div className="performance-stat-card">

                    <span>
                        Confidence
                    </span>

                    <strong>
                        75%
                    </strong>

                    <small>
                        Interview confidence
                    </small>

                </div>

            </section>


            {/* Performance Breakdown */}

            <section className="performance-section-card">

                <div className="performance-section-header">

                    <h2>
                        Performance Breakdown
                    </h2>

                    <p>
                        See how you are performing across important interview areas.
                    </p>

                </div>


                <div className="performance-breakdown-list">

                    <div className="performance-breakdown-item">

                        <div className="performance-breakdown-info">

                            <strong>
                                Technical Knowledge
                            </strong>

                            <span>
                                76%
                            </span>

                        </div>

                        <div className="performance-progress">

                            <div style={{ width: "76%" }}></div>

                        </div>

                    </div>


                    <div className="performance-breakdown-item">

                        <div className="performance-breakdown-info">

                            <strong>
                                Problem Solving
                            </strong>

                            <span>
                                74%
                            </span>

                        </div>

                        <div className="performance-progress">

                            <div style={{ width: "74%" }}></div>

                        </div>

                    </div>


                    <div className="performance-breakdown-item">

                        <div className="performance-breakdown-info">

                            <strong>
                                Communication
                            </strong>

                            <span>
                                84%
                            </span>

                        </div>

                        <div className="performance-progress">

                            <div style={{ width: "84%" }}></div>

                        </div>

                    </div>


                    <div className="performance-breakdown-item">

                        <div className="performance-breakdown-info">

                            <strong>
                                Behavioral Responses
                            </strong>

                            <span>
                                81%
                            </span>

                        </div>

                        <div className="performance-progress">

                            <div style={{ width: "81%" }}></div>

                        </div>

                    </div>


                    <div className="performance-breakdown-item">

                        <div className="performance-breakdown-info">

                            <strong>
                                Answer Structure
                            </strong>

                            <span>
                                79%
                            </span>

                        </div>

                        <div className="performance-progress">

                            <div style={{ width: "79%" }}></div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Strengths and Improvements */}

            <section className="performance-two-column">

                <div className="performance-section-card">

                    <div className="performance-section-header">

                        <h2>
                            Your Strengths
                        </h2>

                        <p>
                            Areas where your performance is strong.
                        </p>

                    </div>


                    <div className="performance-list">

                        <div>
                            ✓ Clear communication
                        </div>

                        <div>
                            ✓ Good technical fundamentals
                        </div>

                        <div>
                            ✓ Strong teamwork examples
                        </div>

                        <div>
                            ✓ Structured answers
                        </div>

                    </div>

                </div>


                <div className="performance-section-card">

                    <div className="performance-section-header">

                        <h2>
                            Areas to Improve
                        </h2>

                        <p>
                            Areas that need more practice.
                        </p>

                    </div>


                    <div className="performance-list">

                        <div>
                            ⚠ System design concepts
                        </div>

                        <div>
                            ⚠ Problem-solving speed
                        </div>

                        <div>
                            ⚠ Conflict management examples
                        </div>

                        <div>
                            ⚠ Technical depth
                        </div>

                    </div>

                </div>

            </section>


            {/* Recent Interview Performance */}

            <section className="performance-section-card">

                <div className="performance-section-header">

                    <h2>
                        Recent Interview Performance
                    </h2>

                    <p>
                        Your scores from recent mock interviews.
                    </p>

                </div>


                <div className="performance-table">

                    <div className="performance-table-header">

                        <span>
                            Interview
                        </span>

                        <span>
                            Type
                        </span>

                        <span>
                            Score
                        </span>

                        <span>
                            Status
                        </span>

                    </div>


                    <div className="performance-table-row">

                        <span>
                            Interview 01
                        </span>

                        <span>
                            Technical
                        </span>

                        <strong>
                            82%
                        </strong>

                        <span>
                            Completed
                        </span>

                    </div>


                    <div className="performance-table-row">

                        <span>
                            Interview 02
                        </span>

                        <span>
                            Behavioral
                        </span>

                        <strong>
                            76%
                        </strong>

                        <span>
                            Completed
                        </span>

                    </div>


                    <div className="performance-table-row">

                        <span>
                            Interview 03
                        </span>

                        <span>
                            Mixed
                        </span>

                        <strong>
                            79%
                        </strong>

                        <span>
                            Completed
                        </span>

                    </div>


                    <div className="performance-table-row">

                        <span>
                            Interview 04
                        </span>

                        <span>
                            Technical
                        </span>

                        <strong>
                            82%
                        </strong>

                        <span>
                            Completed
                        </span>

                    </div>

                </div>

            </section>


            {/* Improvement Suggestions */}

            <section className="performance-section-card">

                <div className="performance-section-header">

                    <h2>
                        Improvement Suggestions
                    </h2>

                    <p>
                        Recommendations based on your recent performance.
                    </p>

                </div>


                <div className="performance-suggestion-grid">

                    <div className="performance-suggestion">

                        <h3>
                            Practice System Design
                        </h3>

                        <p>
                            Spend more time practicing architecture,
                            scalability, and database design questions.
                        </p>

                    </div>


                    <div className="performance-suggestion">

                        <h3>
                            Improve Answer Depth
                        </h3>

                        <p>
                            Support your answers with specific examples,
                            technical reasoning, and measurable outcomes.
                        </p>

                    </div>


                    <div className="performance-suggestion">

                        <h3>
                            Practice Under Time Limits
                        </h3>

                        <p>
                            Use timed practice sessions to improve your
                            response speed and confidence.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Performance;