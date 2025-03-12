import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";  
 
const Auth = ({ setUser }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [user, setUserState] = useState({ name: "", email: "", password: "" });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (!user.email || !user.password || (!isLogin && !user.name)) {
            setError("Please fill in all fields.");
            setLoading(false);
            return;
        }

        const url = isLogin ? "http://localhost/cake_shop/login.php" : "http://localhost/cake_shop/register.php";

        try {
            const response = await axios.post(url, user);
            alert(response.data.message);
            if (isLogin && response.data.user) {
                setUser(response.data.user);
                localStorage.setItem("user", JSON.stringify(response.data.user));
                navigate("/home");
            } else if (!isLogin) {
                setIsLogin(true);
                setError("Registration successful. Please log in.");
            }
        } catch (error) {
            setError(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

   

    return (
        <div id="mainda">
            <div className="wrapper">
                <form className="auth-form" onSubmit={handleSubmit}>
                    <h2>{isLogin ? "Login" : "Register"}</h2>
                    {error && <p className="error-message">{error}</p>}
                    {!isLogin && (
                        <div className="input-field">
                            <input
                                type="text"
                                id="name"
                                required
                                onChange={(e) => setUserState({ ...user, name: e.target.value })}
                            />
                            <label>Enter your Name</label>
                        </div>
                    )}
                    <div className="input-field">
                        <input
                            type="email"
                            id="email"
                            required
                            onChange={(e) => setUserState({ ...user, email: e.target.value })}
                        />
                        <label>Enter your email</label>
                    </div>
                    <div className="input-field">
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            required
                            onChange={(e) => setUserState({ ...user, password: e.target.value })}
                        />
                        <label>Enter your Password</label>
                        <button
                            type="button"
                            className="password-toggle"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? "🙈" : "👁️"}
                        </button>
                    </div>
                    <button type="submit" className="auth-button" disabled={loading}>
                        {loading ? "Processing..." : isLogin ? "Login" : "Register"}
                    </button>
                </form>
                <p className="auth-toggle">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <button style={{
    background: "transparent",
    border: "2px solid black",
    color: "black",
    padding: "5px 5px",
    borderRadius: "5px",
    cursor: "pointer",
    marginTop:"10px",
    transition: "0.3s",
  }} onClick={() => setIsLogin(!isLogin)}>
                        {isLogin ? "Register" : "Login"}
                    </button>
                </p>
             
            </div>
        </div>
    );
};

export default Auth;