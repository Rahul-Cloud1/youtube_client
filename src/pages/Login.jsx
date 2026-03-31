import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await API.post("/auth/login", {
        email,
        password
      });

      // 🔥 SAVE USER IN LOCAL STORAGE
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Login successful!");
      navigate("/");

    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div style={{ padding:"50px" }}>
      <h1>Login</h1>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;