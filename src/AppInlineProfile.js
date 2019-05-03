import React, { Component } from 'react';
import Cookie from "js-cookie";

export class AppInlineProfile extends Component {
    constructor() {
        super();
        this.state = {
			username: Cookie.get("username")
        };

    }
	
    render() {
		if (this.state.username) {
        return  (
            <div className="profile">
                <div>
                    <img src="assets/layout/images/profile.png" alt="hashkings" />
                </div>
				<b>Welcome <a href="/#/login"><font color="blue">{this.state.username}</font></a></b>
            </div>
        );
    }else {
        return  (
            <div className="profile">
                <div>
                    <img src="assets/layout/images/profile.png" alt="hashkings" />
                </div>
				<b>Welcome <a href="/#/login"><font color="blue">Please Login</font></a></b>
            </div>
        );
    	
	}
}
}