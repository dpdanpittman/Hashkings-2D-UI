import React from "react";
import classnames from "classnames";
// cookie components for login
import Cookie from 'js-cookie';
import 'fetch';
//import axios from 'axios';
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Progress,
  Container,
  Row,
  Col
} from "reactstrap";

class PaginationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: 1,
	  myGarden: []
    };
  }
  
    getApiUrl() {
	const username = Cookie.get("username");
    const host = 'https://hashkings.herokuapp.com/u/';
    return host + username;
    }
	
    fetchGarden() {	
	let url = 
    fetch('url + `username`')
      .then(resp => resp.json())
      .then(resp => {
        const myGarden = resp.addrs;
        this.setState({myGarden})
      })
	}	
 /*

  componentDidMount() {
	  const username = Cookie.get("username");
	  let url = 'https://hashkings.herokuapp.com/u/'
	  fetch('url + `username`')
	  .then(results => {
		  return results.json();
	  }).then(data => {
		  let garden = data.results.map((garden) => {
			  return(
			  <div key={garden.results}>
			  <img src={garden.addrs} />
			  </div>
			  )
		  })
		  this.setState(garden);
		  console.log("state", this.state.garden);
	  })
  }
		*/
//-----------------------------------------------------------------------------------------------------------  
    handleWater = (myPlant) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
	const custom_json_id = "qwoyn_water";
	const key_type = "posting";
	var custom_JSON = JSON.stringify({plants:[myPlant]});
	//var custom_JSON = '{"plants":["a10"]}';
    if(steem_keychain && username) {
		steem_keychain.requestCustomJson(username, custom_json_id, key_type, custom_JSON, "Water your Plant", function(response) {
			console.log(response);
		});
    }
    }
//-----------------------------------------------------------------------------------------------------------  
    plantSeed = (mySeed, myPlot) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
	const custom_json_id = "qwoyn_plant";
	const key_type = "posting";
	var custom_JSON = JSON.stringify({addr:myPlot,seed:mySeed});
	//var custom_JSON = '{"addr":"c35","seed":0}';
    if(steem_keychain && username) {
		steem_keychain.requestCustomJson(username, custom_json_id, key_type, custom_JSON, "Plant your Seed", function(response) {
			console.log(response);
		});
    }
    }
//----------------------------------------------------------------------------------------------------------- 
  toggleTabs = (e, stateName, index) => {
	e.preventDefault();
    this.setState({
      [stateName]: index
    });
  };
  render() {
    return (
      <div className="section section-pagination">
        <img alt="..." className="path" src={require("assets/img/path4.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path5.png")}
        />
        <Container>
		<br/>
		<br/>
		<center><h1 className="title">Step 3,<br/>Work in the Garden</h1></center>
		<br/>
		<br/>
        <h2><u>Welcome to your Garden</u></h2>
		<br/>
		<h3>All Actions are Free and earn curation rewards</h3>
		<p className="category">Earn XP through your in-game actions<br/><br/>Each Action is timed! and 
		the closer to the correct time you water and feed etc... the more XP you will receive</p>
		<br/>
			<center><img
				alt="..."
                className="img-raised"
                src={require("assets/img/landing-page.png")}
                /></center>
				<br />
				<br />
		<center>
          <Row>
		  <Col md="4">
		  <h2>Past and current payouts</h2>
		  </Col>
		  <Col md="4">
		  <h1>Choose one of the actions below</h1>
		  <Nav className="nav-pills-success nav-pills-icons" pills>
                <NavItem>
                  <NavLink
                    className={classnames({
                      "active show": this.state.pills === 1
                    })}
                    onClick={() => this.handleWater()}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-atom" />
                    Plant
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      "active show": this.state.pills === 2
                    })}
                    onClick={e => this.handleWater()}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-tap-02" />
                    Water
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({
                      "active show": this.state.pills === 3
                    })}
                    onClick={e => this.toggleTabs(e, "pills", 1)}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-scissors" />
                    Prune
                  </NavLink>
                </NavItem>
				<NavItem>
                  <NavLink
                    className={classnames({
                      "active show": this.state.pills === 4
                    })}
                    onClick={e => this.toggleTabs(e, "pills", 1)}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                    Combat Pests- Organic(Coming Soon)
                  </NavLink>
                </NavItem>
				<NavItem>
                  <NavLink
                    className={classnames({
                      "active show": this.state.pills === 5
                    })}
                    onClick={e => this.toggleTabs(e, "pills", 1)}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-cart" />
                    Harvest(Coming Soon)
                  </NavLink>
                </NavItem>
              </Nav>
			</Col>
			<Col md="4">
			<h2>Inventory</h2>
			<div>
			{ this.state.myGarden }
			</div>
			</Col>
			</Row>
			</center>
			<div className="space-70" />			
			<Row>
            <Col md="6">
              <h3 className="mb-4">Daily Progress</h3>
              <div className="progress-container">
                <span className="progress-badge">Time until next watering</span>
                <Progress max="100" value="25">
                  <span className="progress-value">25%</span>
                </Progress>
              </div>
              <div className="progress-container progress-info">
                <span className="progress-badge">Time until Harvest</span>
                <Progress max="100" value="10">
                  <span className="progress-value">10%</span>
                </Progress>
              </div>
              <br />
            </Col>
			<Col md="6">
              <h3 className="mb-4">*</h3>
              <div className="progress-container copywrite">
                <span className="progress-badge">Time until next feeding</span>
                <Progress max="100" value="55">
                  <span className="progress-value">55%</span>
                </Progress>
              </div>
              <div className="progress-container progress-info">
                <span className="progress-badge">Time until next pruning</span>
                <Progress max="100" value="40">
                  <span className="progress-value">40%</span>
                </Progress>
              </div>
              <br />
            </Col>
          </Row>
          <br />
        </Container>
      </div>
    );
  }
}

export default PaginationSection;
