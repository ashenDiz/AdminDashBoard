import React, { useState, useEffect } from "react";
import "../styles/RegisterScreen.css";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const RegisterScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [passwordStrength, setPasswordStrength] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (password !== confirmPassword) {
      setPasswordMatch(false);
    } else {
      setPasswordMatch(true);
    }
  }, [password, confirmPassword]);

  useEffect(() => {
    if (password.length < 8) {
      setPasswordStrength(
        <p className="paswwordstrenth">
          Password should be at least 8 characters long
        </p>
      );
    } else {
      setPasswordStrength("");
    }
  }, [password]);

  const user = {
    firstName: firstName,
    lastName: lastName,
    contact: contact,
    email: email,
    password: password,
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!passwordMatch) {
      setErrorMessage("Passwords do not match.");
      return;
    }
    if (passwordStrength) {
      setErrorMessage(passwordStrength);
      return;
    }

    try {
      const res = await axios.post("http://localhost:8090/user/signup", user);
      console.log(res);
      alert("User Registered Successfully");
      window.location = "/";
    } catch (err) {
      if (err.response.status === 500) {
        setErrorMessage("There was a problem with the server.");
        toast.error("There was a problem with the server");
      }
    }
  };

  return (
    <div class="container">
      <div class="form-container sign-in-container">
        <form className="register-form">
          <h1 className="form-name">Register</h1>
          <div className="column-style">
            <div className="first-form-column">
              <input
                type="text"
                placeholder="First Name"
                className="input-boxs"
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
              <br />
              <input
                type="email"
                placeholder="E-mail"
                className="input-boxs"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <br />
              <input
                type="password"
                placeholder="Password"
                className="input-boxs"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              {passwordStrength && (
                <p className="password-feedback">{passwordStrength}</p>
              )}
              <br />
            </div>
            <div className="second-form-column">
              <input
                type="text"
                placeholder="Last Name"
                className="input-boxs"
                onChange={(e) => setLastName(e.target.value)}
                required
              />
              <br />
              <input
                type="text"
                placeholder="Phone Number"
                className="input-boxs"
                onChange={(e) => setContact(e.target.value)}
                required
              />
              <br />
              <input
                type="password"
                placeholder="Confirm Password"
                className="input-boxs"
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
              {passwordMatch === false && (
                <p className="password-feedback">Passwords do not match</p>
              )}
              <br />
            </div>
          </div>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <button className="register-button" onClick={handleRegister}>
            Sign In
          </button>
          <br />
        </form>
        <label className="register-login-link-lebel">
          Already have an account ?
        </label>
        <a href="/" className="Login-page-link">
          Login
        </a>
        <br />
        <br />
        <br />
        <br />
      </div>
    </div>
  );
};

export default RegisterScreen;
