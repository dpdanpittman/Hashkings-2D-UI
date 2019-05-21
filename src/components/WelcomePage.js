import React from "react";
import {withRouter} from "react-router-dom";

export const WelcomePage = () => {

    return (
      <div className="card-blank">
        <div className="p-fluid">
        <center>
          <div className="p-col-12">
            <img alt="welcome_graphic_qwoyn_hashkings" height="700px" src={require("./welcome.png")} />
          </div>
        </center>
        </div>
	  </div>
    );
};

export default withRouter(WelcomePage);