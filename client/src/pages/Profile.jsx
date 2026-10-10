import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { BarChart3, BriefcaseBusiness, Building2, Mail, Settings, UsersRound } from "lucide-react";
import api from "../services/api";
import "../styles/account.css";

function Profile() {
    const [profile, setProfile] = useState(() => {
        try {
            return { username: localStorage.getItem("username") || "", email: localStorage.getItem("email") || "" };
        } catch {
            return { username: "", email: "" };
        }
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        let active = true;
        api.get("/api/auth/profile").then(({ data }) => {
            if (!active || !data?.user) return;
            setProfile(data.user);
            try {
                if (data.user.username) localStorage.setItem("username", data.user.username);
                if (data.user.email) localStorage.setItem("email", data.user.email);
            } catch {
                // Profile details remain visible for this page even when local storage is unavailable.
            }
        }).catch(() => {
            if (active) setError("Could not load the latest profile details. Showing saved account information where available.");
        }).finally(() => {
            if (active) setLoading(false);
        });
        return () => { active = false; };
    }, []);

    return <main className="dashboard-content account-page team-profile-page">
        <header className="account-page-heading"><div><h1>Team Profile</h1><p>Manage the shared PrepMetric workspace identity.</p></div></header>
        <section className="account-card team-profile-card">
            <div className="team-profile-identity">
                <div className="team-workspace-mark" aria-hidden="true"><BarChart3 size={24}/></div>
                <div className="team-workspace-name"><h2>PREPMETRIC</h2><p>Team workspace</p></div>
                <span className="account-plan-label">Free Plan</span>
                <button className="account-secondary-button team-edit-button" type="button" disabled title="Workspace editing is not implemented">Edit Workspace</button>
            </div>
            <p className="team-edit-note">Workspace editing is not available in this version.</p>
            {error && <p className="account-inline-note" role="status">{error}</p>}
            <div className="team-profile-divider"/>
            <div className="team-profile-details">
                <article className="team-detail"><Building2 size={17}/><div><span>Workspace name</span><strong>PREPMETRIC</strong><p>This is a shared team workspace.</p></div></article>
                <article className="team-detail"><Mail size={17}/><div><span>Account email</span><strong>{profile.email || (loading ? "Loading email…" : "Email unavailable")}</strong><p>Used for login and account access.</p></div></article>
                <article className="team-detail"><BriefcaseBusiness size={17}/><div><span>Workspace type</span><strong>Student project</strong><p>Collaborative platform for interview preparation.</p></div></article>
                <article className="team-detail"><UsersRound size={17}/><div><span>Members</span><strong>Team workspace</strong><p>Member management is not available in this version.</p></div></article>
            </div>
            <div className="team-profile-notice"><span aria-hidden="true">i</span><p>This is a team project workspace. Personal account settings like password, notifications, and appearance can be managed in the <Link to="/settings">Settings</Link> section.</p></div>
            <div className="team-profile-actions"><Link className="account-primary-link" to="/settings"><Settings size={15}/>Go to Settings</Link></div>
        </section>
    </main>;
}

export default Profile;
