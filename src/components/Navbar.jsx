import { Link } from "react-router-dom"

export default function Navbar() {
  const token = localStorage.getItem("token")

  return (
    <div className="navbar">
      <Link to="/" className="logo">YouTube Clone</Link>

      <input className="search" placeholder="Search" />

      <div>
        {token ? (
          <button onClick={()=>{
            localStorage.removeItem("token")
            window.location.reload()
          }}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </div>
  )
}