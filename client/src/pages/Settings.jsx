import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, BellRing, Check, LockKeyhole, Monitor, Moon, Sun, UserRound } from "lucide-react";
import api from "../services/api";
import { useTheme } from "../context/useTheme";
import "../styles/account.css";

const defaults = { interviewReminders: false, preparationUpdates: false, difficulty: "Medium" };

function readPreferences() {
    try {
        const parsed = JSON.parse(localStorage.getItem("prepmetric-notification-preferences") || "{}");
        const difficulty = localStorage.getItem("prepmetric-default-difficulty");
        return {
            interviewReminders: typeof parsed.interviewReminders === "boolean" ? parsed.interviewReminders : defaults.interviewReminders,
            preparationUpdates: typeof parsed.preparationUpdates === "boolean" ? parsed.preparationUpdates : defaults.preparationUpdates,
            difficulty: ["Easy", "Medium", "Hard"].includes(difficulty) ? difficulty : defaults.difficulty,
        };
    } catch {
        return defaults;
    }
}

function persistNotificationPreferences(preferences) {
    try {
        localStorage.setItem("prepmetric-notification-preferences", JSON.stringify({
            interviewReminders: preferences.interviewReminders,
            preparationUpdates: preferences.preparationUpdates,
        }));
        return true;
    } catch {
        return false;
    }
}

function readCachedUser() {
    try {
        return { username: localStorage.getItem("username") || "", email: localStorage.getItem("email") || "" };
    } catch {
        return { username: "", email: "" };
    }
}

function Settings() {
    const { theme, setTheme } = useTheme();
    const [user, setUser] = useState(readCachedUser);
    const [preferences, setPreferences] = useState(readPreferences);
    const [savedDifficulty, setSavedDifficulty] = useState(() => readPreferences().difficulty);
    const [feedback, setFeedback] = useState("");
    const [profileMessage, setProfileMessage] = useState("");

    useEffect(() => {
        let active = true;
        api.get("/api/auth/profile").then(({ data }) => {
            if (!active || !data?.user) return;
            setUser(data.user);
            if (data.user.username) localStorage.setItem("username", data.user.username);
            if (data.user.email) localStorage.setItem("email", data.user.email);
        }).catch(() => {
            if (active) setProfileMessage("Profile details could not be refreshed. Showing the account information saved on this device.");
        });
        return () => { active = false; };
    }, []);

    const updatePreference = (name, value) => {
        const next = { ...preferences, [name]: value };
        setPreferences(next);
        if (persistNotificationPreferences(next)) setFeedback("Notification preferences saved on this device.");
        else setFeedback("Could not save preferences in this browser.");
    };

    const saveDifficulty = (event) => {
        event.preventDefault();
        try {
            localStorage.setItem("prepmetric-default-difficulty", preferences.difficulty);
        } catch {
            setFeedback("Could not save preferences in this browser.");
            return;
        }
        setSavedDifficulty(preferences.difficulty);
        setFeedback("Default interview difficulty saved on this device.");
    };

    const cancelDifficulty = () => {
        setPreferences((current) => ({ ...current, difficulty: savedDifficulty }));
        setFeedback("");
    };

    return <main className="dashboard-content account-page">
        <header className="account-page-heading">
            <div><h1>Settings</h1><p>Manage workspace preferences and account controls.</p></div>
        </header>

        <section className="account-summary">
            <div className="team-workspace-mark settings-workspace-mark" aria-hidden="true"><BarChart3 size={21}/></div>
            <div className="account-summary-copy"><span className="settings-workspace-eyebrow">TEAM WORKSPACE</span><h2>PREPMETRIC</h2><p>This workspace is used for interview preparation, learning and collaboration.</p></div>
            <span className="account-plan-label">Free Plan</span>
            <Link className="account-secondary-button" to="/profile">View Profile</Link>
        </section>
        {profileMessage && <p className="account-inline-note" role="status">{profileMessage}</p>}

        <div className="account-grid account-settings-grid">
            <section className="account-card account-appearance">
                <div className="account-card-heading"><span className="account-icon"><Monitor size={17}/></span><div><h2>Appearance</h2><p>Choose how PrepMetric looks on your device.</p></div></div>
                <div className="account-theme-switch" role="group" aria-label="Appearance theme">
                    <button type="button" aria-pressed={theme === "light"} className={theme === "light" ? "selected" : ""} onClick={() => setTheme("light")}><Sun size={15}/>Light</button>
                    <button type="button" aria-pressed={theme === "dark"} className={theme === "dark" ? "selected" : ""} onClick={() => setTheme("dark")}><Moon size={15}/>Dark</button>
                </div>
            </section>

            <section className="account-card account-notifications">
                <div className="account-card-heading"><span className="account-icon"><BellRing size={17}/></span><div><h2>Notifications</h2><p>Manage what updates you receive.</p></div></div>
                <div className="account-setting-row"><div><strong>Interview reminders</strong><p>Get notified about your scheduled mock interviews.</p></div><label className="account-toggle"><input type="checkbox" aria-label="Interview reminders" checked={preferences.interviewReminders} onChange={(event) => updatePreference("interviewReminders", event.target.checked)}/><span aria-hidden="true"/></label></div>
                <div className="account-setting-row"><div><strong>Preparation updates</strong><p>Receive tips, new features and progress insights.</p></div><label className="account-toggle"><input type="checkbox" aria-label="Preparation updates" checked={preferences.preparationUpdates} onChange={(event) => updatePreference("preparationUpdates", event.target.checked)}/><span aria-hidden="true"/></label></div>
                <p className="account-footnote">These choices are saved in this browser. Account-wide notification delivery is not connected.</p>
            </section>

            <section className="account-card account-access">
                <div className="account-card-heading"><span className="account-icon"><LockKeyhole size={17}/></span><div><h2>Account access</h2><p>Manage your account security settings.</p></div></div>
                <label className="account-field-label" htmlFor="account-security-email">Email address</label>
                <input className="account-input" id="account-security-email" type="email" value={user.email || ""} placeholder="Email unavailable" readOnly/>
                <div className="account-access-actions"><button className="account-secondary-button account-security-button" type="button" onClick={() => setFeedback("Password changes are not connected yet; no password-change endpoint is available.")}><LockKeyhole size={14}/>Change Password</button><p>Password changes are not available in this version.</p></div>
            </section>

            <section className="account-card account-preferences">
                <div className="account-card-heading"><span className="account-icon"><UserRound size={17}/></span><div><h2>Interview preferences</h2><p>Customize your interview experience.</p></div></div>
                <label className="account-field-label" htmlFor="default-difficulty">Default interview difficulty</label>
                <select className="account-input" id="default-difficulty" value={preferences.difficulty} onChange={(event) => setPreferences((current) => ({ ...current, difficulty: event.target.value }))}>
                    <option>Easy</option><option>Medium</option><option>Hard</option>
                </select>
                <p className="account-footnote">This will be used as the default difficulty for new mock interviews. The preference is stored on this device.</p>
                <div className="account-actions"><button type="button" className="account-secondary-button" onClick={cancelDifficulty}>Cancel</button><button type="button" className="account-primary-button" onClick={saveDifficulty}><Check size={15}/>Save changes</button></div>
            </section>
        </div>
        <section className="account-card workspace-preferences-panel">
            <div><h2>Workspace preferences</h2><p>Workspace identity is shared across PrepMetric. Personal account settings apply to your sign-in.</p><small>Workspace settings are not configurable in this version. Use the controls above for this device’s personal preferences.</small></div>
            <div className="account-actions workspace-preference-actions"><button type="button" className="account-secondary-button" disabled title="There are no unsaved workspace settings">Cancel</button><button type="button" className="account-primary-button" disabled title="Workspace settings are not supported by the backend">Save changes</button></div>
        </section>
        {feedback && <p className="account-feedback" role="status">{feedback}</p>}
    </main>;
}

export default Settings;
