import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../services/api";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        setLoading(true);
        setMessage("");

        try {
            const response = await api.post(
                "/api/auth/login",
                 formData
            );

            const data = response.data;

            localStorage.setItem("token", data.token);
            try {
                const profileResponse = await api.get("/api/auth/profile");
                const user = profileResponse.data?.user;
                if (user?.username) localStorage.setItem("username", user.username);
                if (user?.email) localStorage.setItem("email", user.email);
            } catch {
                // A valid login token still allows the user to continue if profile lookup is temporarily unavailable.
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
        <div className="register-container">
            <div className="register-box">

                <h1>Login</h1>

                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        aria-label="Email"
                        autoComplete="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        aria-label="Password"
                        autoComplete="current-password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit" disabled={loading}>
                        {loading ? "Signing in…" : "Login"}
                    </button>

                </form>

                {message && (
                    <p className="message">{message}</p>
                )}

            </div>
        </div>
    );
}

export default Login;
