import React from "react";
import classnames from "classnames";
// cookie components for login
import Cookie from 'js-cookie';
import "Login.css";
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

// fancy coloredline, default green
const ColoredLine = ({ color }) => (
    <hr
        style={{
			align: "right",
			width: 375,
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

const PayoutColoredLine = ({ color }) => (
    <hr
        style={{
			align: "right",
			width: 350,
            color: color,
            backgroundColor: color,
            height: 1
        }}
    />
);

class PaginationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: 1,
	  myGarden: []
    };
  }
  

componentDidMount() {
    const username = Cookie.get("username");
    if(username) {
        let url = `https://hashkings.herokuapp.com/u/${username}`
        fetch(url)
        .then(results => {
                return results.json();
        }).then(data => {
            const myGarden = data.addrs;
            this.setState({myGarden})
        }).catch(() => {
            Cookie.remove("username")
        })
    }
}

//-----------------------------------------------------------------------------------------------------------  
    handleWater = (myGarden) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
	const custom_json_id = "qwoyn_water";
	const key_type = "posting";
	var custom_JSON = JSON.stringify({plants:[this.state.myGarden]});
	//var custom_JSON = '{"plants":["a10"]}';
    if(steem_keychain && username) {
		steem_keychain.requestCustomJson([username], custom_json_id, key_type, custom_JSON, "Water your Plant", function(response) {
			console.log(response);
		});
    }
    }
//-----------------------------------------------------------------------------------------------------------  
    plantSeed = (myGarden) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
	const custom_json_id = "qwoyn_plant";
	const key_type = "posting";
	var custom_JSON = JSON.stringify({addr:[this.state.myGarden],seed:0});
	//var custom_JSON = '{"addr":"c35","seed":0}';
    if(steem_keychain && username) {
		steem_keychain.requestCustomJson([username], custom_json_id, key_type, custom_JSON, "Plant your Seed", function(response) {
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
				<br />
				<br />
		<center>
          <Row>
		  <Col md="4">
		  <h2><font color="red">Payouts (Coming Soon)</font></h2>
		  <div>
			<h4>Daily</h4>
			<h5>0.0437 STEEM</h5>
			<div>
			<PayoutColoredLine color="green" />
			</div>
			</div>
			<div>
			<h4>Weekly</h4>
			<h5>0.306 STEEM</h5>
			<PayoutColoredLine color="brown" />
			</div>
			<div>
			<h4>Monthly</h4>
			<h5>1.311 STEEM</h5>
			<PayoutColoredLine color="white" />
			</div>
		  </Col>
		  <Col md="4">
		  <h1>Choose one of the actions below</h1>
		  <Nav className="nav-pills-success nav-pills-icons" pills>
                <NavItem>
                  <NavLink
                    className={classnames({
                      "active show": this.state.pills === 1
                    })}
                    //onClick={() => this.plantSeed()}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-atom" />
                    Plant(coming soon)
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink 
				  className={classnames({
                      "active show": this.state.pills === 2
                    })}
                    //onClick={e => this.handleWater()}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-tap-02" />
                    Water(coming soon)
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
                    Prune(coming soon)
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
			<h4>My Gardens</h4>
			<h5>{ this.state.myGarden }</h5>
			<div>
			<ColoredLine color="green" />
			</div>
			</div>
			<div>
			<h4>My Seeds</h4>
			<ColoredLine color="brown" />
			</div>
			<div>
			<h4>My Empty Gardens</h4>
			<ColoredLine color="white" />
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
