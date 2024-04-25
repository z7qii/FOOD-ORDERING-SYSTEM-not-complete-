import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import style from "./index.module.css";
import { useDispatch } from "react-redux";
import { setLogin } from "../../states/user";
import { setResturant } from "../../states/resturant";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Index = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const setResturantState = async (token) => {
    try {
      const response = await fetch(
        "http://localhost:8010/resturantOwner/getResturant",
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (response.ok) {
        const resturant = await response.json();
        console.log(resturant);
        dispatch(
          setResturant({
            resturant: resturant.resturant,
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };
  const handleLogin = async (e) => {
    e.preventDefault(); // Prevent default form behavior
    console.log(email, password);
    try {
      const response = await fetch("http://localhost:8010/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const loggedIn = await response.json();
        console.log(loggedIn.user);
        dispatch(
          setLogin({
            user: loggedIn.user,
            token: loggedIn.token,
            isLoggedIn: true,
          })
        );
        await setResturantState(loggedIn.token);
        navigate("/homePage");
      } else {
        console.log("Login not allowed");
        // Here, you could set an error state and display it to the user.
      }
    } catch (err) {
      console.log(err);
      // Here, you could set an error state and display it to the user.
    }
  };
  return (
    <div className={style.loginBody}>
      <div className={style.loginContainer}>
        <h1 className={style.loginHeader}>LOGIN</h1>
        <form className={style.loginForm} onSubmit={handleLogin}>
          <div className={style.formGroup}>
            <FontAwesomeIcon icon={faEnvelope} className={style.icon} />
            <input
              type="email"
              className={style.formControl}
              placeholder="Email address"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className={style.formGroup}>
            <FontAwesomeIcon icon={faLock} className={style.icon} />
            <input
              type="password"
              className={style.formControl}
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button type="submit" className={style.loginButton}>
            LOGIN
          </button>
        </form>
        <div className={style.footer}>
          <a href="/signupPage" className={style.signupLink}>
            Create an account
          </a>
        </div>
      </div>
    </div>
  );
};

export default Index;
