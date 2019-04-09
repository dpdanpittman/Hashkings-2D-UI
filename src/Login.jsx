import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { withRouter } from 'react-router-dom'
import Cookie from "js-cookie";
import Swal from "sweetalert2";
import CookieConsent from "react-cookie-consent";

class Login extends Component {
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
  }
    
  handleSubmit = event => {
    event.preventDefault();
	const steem_keychain = window.steem_keychain;
    const account_name = Cookie.set("username")
	const key_type = "Posting"
	const message = "{login:" + '"' + account_name + '"}';
	if(window.steem_keychain && account_name) {
		steem_keychain.requestSignBuffer(account_name, message, key_type, function(response) {
        console.log(response);
	},true);
	this.props.history.push('/')
	}else {
    this.props.history.push('/')
	}
/*Swal.fire({
  title: 'Welcome',
  text: 'Sign the message to login',
  imageUrl: 'https://i.imgur.com/aDDEpiF.png',
  imageWidth: 400,
  imageHeight: 200,
  imageAlt: 'welcome to hashkings',
  animation: true
})*/
    if(window && !window.steem_keychain) {
		Swal.fire({
			type: 'error',
			title: 'Oops...',
			text: 'Something went wrong!',
			footer: '<a href="https://chrome.google.com/webstore/detail/steem-keychain/lkcjlnjfpbikmcmbachjpdbijejflpcm?hl=en">Please install Steem Keychain and try again</a>'
})
	}
  }

  render() {
    return (
      <div className="Login">
	  		<CookieConsent
			location="bottom"
			buttonText="Sure man!!"
			cookieName="username"
			style={{ background: "#2B373B" }}
			buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
			expires={150}
			>
			This website uses cookies to enhance the user experience.{" "}
			<span style={{ fontSize: "10px" }}>
			Brought to you by Qwoyn for your safety
			</span>
			</CookieConsent>
		<center>
		<img
        alt="Hashkings Banner"
        src={require("assets/img/hashkingsbanner.png")}
        />
		</center>
	  <center><h2>Please login below</h2></center>
        <form onSubmit={this.handleSubmit}>
          <FormGroup controlId="username" bssize="large">
            <FormLabel>username</FormLabel>
            <FormControl
              autoFocus
              type="username"
              value={this.state.username}
              onChange={this.handleChange}
            />
          </FormGroup>
          <Button
            block
            bssize="large"
            disabled={!this.validateForm()}
            type="submit"
          >
            Steem Keychain Login
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);
