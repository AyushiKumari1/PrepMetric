import { useLocation } from "react-router-dom";
import "../styles/topbar.css";

function Topbar() {

    const location = useLocation();

    const pageTitles = {
        "/dashboard": "Dashboard",
        "/resume-analysis": "Resume Analysis",
        "/job-description": "Job Description",
        "/skill-gap-analysis": "Skill Gap Analysis",
        "/mock-interviews": "Mock Interviews",
        "/technical-question": "Technical Question",
        "/behavioral-question": "Behavioral Question",
        "/progress-tracking": "Progress Tracking",
        "/performance": "Performance",
        "/readiness-report": "Readiness Report",
        "/preparation-plan": "Preparation Plan"
    };

    const pageTitle =
        pageTitles[location.pathname] || "Dashboard";

    return (
        <header className="topbar">

            <div className="topbar-left">
                <h2>{pageTitle}</h2>
            </div>


            <div className="topbar-right">

                <button className="plan-button">
                    Free Plan
                </button>


                <button
                    className="notification-button"
                    aria-label="Notifications"
                >
                    🔔
                </button>


                <div className="user-profile">

                    <div className="user-avatar">
                        U
                    </div>

                    <div className="user-info">

                        <span className="user-name">
                            User
                        </span>

                        <span className="user-email">
                            user@example.com
                        </span>

                    </div>

                </div>

            </div>

        </header>
    );
}

export default Topbar;