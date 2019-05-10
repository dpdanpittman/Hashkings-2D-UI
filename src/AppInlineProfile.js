import React, {useContext} from "react";
import {Link} from "react-router-dom";
import {StateContext} from "./App";

export const AppInlineProfile = () => {
  const {username} = useContext(StateContext);

  return (
    <div className="profile">
      <div>
        <img src="assets/layout/images/profile.png" alt="hashkings" />
      </div>
      <b>
        Welcome{" "}
        <Link to="/login">
          <font color="blue">{username || "Please Login"}</font>
        </Link>
      </b>
    </div>
  );
};
