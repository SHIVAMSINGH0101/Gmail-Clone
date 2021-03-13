import React, { useEffect } from "react";
import { selectSendMessageIsOpen } from "../../features/mailSlice";
import { Header, SideBar, Mail, EmailList, SendMail, Login } from "..";
import "./App.css";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login, selectUser } from "../../features/userSlice";
import { auth } from "../firebase";

function App() {
  const sendMessageIsOpen = useSelector(selectSendMessageIsOpen);

  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    //firebase sets up a cookie in the browser
    auth.onAuthStateChanged((user) => {
      if (user) {
        //logged in
        dispatch(
          login({
            displayName: user.displayName,
            email: user.email,
            photoUrl: user.photoURL,
          })
        );
      }
    });
  }, []);

  return (
    <Router>
      {!user ? (
        <Login />
      ) : (
        <div className="App">
          <Header />

          <div className="app__body">
            <SideBar />

            <Switch>
              <Route path="/mail">
                <Mail />
              </Route>
              <Route path="/">
                <EmailList />
              </Route>
            </Switch>
          </div>

          {sendMessageIsOpen && <SendMail />}
        </div>
      )}
    </Router>
  );
}

export default App;
