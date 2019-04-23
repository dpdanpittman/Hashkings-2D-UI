import React, { Component } from 'react';
import Cookie from "js-cookie";

export class AppInlineProfile extends Component {
    constructor() {
        super();
		Cookie.get("username");
        this.state = {
			username: "Please Login"
        };

    }
    render() {
        return  (
            <div className="profile">
                <div>
                    <img src="assets/layout/images/profile.png" alt="hashkings" />
                </div>
				<b>Welcome <a href="/#/login"><font color="blue">{this.state.username}</font></a></b>
            </div>
        );
    }
}