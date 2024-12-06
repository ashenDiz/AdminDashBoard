import React, { useState, useEffect } from "react";
import "../styles/LoginScreen.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      setIsLoading(true);
      setTimeout(() => {
        window.location = "/dashboard";
        setIsLoading(false);
      }, 5000);
    }
  }, []);

  const loginHandler = async (e) => {
    e.preventDefault();

    // Start loading animation
    setIsLoading(true);

    const user = {
      email: email,
      password: password,
    };

    try {
      const res = await axios.post("http://localhost:8090/user/signin", user);
      console.log(res);
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("userData", JSON.stringify(res.data.result));
      toast.success("Log in successfully!");
      window.location = "/dashboard";
    } catch (err) {
      if (err.response.status === 404) {
        toast.error("Please register before login");
      } else if (err.response.status === 400) {
        toast.error("Invalid Password");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      // Stop loading animation
      setIsLoading(false);
    }
  };

  return (
    <div className="container" id="container">
      <div className="form-container sign-in-container">
        <form className="loginform">
          <h1 className="form-name">Login</h1>

          <input
            type="email"
            placeholder="Email"
            className="login-input-boxe"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <br />
          <input
            type="password"
            placeholder="Password"
            className="login-input-boxe"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <p className="incorectusername">
            <b></b>
          </p>

          <br />
          <br />

          <button className="singin-button" onClick={loginHandler}>
            {isLoading ? "Authenticating" : "LogIn"}{" "}
            {/* Show loading or Login */}
          </button>

          <br />
        </form>
        {/* <label className="login-registerpage-link-lebel">
          Don't have an account ?
        </label>
        <a href="/register" className="Login-page-link">
          Create Account
        </a> */}
        <br />
        <br />
        <br />
        <br />
      </div>
      <ToastContainer />
    </div>
  );
};

export default LoginScreen;
