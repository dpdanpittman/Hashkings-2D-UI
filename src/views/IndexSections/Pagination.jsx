import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Badge,
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
      pills: 1
    };
  }
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
                    onClick={e => this.toggleTabs(e, "pills", 1)}
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
                    onClick={e => this.toggleTabs(e, "pills", 2)}
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
                    onClick={e => this.toggleTabs(e, "pills", 3)}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-scissors" />
                    Prune
                  </NavLink>
                </NavItem>
				<NavItem>
                  <NavLink
                    className={classnames({
                      "active show": this.state.pills === 3
                    })}
                    onClick={e => this.toggleTabs(e, "pills", 3)}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-settings-gear-63" />
                    Combat Pests- Organic
                  </NavLink>
                </NavItem>
				<NavItem>
                  <NavLink
                    className={classnames({
                      "active show": this.state.pills === 3
                    })}
                    onClick={e => this.toggleTabs(e, "pills", 3)}
                    href="#pablo"
                  >
                    <i className="tim-icons icon-cart" />
                    Harvest
                  </NavLink>
                </NavItem>
              </Nav>
			</Col>
			<Col md="4">
			<h2>Inventory Goes Here</h2>
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
