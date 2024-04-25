import React, { useState } from "react";
import style from "./index.module.css";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleSignup = async (e) => {};

  return (
    <div className={style.signUpContainer}>
      <h1 className={style.headerTitle}>CREATE NEW ACCOUNT</h1>
      <form className={style.signUpForm} onSubmit={handleSignup}>
        <label htmlFor="fullName">Full name:</label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
        />

        <label htmlFor="email">Email address:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="phone">Phone number:</label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="+60"
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <p className={style.terms}>
          By creating an account you agree to the <a href="#">Privacy policy</a>{" "}
          and the <a href="#">Terms of use</a>.
        </p>

        <button type="submit" className={style.registerButton}>
          Register
        </button>
      </form>
      <div className={style.loginPrompt}>
        Already have an account? <a href="/">Login</a>
      </div>
    </div>
  );
};

export default Index;
