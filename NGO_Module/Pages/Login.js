import user_icon from "./user.png";
import { Link, useNavigate } from "react-router-dom";
import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);
      await login(emailRef.current.value, passwordRef.current.value);
      navigate("/home");
    } catch {
      setError("Failed to login");
    }

    setLoading(false);
  }
  function anchorMouseOverHandeler(e) {
    e.target.style.textDecoration = "underline";
  }

  function anchorMouseOutHandeler(e) {
    e.target.style.textDecoration = "none";
  }
  function capture(e) {
    if (e.target.value === "") {
      e.target.style.borderColor = "red";
    } else {
      e.target.style.borderColor = "white";
    }
  }
  const newLocal = (
    <form onSubmit={handleSubmit}>
      <button
        className="register"
        onMouseOver={anchorMouseOverHandeler}
        onMouseOut={anchorMouseOutHandeler}
      >
        <Link to="/register" style={{ textDecoration: "none", color: "white" }}>
          Register
        </Link>
      </button>
      <div className="login_div">
        <center>{error && <div className="err-msg">{error}</div>}</center>
        <center>
          <img
            src={user_icon}
            alt="user"
            style={{ heigh: "50%", width: "50%" }}
          ></img>
        </center>
        <legend style={{ float: "left" }}>Email</legend>
        <br></br>
        <input
          type="text"
          className="email"
          placeholder="Enter Your Email"
          onBlur={capture}
          ref={emailRef}
        ></input>
        <br></br>
        <br></br>
        <legend>Password</legend>
        <input
          type="password"
          className="psw"
          placeholder="Enter Your Password"
          onBlur={capture}
          ref={passwordRef}
        ></input>
        <br></br>
        <br></br>
        <br></br>

        <button type="submit" className="login" disabled={loading}>
          Login
        </button>
        <a
          className="fpsw"
          href="/register"
          onMouseOver={anchorMouseOverHandeler}
          onMouseOut={anchorMouseOutHandeler}
        >
          Need help?
        </a>
      </div>
    </form>
  );
  return newLocal;
}
export default Login;
