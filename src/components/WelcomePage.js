import React from "react";
import {withRouter} from "react-router-dom";
import Container from '@material-ui/core/Container';

export const WelcomePage = () => {

    return (
      <Container fixed>
      <div className="card-blank">
        
        <div className="p-fluid">
        <center>
          <div className="p-col-12">
          <img src="https://i.imgur.com/jTxih7O.png" class="rounded" />
          </div>
        </center>
        </div>
        
	  </div></Container>
    );
};

export default withRouter(WelcomePage);