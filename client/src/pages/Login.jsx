import { useState } from "react";
import api from "../services/api";

function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post(
                "/api/auth/login",
                 formData
            );

            const data = response.data;

            setMessage("Login successful!");

            localStorage.setItem("token", data.token);

            const token = localStorage.getItem("token");

            const profileResponse = await fetch(
                "/api/auth/profile",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            const profileData = profileResponse.data;

            console.log("Profile:", profileData);

            console.log("Login successful");

        } catch (error) {
            console.error(error);

            if (error.response) {
            setMessage("Something went wrong");
            } else {
                setMessage("Something went wrong");
            }
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
                        value={formData.email}
                        onChange={handleChange}
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />

                    <button type="submit">
                        Login
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