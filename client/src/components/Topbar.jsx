import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Activity, Bell, Check, ChevronDown, LogOut, Moon, Settings as SettingsIcon, Sun, UserRound, X } from "lucide-react";
import { useTheme } from "../context/useTheme";
import "../styles/topbar.css";

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
    "/preparation-plan": "Preparation Plan",
    "/settings": "Settings",
    "/profile": "Profile",
};

function safeStorageValue(key, fallback) {
    try {
        return localStorage.getItem(key) || fallback;
    } catch {
        return fallback;
    }
}

function Topbar({ onRequestLogout, logoutDialogOpen }) {
    const location = useLocation();
    const { theme, setTheme } = useTheme();
    const [openPanel, setOpenPanel] = useState(null);
    const [planOpen, setPlanOpen] = useState(false);
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const topbarRef = useRef(null);
    const planDialogRef = useRef(null);
    const planCloseRef = useRef(null);
    const notificationPanelRef = useRef(null);
    const userMenuRef = useRef(null);
    const lastTriggerRef = useRef(null);
    const userName = safeStorageValue("username", "Signed-in account");
    const email = safeStorageValue("email", "Email unavailable");
    const pageTitle = pageTitles[location.pathname] || "Dashboard";

    useEffect(() => {
        if (!openPanel && !planOpen && !userMenuOpen) return undefined;
        const handlePointerDown = (event) => {
            if (!logoutDialogOpen && topbarRef.current && !topbarRef.current.contains(event.target)) {
                setOpenPanel(null);
                setUserMenuOpen(false);
            }
        };
        const handleKeyDown = (event) => {
            if (event.key === "Escape") {
                if (logoutDialogOpen) return;
                setOpenPanel(null);
                setUserMenuOpen(false);
                setPlanOpen(false);
                lastTriggerRef.current?.focus();
            }
        };
        document.addEventListener("pointerdown", handlePointerDown);
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown);
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [openPanel, planOpen, userMenuOpen, logoutDialogOpen]);

    useEffect(() => {
        if (planOpen) planCloseRef.current?.focus();
    }, [planOpen]);

    useEffect(() => {
        if (openPanel === "notifications") notificationPanelRef.current?.focus();
    }, [openPanel]);

    useEffect(() => {
        if (userMenuOpen) userMenuRef.current?.querySelector("a")?.focus();
    }, [userMenuOpen]);

    const handlePlanDialogKeyDown = (event) => {
        if (event.key !== "Tab") return;
        const focusable = planDialogRef.current?.querySelectorAll("button:not(:disabled)");
        if (!focusable?.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first.focus();
        }
    };

    const openPlanDetails = (event) => {
        lastTriggerRef.current = event.currentTarget;
        setOpenPanel(null);
        setUserMenuOpen(false);
        setPlanOpen(true);
    };
    const toggleNotifications = (event) => {
        lastTriggerRef.current = event.currentTarget;
        setPlanOpen(false);
        setUserMenuOpen(false);
        setOpenPanel((current) => current === "notifications" ? null : "notifications");
    };
    const toggleUserMenu = (event) => {
        lastTriggerRef.current = event.currentTarget;
        setPlanOpen(false);
        setOpenPanel(null);
        setUserMenuOpen((current) => !current);
    };
    return <>
        <header className="topbar resume-topbar">
            <div className="topbar-left"><h2>{pageTitle}</h2></div>
            <div className="topbar-right" ref={topbarRef}>
                <div className="header-theme-switch" role="group" aria-label="Color theme">
                    <button type="button" className={theme === "light" ? "selected" : ""} aria-pressed={theme === "light"} aria-label="Use light theme" onClick={() => setTheme("light")}><Sun size={14}/><span>Light</span></button>
                    <button type="button" className={theme === "dark" ? "selected" : ""} aria-pressed={theme === "dark"} aria-label="Use dark theme" onClick={() => setTheme("dark")}><Moon size={14}/><span>Dark</span></button>
                </div>
                <button className="plan-button" type="button" aria-haspopup="dialog" aria-expanded={planOpen} aria-controls="plan-details-dialog" onClick={openPlanDetails}>Free Plan</button>
                <div className="header-popover-wrap">
                    <button className="notification-button" type="button" aria-label="Notifications" aria-haspopup="dialog" aria-expanded={openPanel === "notifications"} aria-controls="notification-panel" onClick={toggleNotifications}><Bell size={17}/></button>
                    {openPanel === "notifications" && <section className="header-popover notification-panel" id="notification-panel" role="dialog" aria-label="Notifications" tabIndex="-1" ref={notificationPanelRef}>
                        <div className="header-popover-heading"><div><strong>Notifications</strong><span>Updates for your account</span></div><button type="button" className="popover-close" aria-label="Close notifications" onClick={() => { setOpenPanel(null); lastTriggerRef.current?.focus(); }}><X size={16}/></button></div>
                        <div className="notification-empty"><span className="notification-empty-icon"><Check size={18}/></span><strong>You're all caught up</strong><p>New notifications will appear here.</p></div>
                    </section>}
                </div>
                <div className="user-menu-wrap">
                    <button className="user-profile" type="button" onClick={toggleUserMenu} aria-expanded={userMenuOpen} aria-haspopup="dialog" aria-controls="account-dropdown" aria-label={`Open account menu for ${userName}`}>
                        <div className="user-avatar"><Activity size={16}/></div>
                        <div className="user-info"><span className="user-name">PREPMETRIC</span><span className="user-email">Team workspace</span></div>
                        <ChevronDown className="user-chevron" size={15}/>
                    </button>
                    {userMenuOpen && <section className="user-profile-menu" id="account-dropdown" role="dialog" aria-label="Workspace and account menu" ref={userMenuRef}>
                        <div className="account-dropdown-workspace"><span className="account-dropdown-avatar"><Activity size={15}/></span><div><strong>PREPMETRIC</strong><span>Team workspace</span></div></div>
                        <div className="account-dropdown-user"><strong>{userName}</strong><span>{email}</span></div>
                        <nav className="account-dropdown-actions" aria-label="Account actions">
                            <Link to="/profile" onClick={() => setUserMenuOpen(false)}><UserRound size={15}/><span>Profile</span></Link>
                            <Link to="/settings" onClick={() => setUserMenuOpen(false)}><SettingsIcon size={15}/><span>Settings</span></Link>
                            <button type="button" className="account-dropdown-logout" onClick={onRequestLogout}><LogOut size={15}/><span>Log out</span></button>
                        </nav>
                    </section>}
                </div>
            </div>
        </header>
        {planOpen && <div className="plan-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) { setPlanOpen(false); lastTriggerRef.current?.focus(); } }}>
            <section className="plan-details-dialog" id="plan-details-dialog" role="dialog" aria-modal="true" aria-labelledby="plan-dialog-title" tabIndex="-1" ref={planDialogRef} onKeyDown={handlePlanDialogKeyDown}>
                <button type="button" className="plan-dialog-close" ref={planCloseRef} aria-label="Close plan details" onClick={() => { setPlanOpen(false); lastTriggerRef.current?.focus(); }}><X size={17}/></button>
                <span className="plan-dialog-eyebrow">ACCOUNT PLAN</span>
                <h2 id="plan-dialog-title">Free Plan</h2>
                <p className="plan-dialog-current">This is the plan label currently shown in PrepMetric.</p>
                <div className="plan-dialog-note"><strong>Plan details are not configured</strong><p>Feature limits, Pro benefits, pricing, and subscription activation are not connected in this version.</p></div>
                <div className="plan-dialog-actions"><button type="button" className="plan-dialog-upgrade" disabled title="Subscription activation is not available">Upgrade unavailable</button><button type="button" className="plan-dialog-dismiss" onClick={() => { setPlanOpen(false); lastTriggerRef.current?.focus(); }}>Close</button></div>
            </section>
        </div>}
    </>;
}

export default Topbar;
