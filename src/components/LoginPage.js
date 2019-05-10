import React, {useState, useContext} from "react";
import {InputText} from "primereact/inputtext";
import {Panel} from "primereact/panel";
import Cookie from "js-cookie";
import {Button} from "primereact/button";
import {withRouter} from "react-router-dom";
import {StateContext} from "../App";

export const LoginPage = ({history}) => {
  const [username, setUsername] = useState("");
  const {steemConnectAPI, login} = useContext(StateContext);

  const handleSubmit = event => {
    event.preventDefault();

    const push = history.push;
    const message = "{login: `" + username + "`}";
    const key_type = "Posting";
    const steem_keychain = window.steem_keychain;

    if (window.steem_keychain && username) {
      steem_keychain.requestSignBuffer(username, message, key_type, function(
        response
      ) {
        if (response.success) {
          Cookie.set("username", username);
          login(username, "sk");
          push("/garden");
        } else {
          // Show a better error
          alert("Error");
        }
      });
    } else {
      // Show a better error
      alert("No keychain");
    }
  };

  const scLogin = () => {
    const next =
      window.location.pathname.length > 1 ? window.location.pathname : "";
    const url = steemConnectAPI.getLoginURL(next);
    window.location.href = url;
  };

  return (
    <center>
      <Panel header="Please Login with Steem Keychain or SteemConnect">
        <div className="p-grid">
          <div className="p-col-12">
            <img alt="..." src="https://i.imgur.com/jvJLKua.png" />
            <div className="card">
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
              <div className="p-col-12">
                <Button
                  onClick={handleSubmit}
                  label="Login with STEEM Keychain"
                />
              </div>
              <h4>
                If you do not have Steem Keychain installed please click{" "}
                <a
                  href="https://chrome.google.com/webstore/detail/steem-keychain/lkcjlnjfpbikmcmbachjpdbijejflpcm?hl=en"
                  alt="..."
                >
                  here
                </a>
              </h4>
              <div className="p-col-12">
                <p>OR</p>
              </div>
              <div className="p-col-12">
                <Button onClick={scLogin} label="Login with SteemConnect" />
              </div>
            </div>
          </div>
        </div>
      </Panel>
    </center>
  );
};

export default withRouter(LoginPage);
