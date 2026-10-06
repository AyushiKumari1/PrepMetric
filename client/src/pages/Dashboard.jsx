import "../styles/dashboard.css";

function Dashboard() {
    return (
        <div className="dashboard-content">

            {/* Welcome Section */}

            <section className="welcome-section">

                <h1>Welcome to PrepMetric 👋</h1>

                <p>
                    Prepare smarter. Perform better. Get interview ready.
                </p>

            </section>


            {/* Statistics Cards */}

            <section className="stats-grid">

                <div className="stat-card">

                    <span className="stat-title">
                        Preparation Score
                    </span>

                    <strong className="stat-value">
                        72%
                    </strong>

                    <span className="stat-description">
                        Overall preparation
                    </span>

                </div>


                <div className="stat-card">

                    <span className="stat-title">
                        Interviews
                    </span>

                    <strong className="stat-value">
                        4
                    </strong>

                    <span className="stat-description">
                        Mock interviews completed
                    </span>

                </div>


                <div className="stat-card">

                    <span className="stat-title">
                        Skills Covered
                    </span>

                    <strong className="stat-value">
                        18/25
                    </strong>

                    <span className="stat-description">
                        Skills practiced
                    </span>

                </div>

            </section>


            {/* Main Dashboard Grid */}

            <section className="dashboard-grid">

                {/* Preparation Progress */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <h2>
                            Preparation Progress
                        </h2>

                        <span>
                            72%
                        </span>

                    </div>

                    <div className="progress-bar">

                        <div
                            className="progress-fill"
                            style={{ width: "72%" }}
                        ></div>

                    </div>

                    <p className="card-description">
                        Keep practicing to improve your interview readiness.
                    </p>

                </div>


                {/* Recent Activity */}

                <div className="dashboard-card">

                    <div className="card-header">

                        <h2>
                            Recent Activity
                        </h2>

                    </div>

                    <div className="activity-list">

                        <div className="activity-item">

                            <span>
                                Resume Analysis
                            </span>

                            <small>
                                Completed
                            </small>

                        </div>


                        <div className="activity-item">

                            <span>
                                Mock Interview
                            </span>

                            <small>
                                Completed
                            </small>

                        </div>


                        <div className="activity-item">

                            <span>
                                Skill Gap Analysis
                            </span>

                            <small>
                                Updated
                            </small>

                        </div>

                    </div>

                </div>

            </section>


            {/* Continue Preparation */}

            <section className="dashboard-card continue-section">

                <div className="card-header">

                    <h2>
                        Continue Preparation
                    </h2>

                </div>


                <div className="preparation-options">

                    <div className="preparation-option">

                        <h3>
                            Resume Analysis
                        </h3>

                        <p>
                            Analyze your resume and identify areas for improvement.
                        </p>

                        <button>
                            Continue
                        </button>

                    </div>


                    <div className="preparation-option">

                        <h3>
                            Skill Gap Analysis
                        </h3>

                        <p>
                            Discover the skills you need for your target role.
                        </p>

                        <button>
                            Continue
                        </button>

                    </div>


                    <div className="preparation-option">

                        <h3>
                            Mock Interview
                        </h3>

                        <p>
                            Practice realistic interview questions with AI.
                        </p>

                        <button>
                            Start Practice
                        </button>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default Dashboard;