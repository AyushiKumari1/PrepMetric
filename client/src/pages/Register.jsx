import { useState } from "react";
import api from "../services/api";

function Register() {
    const [formData, setFormData] = useState({
        username: "",
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
                "/api/auth/register",
                formData
            );

            const data = response.data;

            setMessage("Registration successful!");
            console.log(data);

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

            <h1>Create Account</h1>

            <form onSubmit={handleSubmit}>

                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                />

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
                    Register
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