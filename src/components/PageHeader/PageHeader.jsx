import React from "react";

class PageHeader extends React.Component {
  render() {
    return (
      <div>
		<br/>
		<br/>
		<center>
		<img
        alt="Hashkings Banner"
        src={require("assets/img/hashkingsbanner.png")}
        />
			<h4 className="d-none d-sm-block">
              The Steem Blockchain, Cannabis Farming Simulator
            </h4>
		</center>	
		<br/>
		<br/>
		<br/>
      </div>
    );
  }
}

export default PageHeader;
