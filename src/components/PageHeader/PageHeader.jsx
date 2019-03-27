import React from "react";
// reactstrap components
import { Container } from "reactstrap";

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <Container>
          <div className="content-center brand">
		  		<center><img
                  alt="..."
                  src={require("assets/img/hashkingsbanner.png")}
                /></center>
            <h3 className="d-none d-sm-block">
              The Steem Blockchain Cannabis Farming Game
            </h3>
          </div>
        </Container>
      </div>
    );
  }
}

export default PageHeader;
