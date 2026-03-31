import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");

  const handleRegister = async () => {
    try {
      await API.post("/auth/register", {
        name,
        email,
        password
      });

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div style={{ padding:"50px" }}>
      <h1>Register</h1>

      <input
        placeholder="Name"
        onChange={(e)=>setName(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Email"
        onChange={(e)=>setEmail(e.target.value)}
      /><br/><br/>

      <input
        placeholder="Password"
        type="password"
        onChange={(e)=>setPassword(e.target.value)}
      /><br/><br/>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default Register;