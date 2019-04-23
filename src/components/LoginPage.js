import React, {Component} from "react";
import {InputText} from "primereact/inputtext";
import {Panel} from "primereact/panel";
import Cookie from "js-cookie";
import {Button} from "primereact/button";
import {withRouter} from "react-router-dom";

export class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handleSubmit = event => {
    event.preventDefault();

    const username = this.state.username;
    const push = this.props.history.push;
    const message = "{login: `" + username + "`}";
    const key_type = "Posting";
    const steem_keychain = window.steem_keychain;

    if (window.steem_keychain && username) {
      steem_keychain.requestSignBuffer(username, message, key_type, function(
        response
      ) {
        if (response.success) {
          Cookie.set("username", username);
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
  render() {
    return (
      <center>
        <Panel header="Please Login with Steem Keychain">
          <div className="p-grid">
            <div className="p-col-12">
              <img alt="..." src="https://i.imgur.com/jvJLKua.png" />
              <div className="card">
                <div className="p-col-12">
                  <InputText
                    type="text"
                    placeholder="Steem Username"
                    autoFocus
                    onChange={this.handleChange}
                    id="username"
                  />
                </div>
                <div className="p-col-12">
                  <Button onClick={this.handleSubmit} label="Login" />
                </div>
              </div>
              <h4>
                If you do not have Steem Keychain installed please click
                <a
                  href="https://chrome.google.com/webstore/detail/steem-keychain/lkcjlnjfpbikmcmbachjpdbijejflpcm?hl=en"
                  alt="..."
                >
                  {" "}
                  here
                </a>
              </h4>
            </div>
          </div>
        </Panel>
      </center>
    );
  }
}

export default withRouter(LoginPage);
