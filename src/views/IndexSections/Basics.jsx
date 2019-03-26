import React from "react";
import classnames from "classnames";
// plugin that creates slider
// react plugin used to create switch buttons
import Switch from "react-bootstrap-switch";

// reactstrap components
import {
  Collapse,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Button,
  Label,
  FormGroup,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Container,
  Row,
  Col
} from "reactstrap";

const ColoredLine = ({ color }) => (
    <hr
        style={{
            color: color,
            backgroundColor: color,
            height: 5
        }}
    />
);

class Basics extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputFocus: false
    };
  }
  render() {
    return (
      <div className="section section-basic" id="basic-elements">
        <img alt="..." className="path" src={require("assets/img/path1.png")} />
        <Container>
          <center><h2 className="title">Step 1,<br/>lease a plot of land<br/><ColoredLine color="green" /></h2></center>
		  <br/><br/>
          <h2>Welcome to Our Leasing Office</h2>
		  <br/>
		  <h3>One Plot Lease: 20 Steem</h3>
          <p className="category">Below you can find our available leases. <br/>Each Region only has a limited amount
		  of plots available.<br/>If there are no more properties available please visit our Marketplace</p>
		  <br/>
		  <Col md="10">
            <Row>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <img
                  alt="Afghanistan"
                  className="img-fluid rounded shadow-lg"
                  src={require("assets/img/Afghanistan.png")}
                  style={{ width: "150px" }}
                />
				<Button className="btn-round" color="success" type="button">
                Afghanistan
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <img
                  alt="Africa"
                  className="img-fluid rounded shadow-lg"
                  src={require("assets/img/Africa.png")}
                  style={{ width: "150px" }}
                />
				<Button className="btn-round" color="success" type="button">
                Africa
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <img
                  alt="Asia"
                  className="img-fluid rounded shadow-lg"
                  src={require("assets/img/Asia.png")}
                  style={{ width: "150px" }}
                />
				<Button className="btn-round" color="success" type="button">
                Asia
              </Button>
              </Col>
			  </Row>
			  <br/><br/>
			  <Row>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <img
                  alt="Central America"
                  className="img-fluid rounded shadow-lg"
                  src={require("assets/img/C_America.png")}
                  style={{ width: "150px" }}
                />
				<Button className="btn-round" color="success" type="button">
                C America
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <img
                  alt="Jamaica"
                  className="img-fluid rounded shadow-lg"
                  src={require("assets/img/Jamaica.png")}
                  style={{ width: "150px" }}
                />
				<Button className="btn-round" color="success" type="button">
                Jamaica
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <img
                  alt="Mexico"
                  className="img-fluid rounded shadow-lg"
                  src={require("assets/img/Mexico.png")}
                  style={{ width: "150px" }}
                />
				<Button className="btn-round" color="success" type="button">
                Mexico
              </Button>
              </Col>
            </Row>
			</Col>
			<br/>
			<br/>
			<ColoredLine color="green" />
			<br/>
			<br/>
          <center><h2 className="title">Step 2,<br/>Purchase a seed<br/><ColoredLine color="green" /></h2></center>
		  <br/><br/>
          <h2>Welcome to our Seed Bank</h2>
		  <br/>
		  <h3>Hand-Picked Seed Cost: 3 Steem <br/> Comes with 2250 XP</h3>
		  			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Hindu Kush
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Afghani
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Lashkar Gah
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Mazar i Sharif
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Lambs Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Kings Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Acapulco Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Swazi Gold
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Kilimanjaro
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Durban Poison
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Malawi
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Panama Red
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Columbian Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Aceh
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Thai
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="warning" type="button">
                Chocolate Thai
              </Button>
              </Col>
			</Row>
			<br/>
			<br/>
		  <h3>Premium Seed Cost: 1.5 Steem <br/> Comes with 750 XP</h3>
          <p className="category">Below you can find our available basic Seeds. <br/>One Seed for One Plot.<br/>Each seed must have a plot attached to it</p>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Hindu Kush
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Afghani
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Lashkar Gah
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Mazar i Sharif
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Lambs Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Kings Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Acapulco Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Swazi Gold
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Kilimanjaro
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Durban Poison
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Malawi
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Panama Red
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Columbian Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Aceh
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Thai
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="info" type="button">
                Chocolate Thai
              </Button>
              </Col>
			</Row>
			<br/>
			<br/>
		  <h3>Basic Seed Cost: 0.75 Steem <br/> Comes with 1 XP</h3>
		  			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Hindu Kush
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Afghani
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Lashkar Gah
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Mazar i Sharif
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Lambs Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Kings Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Acapulco Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Swazi Gold
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Kilimanjaro
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Durban Poison
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Malawi
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Panama Red
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Columbian Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Aceh
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Thai
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button className="btn-round" color="default" type="button">
                Chocolate Thai
              </Button>
              </Col>
			</Row>
			<br/>
			<br/>
			<ColoredLine color="green" />
			<br/>
			<br/>
			<center><h2 className="title">Step 3,<br/>Work in the Garden<br/><ColoredLine color="green" /></h2></center>
		    <br/><br/>
          <h2>Welcome to your Garden</h2>
		  <br/>
		  <h3>Actions are Free</h3>
          <p className="category">Earn XP through your in-game actions<br/><br/>Each Action is timed!<br/>
		  The closer to the correct time you water and feed etc... the more XP you will receive<br/></p>
		  <h4>Taking care of your plant is the most important part of growing.  Listen to your plant, it will tell you what it needs</h4>
		  <ColoredLine color="green" />
		  <div className="section section-navbars">
        <img alt="..." className="path" src={require("assets/img/path3.png")} />
        <Container id="menu-dropdown">
          <Row>
            <Col md="6">
              <h3>Gardening</h3>
              <Navbar className="bg-warning" expand="lg">
                <Container>                  
                  <button className="navbar-toggler" aria-expanded={false}>
                    <span className="navbar-toggler-bar bar1" />
                    <span className="navbar-toggler-bar bar2" />
                    <span className="navbar-toggler-bar bar3" />
                  </button>
                  <Collapse navbar isOpen={false}>
                    <Nav navbar>
                      <NavItem className="active">
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <h4>Plant</h4>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <h4>Water</h4>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <h4>Prune</h4>
                        </NavLink>
                      </NavItem>	
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <h4>Feed</h4>
                        </NavLink>
                      </NavItem>
                      <NavItem>
                        <NavLink
                          href="#pablo"
                          onClick={e => e.preventDefault()}
                        >
                          <h4>Fight Bugs</h4>
                        </NavLink>
                      </NavItem>					  
                    </Nav>
                  </Collapse>
                </Container>
              </Navbar>
            </Col>
            
          </Row>
		  </Container>
      </div>
        </Container>
      </div>
    );
  }
}

export default Basics;