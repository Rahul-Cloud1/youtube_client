import { useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { useAuth } from "../context/AuthContext";
import { FaTimes } from "react-icons/fa";

const SignInModal = ({ isOpen, onClose }) => {
  const [isLogin, setIsLogin] = useState(true);
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setError("");
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setError("");
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await loginUser(loginForm);
      login(res.data);
      onClose();
      setLoginForm({ email: "", password: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (registerForm.password !== registerForm.confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      await registerUser({
        name: registerForm.name,
        username: registerForm.username,
        email: registerForm.email,
        password: registerForm.password,
      });
      setError("");
      alert("Registration successful! Please login.");
      setIsLogin(true);
      setRegisterForm({ name: "", username: "", email: "", password: "", confirmPassword: "" });
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="signInModalOverlay" onClick={onClose}>
      <div className="signInModal" onClick={(e) => e.stopPropagation()}>
        <button className="closeBtn" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="modalTabs">
          <button
            className={`tab ${isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(true);
              setError("");
            }}
          >
            Login
          </button>
          <button
            className={`tab ${!isLogin ? "active" : ""}`}
            onClick={() => {
              setIsLogin(false);
              setError("");
            }}
          >
            Register
          </button>
        </div>

        {error && <div className="errorMessage">{error}</div>}

        {isLogin ? (
          <form onSubmit={handleLoginSubmit} className="authFormModal">
            <h2>Sign In</h2>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={loginForm.email}
              onChange={handleLoginChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={loginForm.password}
              onChange={handleLoginChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="authFormModal">
            <h2>Create Account</h2>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={registerForm.name}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={registerForm.username}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={registerForm.password}
              onChange={handleRegisterChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={registerForm.confirmPassword}
              onChange={handleRegisterChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignInModal;
