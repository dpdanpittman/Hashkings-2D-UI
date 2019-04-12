import React, { Component } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./Login.css";
import { withRouter } from 'react-router-dom'
import Cookie from "js-cookie";
import Swal from "sweetalert2";

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
    Cookie.set("username", this.state.username)
	const username = Cookie.get("username")
	const message = "{login: `" + username + "`}"
    const key_type = "Posting"
	const steem_keychain = window.steem_keychain;	
	if(window.steem_keychain && username) {
		steem_keychain.requestSignBuffer(username, message, key_type, function(response) {
        console.log(response);
		});
		this.props.history.push('/home')
	}else 
	{
		this.props.history.push('/login')
		}
/*Swal.fire({
  title: 'Welcome',
  text: 'You are now logged in to your Garden',
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
		<center>
		<img
        alt="Hashkings Logo"
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
            Login
          </Button>
        </form>
      </div>
    );
  }
}

export default withRouter(Login);