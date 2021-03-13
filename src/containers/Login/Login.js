import { Button } from "@material-ui/core";
import React from "react";
import { useDispatch } from "react-redux";
import { login } from "../../features/userSlice";
import { auth, provider } from "../firebase";
import "./Login.css";

const Login = () => {
  const dispatch = useDispatch();

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(({ user }) => {
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  return (
    <div className="login">
      <div className="login__container">
        <img
          src="data:image/png;base64,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"
          alt="gmail"
        />

        <Button
          variant="contained"
          color="primary"
          onClick={signIn}
          className="login__button"
        >
          Login
        </Button>
      </div>
    </div>
  );
};

export default Login;
