import "../styles/preparationPlan.css";

function PreparationPlan() {
    return (
        <div className="page-container">

            {/* Page Header */}

            <div className="page-header">
                <h1>Preparation Plan</h1>

                <p>
                    Follow your personalized preparation roadmap and
                    stay on track for your target interview.
                </p>
            </div>


            {/* Plan Overview */}

            <section className="plan-overview-card">

                <div className="plan-overview-content">

                    <div>
                        <span className="plan-label">
                            Your Preparation Plan
                        </span>

                        <h2>
                            Full Stack Developer
                        </h2>

                        <p>
                            Personalized preparation plan based on your
                            target role and current readiness.
                        </p>
                    </div>


                    <div className="plan-progress-summary">

                        <strong>
                            72%
                        </strong>

                        <span>
                            Plan Completed
                        </span>

                    </div>

                </div>


                <div className="plan-progress-bar">

                    <div
                        className="plan-progress-fill"
                        style={{ width: "72%" }}
                    ></div>

                </div>

            </section>


            {/* Plan Statistics */}

            <section className="plan-stats-grid">

                <div className="plan-stat-card">

                    <span>
                        Tasks Completed
                    </span>

                    <strong>
                        18
                    </strong>

                    <small>
                        Out of 25 tasks
                    </small>

                </div>


                <div className="plan-stat-card">

                    <span>
                        Tasks Remaining
                    </span>

                    <strong>
                        7
                    </strong>

                    <small>
                        Tasks in your plan
                    </small>

                </div>


                <div className="plan-stat-card">

                    <span>
                        Practice Hours
                    </span>

                    <strong>
                        12h
                    </strong>

                    <small>
                        Completed this plan
                    </small>

                </div>


                <div className="plan-stat-card">

                    <span>
                        Current Streak
                    </span>

                    <strong>
                        5 Days
                    </strong>

                    <small>
                        Keep practicing consistently
                    </small>

                </div>

            </section>


            {/* Today's Preparation */}

            <section className="plan-section-card">

                <div className="plan-section-header">

                    <div>
                        <h2>
                            Today's Preparation
                        </h2>

                        <p>
                            Complete these tasks to stay on track.
                        </p>
                    </div>

                    <span className="today-badge">
                        Today
                    </span>

                </div>


                <div className="today-task-list">

                    <div className="today-task">

                        <div className="task-check">
                            ✓
                        </div>

                        <div className="task-content">

                            <strong>
                                Review Resume Recommendations
                            </strong>

                            <span>
                                Improve your professional summary and achievements.
                            </span>

                        </div>

                        <small>
                            20 min
                        </small>

                    </div>


                    <div className="today-task">

                        <div className="task-check">
                            ✓
                        </div>

                        <div className="task-content">

                            <strong>
                                Practice Technical Questions
                            </strong>

                            <span>
                                Complete 10 JavaScript and React questions.
                            </span>

                        </div>

                        <small>
                            30 min
                        </small>

                    </div>


                    <div className="today-task">

                        <div className="task-check">
                            ○
                        </div>

                        <div className="task-content">

                            <strong>
                                Practice Behavioral Questions
                            </strong>

                            <span>
                                Practice teamwork and conflict-management questions.
                            </span>

                        </div>

                        <small>
                            20 min
                        </small>

                    </div>


                    <div className="today-task">

                        <div className="task-check">
                            ○
                        </div>

                        <div className="task-content">

                            <strong>
                                Complete a Mock Interview
                            </strong>

                            <span>
                                Complete one mixed AI-powered mock interview.
                            </span>

                        </div>

                        <small>
                            30 min
                        </small>

                    </div>

                </div>

            </section>


            {/* Preparation Roadmap */}

            <section className="plan-section-card">

                <div className="plan-section-header">

                    <h2>
                        Preparation Roadmap
                    </h2>

                    <p>
                        Follow these stages to complete your preparation.
                    </p>

                </div>


                <div className="roadmap-list">

                    <div className="roadmap-item completed">

                        <div className="roadmap-number">
                            ✓
                        </div>

                        <div className="roadmap-content">

                            <strong>
                                Resume Preparation
                            </strong>

                            <span>
                                Analyze and improve your resume.
                            </span>

                        </div>

                        <small>
                            Completed
                        </small>

                    </div>


                    <div className="roadmap-item completed">

                        <div className="roadmap-number">
                            ✓
                        </div>

                        <div className="roadmap-content">

                            <strong>
                                Job & Skill Analysis
                            </strong>

                            <span>
                                Understand job requirements and identify skill gaps.
                            </span>

                        </div>

                        <small>
                            Completed
                        </small>

                    </div>


                    <div className="roadmap-item active">

                        <div className="roadmap-number">
                            3
                        </div>

                        <div className="roadmap-content">

                            <strong>
                                Technical Preparation
                            </strong>

                            <span>
                                Practice technical concepts and interview questions.
                            </span>

                        </div>

                        <small>
                            In Progress
                        </small>

                    </div>


                    <div className="roadmap-item">

                        <div className="roadmap-number">
                            4
                        </div>

                        <div className="roadmap-content">

                            <strong>
                                Behavioral Preparation
                            </strong>

                            <span>
                                Practice behavioral questions and STAR responses.
                            </span>

                        </div>

                        <small>
                            Upcoming
                        </small>

                    </div>


                    <div className="roadmap-item">

                        <div className="roadmap-number">
                            5
                        </div>

                        <div className="roadmap-content">

                            <strong>
                                Mock Interviews
                            </strong>

                            <span>
                                Complete realistic interview simulations.
                            </span>

                        </div>

                        <small>
                            Upcoming
                        </small>

                    </div>

                </div>

            </section>


            {/* Weekly Goals */}

            <section className="plan-section-card">

                <div className="plan-section-header">

                    <h2>
                        Weekly Goals
                    </h2>

                    <p>
                        Your preparation targets for this week.
                    </p>

                </div>


                <div className="weekly-goals-grid">

                    <div className="weekly-goal">

                        <span>
                            Technical Questions
                        </span>

                        <strong>
                            18 / 25
                        </strong>

                        <div className="goal-progress">

                            <div style={{ width: "72%" }}></div>

                        </div>

                    </div>


                    <div className="weekly-goal">

                        <span>
                            Behavioral Questions
                        </span>

                        <strong>
                            12 / 15
                        </strong>

                        <div className="goal-progress">

                            <div style={{ width: "80%" }}></div>

                        </div>

                    </div>


                    <div className="weekly-goal">

                        <span>
                            Practice Hours
                        </span>

                        <strong>
                            4 / 5 hrs
                        </strong>

                        <div className="goal-progress">

                            <div style={{ width: "80%" }}></div>

                        </div>

                    </div>

                </div>

            </section>


            {/* AI Recommendations */}

            <section className="plan-section-card">

                <div className="plan-section-header">

                    <h2>
                        AI Recommendations
                    </h2>

                    <p>
                        Suggestions based on your current preparation progress.
                    </p>

                </div>


                <div className="plan-recommendation-grid">

                    <div className="plan-recommendation">

                        <h3>
                            Focus on System Design
                        </h3>

                        <p>
                            Your skill-gap analysis shows that system design
                            needs additional practice.
                        </p>

                    </div>


                    <div className="plan-recommendation">

                        <h3>
                            Complete More Mock Interviews
                        </h3>

                        <p>
                            Additional interview simulations can help improve
                            confidence and answer quality.
                        </p>

                    </div>


                    <div className="plan-recommendation">

                        <h3>
                            Maintain Your Practice Streak
                        </h3>

                        <p>
                            Consistent daily practice will help you complete
                            your preparation plan faster.
                        </p>

                    </div>

                </div>

            </section>

        </div>
    );
}

export default PreparationPlan;