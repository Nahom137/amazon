import React, { useState, useContext } from "react";
import classes from "./SignUp.module.css";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { DataContext } from "../../Components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";
import {ClipLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });
    const navigate = useNavigate();
   const [{ user }, dispatch] = useContext(DataContext);

  //  console.log(user)

  // console.log(email, password)
  const authHandler = async (e) => {
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name == "signin") {
       setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
           dispatch({
             type: Type.SET_USER,
             user: userInfo.user,
           });
             setLoading({ ...loading, signIn: false });
              navigate("/");
        })
        .catch((err) => {
          console.log(err.message);
          setError(err.message);
           setLoading({ ...loading, signIn: false });
        });
    } else {
       setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          console.log(userInfo);
           dispatch({
             type: Type.SET_USER,
             user: userInfo.user,
           });
             setLoading({ ...loading, signUp: false });
              navigate("/");
        })
        .catch((err) => {
          console.log(err.message);
           setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className={classes.login}>
      <Link to="/">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png"
          alt=""
        />
      </Link>

      <div className={classes.login__container}>
        <h1>Sign In</h1>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>

          <button
            type="submit"
            name="signin"
            onClick={authHandler}
            className={classes.login__signInButton}
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              " Sign In"
            )}
          </button>
        </form>

        <p>
          By signing-in you are agree to the AMAZON FAKE CLONE Conditions of use
          & Sale. please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>

        <button
          type="submit"
          name="signup"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            " Create your Amazon Account"
          )}
        </button>

        {error && (
          <small style={{ padding: "10px", color: "red" }}>{error}</small>
        )}
      </div>
    </section>
  );
}

export default Auth;
