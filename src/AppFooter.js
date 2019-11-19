import React, { Component } from 'react';
import CookieConsent from "react-cookie-consent";
import Typography from '@material-ui/core/Typography';

export class AppFooter extends Component {

    render() {
        return  (
            <div className="layout-footer">
                <CookieConsent
                    location="bottom"
                    buttonText="I Accept"
                    cookieName="myAwesomeCookieName2"
                    style={{ background: "#2B373B" }}
                    buttonStyle={{ color: "#4e503b", fontSize: "13px" }}
                    expires={150}
                    >
                        <span style={{ fontSize: "10px" }}>
                        This website uses cookies to enhance the user experience.{" "}
                        <br/>
                        Your private, active and owner keys are NOT being stored in cache or anywhere 
                        else. Private posting and memo keys are being cached (encrypted) and they are 
                        only readable from the client (your browser) on this site. 
                        </span>
                </CookieConsent>
            </div>
        );
    }
}