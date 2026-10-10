import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
    Activity,
    ArrowRight,
    BarChart3,
    Code2,
    Eye,
    EyeOff,
    FileText,
    LockKeyhole,
    Mail,
    MessageSquareText,
    Target
} from "lucide-react";
import api from "../services/api";
import "../styles/login.css";

const features = [
    { icon: FileText, title: "Resume Analysis", description: "Get useful feedback on your resume." },
    { icon: Target, title: "Skill Gap Analysis", description: "See what to build for your target role." },
    { icon: MessageSquareText, title: "Mock Interviews", description: "Practice with interview questions." },
    { icon: Activity, title: "Progress Tracking", description: "Keep track of your preparation." }
];

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [message, setMessage] = useState("");
    const [notice, setNotice] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    const handleChange = (event) => {
        setFormData((current) => ({ ...current, [event.target.name]: event.target.value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (loading) return;
        setLoading(true);
        setMessage("");
        setNotice("");

        try {
            const response = await api.post("/api/auth/login", formData);
            const data = response.data;
            localStorage.setItem("token", data.token);

            try {
                const profileResponse = await api.get("/api/auth/profile");
                const user = profileResponse.data?.user;
                if (user?.username) localStorage.setItem("username", user.username);
                if (user?.email) localStorage.setItem("email", user.email);
            } catch {
                // A valid token is enough to continue if profile lookup is temporarily unavailable.
                localStorage.setItem("email", formData.email);
            }

            const destination = location.state?.from?.pathname || "/dashboard";
            navigate(destination, { replace: true });
        } catch (error) {
            setMessage(error.response?.data?.message || "Unable to sign in. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className="login-page">
            <section className="login-intro" aria-label="About PrepMetric">
                <Link className="login-brand" to="/login" aria-label="PrepMetric home">
                    <span className="login-brand-mark" aria-hidden="true">
                        <BarChart3 size={22} strokeWidth={2.3} />
                    </span>
                    <span className="login-brand-name">Prep<span>Metric</span></span>
                </Link>

                <div className="login-intro-content">
                    <p className="login-eyebrow">Career Preparation Platform</p>
                    <h1>Prepare smarter for your next <span>interview.</span></h1>
                    <p className="login-lede">
                        Analyze your resume, find skill gaps, practice interviews, and track your progress — all in one place.
                    </p>

                    <div className="login-features" aria-label="PrepMetric features">
                        {features.map(({ icon: Icon, title, description }) => (
                            <article className="login-feature" key={title}>
                                <span className="login-feature-icon"><Icon size={17} strokeWidth={1.9} /></span>
                                <h2>{title}</h2>
                                <p>{description}</p>
                            </article>
                        ))}
                    </div>
                </div>

                <blockquote className="login-quote">
                    <p>“A well-prepared mind turns opportunities into achievements.”</p>
                    <cite>PrepMetric</cite>
                </blockquote>
            </section>

            <section className="login-form-side" aria-label="Sign in">
                <div className="login-card">
                    <div className="login-card-heading">
                        <p className="login-eyebrow">Welcome to PrepMetric</p>
                        <h2>Sign in to your workspace</h2>
                        <p>Continue your preparation journey.</p>
                    </div>

                    <form className="login-form" onSubmit={handleSubmit}>
                        <div className="login-field">
                            <label htmlFor="login-email">Email address</label>
                            <div className="login-input-wrap">
                                <Mail size={17} aria-hidden="true" />
                                <input
                                    id="login-email"
                                    type="email"
                                    name="email"
                                    placeholder="Enter your email address"
                                    autoComplete="email"
                                    required
                                    value={formData.email}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>

                        <div className="login-field">
                            <div className="login-label-row">
                                <label htmlFor="login-password">Password</label>
                                <button
                                    className="login-text-button"
                                    type="button"
                                    onClick={() => setNotice("Password reset is not configured yet. Please contact your project administrator.")}
                                >
                                    Forgot password?
                                </button>
                            </div>
                            <div className="login-input-wrap">
                                <LockKeyhole size={17} aria-hidden="true" />
                                <input
                                    id="login-password"
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    className="login-visibility-button"
                                    type="button"
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                    aria-pressed={showPassword}
                                    onClick={() => setShowPassword((visible) => !visible)}
                                >
                                    {showPassword ? <EyeOff size={17} /> : <Eye size={17} />}
                                </button>
                            </div>
                        </div>

                        <label className="login-remember">
                            <input type="checkbox" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />
                            <span>Remember me</span>
                        </label>

                        <button className="login-submit" type="submit" disabled={loading}>
                            <span>{loading ? "Signing in…" : "Sign In"}</span>
                            {!loading && <ArrowRight size={17} aria-hidden="true" />}
                        </button>
                        {message && <p className="login-feedback login-error" role="alert">{message}</p>}
                        {notice && <p className="login-feedback" role="status">{notice}</p>}
                    </form>

                    <div className="login-divider"><span>or continue with</span></div>
                    <div className="login-socials" aria-label="Other sign-in options">
                        <button type="button" onClick={() => setNotice("Google sign-in is not configured for this project yet.")}>
                            <span className="login-google-mark" aria-hidden="true">G</span><span>Google</span>
                        </button>
                        <button type="button" onClick={() => setNotice("GitHub sign-in is not configured for this project yet.")}>
                            <Code2 size={17} aria-hidden="true" /><span>GitHub</span>
                        </button>
                        <button type="button" onClick={() => setNotice("Microsoft sign-in is not configured for this project yet.")}>
                            <span className="login-ms-mark" aria-hidden="true"><i /><i /><i /><i /></span><span>Microsoft</span>
                        </button>
                    </div>

                    <p className="login-signup">Don’t have an account? <Link to="/register">Sign Up</Link></p>
                </div>
            </section>
        </main>
    );
}

export default Login;
