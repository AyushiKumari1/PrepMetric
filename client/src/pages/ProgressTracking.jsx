import "../styles/progressTracking.css";

function ProgressTracking() {
    return (
        <div className="page-container">

            {/* Page Header */}

            <div className="page-header">
                <h1>Progress Tracking</h1>

                <p>
                    Track your interview preparation progress and see
                    how your performance improves over time.
                </p>
            </div>


            {/* Overall Progress */}

            <section className="progress-overview-card">

                <div className="progress-overview-header">

                    <div>
                        <span className="progress-label">
                            Overall Preparation
                        </span>

                        <h2>
                            72%
                        </h2>

                        <p>
                            Your overall preparation progress.
                        </p>
                    </div>

                    <div className="progress-status">
                        On Track
                    </div>

                </div>


                <div className="overall-progress-bar">

                    <div
                        className="overall-progress-fill"
                        style={{ width: "72%" }}
                    ></div>

                </div>

            </section>


            {/* Progress Statistics */}

            <section className="progress-stats-grid">

                <div className="progress-stat-card">

                    <span>
                        Questions Practiced
                    </span>

                    <strong>
                        80
                    </strong>

                    <small>
                        Technical + behavioral
                    </small>

                </div>


                <div className="progress-stat-card">

                    <span>
                        Interviews Completed
                    </span>

                    <strong>
                        4
                    </strong>

                    <small>
                        Mock interview sessions
                    </small>

                </div>


                <div className="progress-stat-card">

                    <span>
                        Skills Covered
                    </span>

                    <strong>
                        18/25
                    </strong>

                    <small>
                        Target role skills
                    </small>

                </div>


                <div className="progress-stat-card">

                    <span>
                        Practice Hours
                    </span>

                    <strong>
                        12h
                    </strong>

                    <small>
                        Total practice time
                    </small>

                </div>

            </section>


            {/* Preparation Progress */}

            <section className="progress-section-card">

                <div className="progress-section-header">

                    <div>
                        <h2>
                            Preparation Progress
                        </h2>

                        <p>
                            Track progress across each preparation area.
                        </p>
                    </div>

                </div>


                <div className="preparation-progress-list">

                    <div className="preparation-progress-item">

                        <div className="preparation-progress-info">

                            <strong>
                                Resume Analysis
                            </strong>

                            <span>
                                90%
                            </span>

                        </div>

                        <div className="preparation-progress-bar">

                            <div
                                style={{ width: "90%" }}
                            ></div>

                        </div>

                    </div>


                    <div className="preparation-progress-item">

                        <div className="preparation-progress-info">

                            <strong>
                                Job Description
                            </strong>

                            <span>
                                80%
                            </span>

                        </div>

                        <div className="preparation-progress-bar">

                            <div
                                style={{ width: "80%" }}
                            ></div>

                        </div>

                    </div>


                    <div className="preparation-progress-item">

                        <div className="preparation-progress-info">

                            <strong>
                                Skill Gap Analysis
                            </strong>

                            <span>
                                72%
                            </span>

                        </div>

                        <div className="preparation-progress-bar">

                            <div
                                style={{ width: "72%" }}
                            ></div>

                        </div>

                    </div>


                    <div className="preparation-progress-item">

                        <div className="preparation-progress-info">

                            <strong>
                                Technical Questions
                            </strong>

                            <span>
                                76%
                            </span>

                        </div>

                        <div className="preparation-progress-bar">

                            <div
                                style={{ width: "76%" }}
                            ></div>

                        </div>

                    </div>


                    <div className="preparation-progress-item">

                        <div className="preparation-progress-info">

                            <strong>
                                Behavioral Questions
                            </strong>

                            <span>
                                81%
                            </span>

                        </div>

                        <div className="preparation-progress-bar">

                            <div
                                style={{ width: "81%" }}
                            ></div>

                        </div>

                    </div>


                    <div className="preparation-progress-item">

                        <div className="preparation-progress-info">

                            <strong>
                                Mock Interviews
                            </strong>

                            <span>
                                65%
                            </span>

                        </div>

                        <div className="preparation-progress-bar">

                            <div
                                style={{ width: "65%" }}
                            ></div>

                        </div>

                    </div>

                </div>

            </section>


            {/* Weekly Activity */}

            <section className="progress-section-card">

                <div className="progress-section-header">

                    <h2>
                        Weekly Activity
                    </h2>

                    <p>
                        Your interview preparation activity during the week.
                    </p>

                </div>


                <div className="weekly-activity">

                    <div className="activity-day">
                        <span>Mon</span>
                        <div style={{ height: "45%" }}></div>
                        <small>45m</small>
                    </div>

                    <div className="activity-day">
                        <span>Tue</span>
                        <div style={{ height: "70%" }}></div>
                        <small>1h</small>
                    </div>

                    <div className="activity-day">
                        <span>Wed</span>
                        <div style={{ height: "55%" }}></div>
                        <small>50m</small>
                    </div>

                    <div className="activity-day">
                        <span>Thu</span>
                        <div style={{ height: "85%" }}></div>
                        <small>1h 20m</small>
                    </div>

                    <div className="activity-day">
                        <span>Fri</span>
                        <div style={{ height: "60%" }}></div>
                        <small>55m</small>
                    </div>

                    <div className="activity-day">
                        <span>Sat</span>
                        <div style={{ height: "90%" }}></div>
                        <small>1h 30m</small>
                    </div>

                    <div className="activity-day">
                        <span>Sun</span>
                        <div style={{ height: "35%" }}></div>
                        <small>30m</small>
                    </div>

                </div>

            </section>


            {/* Recent Milestones */}

            <section className="progress-section-card">

                <div className="progress-section-header">

                    <h2>
                        Recent Milestones
                    </h2>

                    <p>
                        Important achievements in your preparation journey.
                    </p>

                </div>


                <div className="milestone-list">

                    <div className="milestone-item">

                        <div className="milestone-icon">
                            ✓
                        </div>

                        <div>
                            <strong>
                                Completed first mock interview
                            </strong>

                            <span>
                                You completed your first AI-powered interview.
                            </span>
                        </div>

                    </div>


                    <div className="milestone-item">

                        <div className="milestone-icon">
                            ✓
                        </div>

                        <div>
                            <strong>
                                Practiced 50 questions
                            </strong>

                            <span>
                                You have crossed 50 interview questions.
                            </span>
                        </div>

                    </div>


                    <div className="milestone-item">

                        <div className="milestone-icon">
                            ✓
                        </div>

                        <div>
                            <strong>
                                Reached 70% preparation
                            </strong>

                            <span>
                                Your overall preparation has reached 70%.
                            </span>
                        </div>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default ProgressTracking;