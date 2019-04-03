import React from "react";
// reactstrap components
import { Container } from "reactstrap";

class PageHeader extends React.Component {
  render() {
    return (
      <div className="page-header header-filter">
        <div className="squares square1" />
        <Container>
		<br/>
		<br/>
		<center>
		<img
        alt="Hashkings Banner"
        src={require("assets/img/hashkingsbanner.png")}
        />
			<h4 className="d-none d-sm-block">
              The Steem Blockchain, Cannabis Farming Game
            </h4>
			<br/>
		</center>			
		</Container>
      </div>
    );
  }
}

export default PageHeader;
