import { Link } from "react-router-dom";

function Sidebar() {
    return (
        <aside className="sidebar">

            <div className="sidebar-logo">
                PrepMetric
            </div>


            {/* OVERVIEW */}
            <div className="sidebar-section">

                <p className="sidebar-title">
                    OVERVIEW
                </p>

                <Link
                    to="/dashboard"
                    className="sidebar-item"
                >
                    Dashboard
                </Link>

            </div>


            {/* PREPARATION */}
            <div className="sidebar-section">

                <p className="sidebar-title">
                    PREPARATION
                </p>

                <Link
                    to="/resume-analysis"
                    className="sidebar-item"
                >
                    Resume Analysis
                </Link>

                <Link
                    to="/job-description"
                    className="sidebar-item"
                >
                    Job Description
                </Link>

                <Link
                    to="/skill-gap-analysis"
                    className="sidebar-item"
                >
                    Skill Gap Analysis
                </Link>

                <Link
                    to="/mock-interviews"
                    className="sidebar-item"
                >
                    Mock Interviews
                </Link>

                <Link
                    to="/technical-question"
                    className="sidebar-item"
                >
                    Technical Question
                </Link>

                <Link
                    to="/behavioral-question"
                    className="sidebar-item"
                >
                    Behavioral Question
                </Link>

                <Link
                    to="/progress-tracking"
                    className="sidebar-item"
                >
                    Progress Tracking
                </Link>

                <Link
                    to="/performance"
                    className="sidebar-item"
                >
                    Performance
                </Link>

                <Link
                    to="/readiness-report"
                    className="sidebar-item"
                >
                    Readiness Report
                </Link>

            </div>


            {/* PREPARATION PLAN */}
            <div className="sidebar-section">

                <p className="sidebar-title">
                    PREPARATION PLAN
                </p>

                <Link
                    to="/preparation-plan"
                    className="sidebar-item"
                >
                    Preparation Plan
                </Link>

            </div>


            {/* ACCOUNT */}
            <div className="sidebar-section">

                <p className="sidebar-title">
                    ACCOUNT
                </p>

                <div className="sidebar-item">
                    Settings
                </div>

                <div className="sidebar-item">
                    Help & Support
                </div>

                <div className="sidebar-item">
                    Logout
                </div>

            </div>

        </aside>
    );
}

export default Sidebar;