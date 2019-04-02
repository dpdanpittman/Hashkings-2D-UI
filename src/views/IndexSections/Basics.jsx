import React from "react";
// plugin that creates slider
// react plugin used to create switch buttons

// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
import Cookie from 'js-cookie';

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

  handleLand = (landType) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
    const toAccount = "hashkings"
    const amount = "20.000";
    if(steem_keychain && username) {
        steem_keychain.requestTransfer(username, toAccount, amount, landType, "STEEM", function(response) {
            console.log(response);
        },true);
    }
  }

  render() {
    return (
      <div className="section section-basic" id="basic-elements">
        <img alt="..." className="path" src={require("assets/img/path1.png")} />
        <Container>
		  <h4>Follow these 3 Steps and be on your way to success</h4>
		<ul>
			<li className="text-warning">Lease Land</li>
			<li className="text-warning">Purchase a Seed</li>
			<li className="text-warning">Plant and Care</li>
		</ul>
		<img
                  alt="divider"
                  src={require("assets/img/divider.png")}
                  style={{ width: "full" }}
                />
		  <br/>
		  <br/>
		  <br/>
		  <br/>
		  <br/>
		  <br/>
		  <center><h1 className="title">Step 1,<br/>Lease a plot of land</h1></center>
		  <br/><br/>
          <h2><u>Welcome to Our Leasing Office</u></h2>
		  <br/>
          <p className="category">Below you can find our available leases. <br/>Each Region only has a limited amount
		  of plots available.<br/>If there are no more properties available please visit our Marketplace</p><br />
		  <h3>One Plot Lease: 20 Steem</h3>
		  <br/>
		  <center>
            <Row>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
                <img
                  alt="Afghanistan"
                  className="img-fluid rounded shadow-lg"
                  src={require("assets/img/Afghanistan.png")}
                  style={{ width: "150px" }}
                />
				<Button onClick={() => this.handleLand("a")} className="btn-round" color="success" type="button">
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
				<Button onClick={() => this.handleLand("b")} className="btn-round" color="success" type="button">
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
				<Button onClick={() => this.handleLand("c")} className="btn-round" color="success" type="button">
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
				<Button onClick={() => this.handleLand("d")} className="btn-round" color="success" type="button">
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
				<Button onClick={() => this.handleLand("e")} className="btn-round" color="success" type="button">
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
				<Button onClick={() => this.handleLand("f")} className="btn-round" color="success" type="button">
                Mexico
              </Button>
              </Col>
            </Row>
			</center>
			<br/>
			<br/>
			<ColoredLine color="green" />
			<br/>
			<br/>
          <center><h1 className="title">Step 2,<br/>Purchase a seed</h1></center>
		  <br/><br/>
          <h2><u>Welcome to our Seed Bank</u></h2>
		  <p className="category">Below you can find our available Seeds. <br/><u className="text-danger">One Seed per Plot!</u><br/>This means each seed must have a plot to be planted</p>
		  <br/>
		  <h3>Hand-Picked Seed Cost: 3 Steem <br/>Valued 2250 XP</h3>
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
		  <h3>Premium Seed Cost: 1.5 Steem <br/>Valued 750 XP</h3>          
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
		  <h3>Basic Seed Cost: 0.75 Steem <br/> Valued 1 XP</h3>
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
        </Container>
      </div>
    );
  }
}

export default Basics;
