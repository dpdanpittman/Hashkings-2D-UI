import React, {Component} from 'react';
import {Button} from 'primereact/button';
import {InputText} from 'primereact/inputtext';
import {Panel} from 'primereact/panel';
import Cookie from "js-cookie";

export class EmptyPage extends Component {
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
		console.log(this.state.username);
		steem_keychain.requestSignBuffer(username, message, key_type, function(response) {
        console.log(response);
		});
		this.props.history.push('/login');
	}else 
	{
		console.log(this.state.username);
		this.props.history.push('/');
	}
  }
    render() {
        return (
		<center>
		<Panel header="Please Login with Steem Keychain">
            <div className="p-grid">
                <div className="p-col-12">
				<img alt="..." src="https://i.imgur.com/jvJLKua.png" />
                    <div className="card">
                            <div className="p-col-12">
                                <InputText type="text" placeholder="Steem Username" autoFocus />
                            </div>
                            <div className="p-col-12">
                                <button onClick={this.handleSubmit}>Login</button>
                            </div>							       
                    </div>
                </div>
            </div>
		</Panel>
		</center>
        );
    }
}