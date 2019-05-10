import React, {useEffect, useContext} from "react";
import Cookie from "js-cookie";
import {withRouter} from "react-router-dom";
import {StateContext} from "../App";

const SCCallback = ({history}) => {
  const urlParams = new URLSearchParams(window.location.search);

  const {steemConnectAPI, login} = useContext(StateContext);

  const isValid =
    urlParams.has("access_token") &&
    urlParams.has("expires_in") &&
    urlParams.has("state");

  useEffect(() => {
    if (isValid) {
      const accessToken = urlParams.get("access_token");
      const expiresIn = urlParams.get("expires_in");

      steemConnectAPI.setAccessToken(accessToken);

      steemConnectAPI
        .me()
        .then(res => {
          login(res.name);
          Cookie.set("access_token", accessToken, {
            expires: expiresIn / 86400
          });
          history.push("/garden");
        })
        .catch(e => {
          console.log(e);
          history.push("/login");
        });
    } else {
      history.push("/login");
    }
  }, []);

  return <h1 style={{color: "white"}}>Logging in</h1>;
};

export default withRouter(SCCallback);
