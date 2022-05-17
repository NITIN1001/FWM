import { useState, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
function Register() {
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfirmRef = useRef();
  const { signup } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    if (passwordRef.current.value !== passwordConfirmRef.current.value) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setLoading(true);
      await signup(emailRef.current.value, passwordRef.current.value);
      navigate("/");
    } catch {
      setError("Failed to create an account");
    }

    setLoading(false);
  }
  return (
    <div className="register_div">
      <center>
        <h1 style={{ fontFamily: "lucida" }}>Sign Up</h1>
        <center>{error && <div className="err-msg">{error}</div>}</center>
      </center>
      <br />
      <form onSubmit={handleSubmit}>
        <legend>Email</legend>
        <input
          type="text"
          placeholder="Email"
          className="email"
          name="email"
          ref={emailRef}
        ></input>
        <br />
        <br />
        <legend>Password</legend>
        <input
          type="password"
          placeholder="Password"
          className="psw"
          name="password"
          ref={passwordRef}
        ></input>
        <br />
        <br />
        <legend>Confirm Password</legend>
        <input
          type="password"
          placeholder="Confirm Password"
          className="cpsw"
          ref={passwordConfirmRef}
        ></input>
        <br />
        <br />
        <br />
        <button type="submit" className="sub" disabled={loading}>
          Sign Up
        </button>
        <center>
          <p className="member">
            Already have an account?{" "}
            <Link to="/" style={{ color: "red", textDecoration: "none" }}>
              login
            </Link>
          </p>
        </center>
      </form>
    </div>
  );
}
export default Register;
