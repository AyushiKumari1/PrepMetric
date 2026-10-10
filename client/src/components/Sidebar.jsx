import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import { Activity, BarChart3, BookOpen, BriefcaseBusiness, FileText, Gauge, LayoutDashboard, ListChecks, LogOut, MessageSquare, Settings, Target, UserRound } from "lucide-react";

const sections = [
    { title: "OVERVIEW", links: [["Dashboard", "/dashboard", LayoutDashboard]] },
    { title: "PREPARATION", links: [["Resume Analysis", "/resume-analysis", FileText], ["Job Description", "/job-description", BriefcaseBusiness], ["Skill Gap Analysis", "/skill-gap-analysis", Target], ["Mock Interviews", "/mock-interviews", MessageSquare], ["Technical Question", "/technical-question", BookOpen], ["Behavioral Question", "/behavioral-question", Activity], ["Progress Tracking", "/progress-tracking", BarChart3], ["Performance", "/performance", Gauge], ["Readiness Report", "/readiness-report", ListChecks]] },
    { title: "PREPARATION PLAN", links: [["Preparation Plan", "/preparation-plan", ListChecks]] },
];

function Sidebar() {
    const location = useLocation();
    const redesignedPage = ["/resume-analysis", "/dashboard", "/job-description", "/skill-gap-analysis", "/mock-interviews", "/technical-question", "/behavioral-question", "/progress-tracking", "/performance", "/readiness-report", "/preparation-plan"].includes(location.pathname);
    const [mobileOpen, setMobileOpen] = useState(false);
    const handleLogout = () => {
        try {
            localStorage.removeItem("token");
            localStorage.removeItem("username");
            localStorage.removeItem("email");
        } catch {
            // Navigation still returns to login if storage is unavailable.
        }
        setMobileOpen(false);
    };
    return <>
        {redesignedPage && <button type="button" className={`resume-nav-backdrop ${mobileOpen ? "open" : ""}`} aria-label="Close navigation" onClick={() => setMobileOpen(false)}/>}
        {redesignedPage && <button type="button" className="resume-mobile-menu" aria-label="Open navigation" onClick={() => setMobileOpen(true)}><span/><span/><span/></button>}
        <aside className={`sidebar ${redesignedPage ? "resume-sidebar" : ""} ${mobileOpen ? "mobile-open" : ""}`}>
        <div className="sidebar-logo"><span className="sidebar-brand-mark"><Activity size={17}/></span><span>Prep<span>Metric</span></span></div>
        <nav className="sidebar-navigation" aria-label="Main navigation">
            {sections.map((section) => <div className="sidebar-section" key={section.title}>
                <p className="sidebar-title">{section.title}</p>
                {section.links.map(([label, to, Icon]) => <NavLink key={to} to={to} onClick={() => setMobileOpen(false)} className={({ isActive }) => `sidebar-item ${isActive ? "active" : ""}`}><Icon size={16}/><span>{label}</span></NavLink>)}
            </div>)}
            <div className="sidebar-section">
                <p className="sidebar-title">ACCOUNT</p>
                <div className="sidebar-item" aria-disabled="true"><UserRound size={16}/><span>Profile</span></div>
                <div className="sidebar-item" aria-disabled="true"><Settings size={16}/><span>Settings</span></div>
                <NavLink to="/login" onClick={handleLogout} className="sidebar-item"><LogOut size={16}/><span>Logout</span></NavLink>
            </div>
        </nav>
        </aside>
    </>;
}

export default Sidebar;
