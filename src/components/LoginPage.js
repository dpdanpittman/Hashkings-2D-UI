import React, {useState, useContext} from "react";
import {InputText} from "primereact/inputtext";
import {Panel} from "primereact/panel";
import {Button} from "primereact/button";
import {withRouter} from "react-router-dom";
import {StateContext} from "../App";
import useSteemKeychain from "../hooks/useSteemKeychain";

export const LoginPage = ({history}) => {
  const [username, setUsername] = useState("");
  const {steemConnectAPI, login} = useContext(StateContext);
  const [loggingIn, setLoggingIn] = useState(false);

  const hasSteemKeychain = useSteemKeychain();

  const keychainLoggedIn = (_, token) => {
    if (token) {
      steemConnectAPI.setAccessToken(token);

      steemConnectAPI
        .me()
        .then(res => {
          login(res.name);
          localStorage.setItem("sc_token", token);
          history.push("/garden");
        })
        .catch(e => {
          console.log(e);
          setUsername("");
          setLoggingIn(false);
        });
    } else {
      setUsername("");
      setLoggingIn(false);
    }
  };

  const Login = () => {
    setLoggingIn(true);
    steemConnectAPI.login({username}, keychainLoggedIn);
  };

  const loginLabelPrefix = loggingIn ? "Logging in with" : "Login with";
  const loginLabelSuffix = hasSteemKeychain()
    ? "STEEM Keychain"
    : "SteemConnect";

  return (
    <center>
      <Panel header="Please Login with Steem Keychain or SteemConnect">
        <div className="p-grid">
          <div className="p-col-12">
            <img alt="..." src="https://i.imgur.com/jvJLKua.png" />
            <div className="card">
              {hasSteemKeychain() && (
                <div className="p-col-12">
                  <InputText
                    type="text"
                    placeholder="Steem Username"
                    autoFocus
                    onChange={e => setUsername(e.target.value)}
                    id="username"
                    value={username}
                  />
                </div>
              )}
              <div className="p-col-12">
                <Button
                  disabled={(hasSteemKeychain() && !username) || loggingIn}
                  onClick={Login}
                  label={`${loginLabelPrefix} ${loginLabelSuffix}`}
                />
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </center>
  );
};

export default withRouter(LoginPage);
