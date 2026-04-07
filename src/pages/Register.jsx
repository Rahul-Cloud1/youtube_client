import { useState } from "react";
import { registerUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser(form);
      alert("Registered successfully!");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="authForm">
      <h2>Register</h2>

      <input placeholder="Name"
        onChange={(e)=>setForm({...form,name:e.target.value})} />

      <input placeholder="Email"
        onChange={(e)=>setForm({...form,email:e.target.value})} />

      <input type="password" placeholder="Password"
        onChange={(e)=>setForm({...form,password:e.target.value})} />

      <button>Register</button>
    </form>
  );
};

export default Register;