import { useState } from "react";
import api from "../services/api";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
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
            await api.post(
                "/api/auth/register",
                formData
            );

            setMessage("Registration successful!");

        } catch (error) {
            setMessage(error.response?.data?.message || "Unable to create your account. Check your connection and try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
    <div className="register-container">
        <div className="register-box">

            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    aria-label="Username"
                    autoComplete="username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                />

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
                    autoComplete="new-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                />

                <button type="submit" disabled={loading}>
                    {loading ? "Creating account…" : "Register"}
                </button>

            </form>

            {message && (
                <p className="message">{message}</p>
            )}

        </div>
    </div>
);
}

export default Register;
