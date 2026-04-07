import { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email:"", password:"" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(form);
      login(res.data); // save user + token
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="authForm">
      <h2>Login</h2>

      <input placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})} />

      <button>Login</button>
    </form>
  );
};

export default Login;