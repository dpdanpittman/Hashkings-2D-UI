import React from "react";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
// cookie components for login
import Cookie from 'js-cookie';

// fancy coloredline, default green
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
  
  // this gathers username and asks steem keychain to send 20.000 Steem to @hashkings in order to purchase land.  
  // the (landType) is entered in the on.click function in render
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
  
  buyBasicSeed = (seedType) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
    const toAccount = "hashkings"
    const amount = "0.750";
    if(steem_keychain && username) {
        steem_keychain.requestTransfer(username, toAccount, amount, seedType, "STEEM", function(response) {
            console.log(response);
        },true);
    }
  }
  
    buyPremiumSeed = (seedType) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
    const toAccount = "hashkings"
    const amount = "1.500";
    if(steem_keychain && username) {
        steem_keychain.requestTransfer(username, toAccount, amount, seedType, "STEEM", function(response) {
            console.log(response);
        },true);
    }
  }
  
    buyHPSeed = (seedType) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
    const toAccount = "hashkings"
    const amount = "3.000";
    if(steem_keychain && username) {
        steem_keychain.requestTransfer(username, toAccount, amount, seedType, "STEEM", function(response) {
            console.log(response);
        },true);
    }
  }
  
  render() {
    return (
      <div className="section section-basic" id="basic-elements">
        <img alt="HashKings Plant" className="path" src={require("assets/img/weedPlant.png")} style={{opacity: "0.2"}} />
		<Container>
		<img alt="weed divider" src={require("assets/img/weed_divider.png")} style={{ width: "60%" }} />
		  <h1>Welcome to Hashkings!</h1>
		  <p>Below we have outlined 3 simple steps for you to get started playing hashkings starting with leasing a plot.</p>
		  <br/>
		  <br/>
		  <h3>Your 2 leasing options.</h3>
		  <ul>
		  <li>1- Delegate 20 Steem to @hashkings and only pay 0.5 Steem for the leasing fee</li>
		  <li>2- Send @hashkings 20 Steem and we will deduct the 0.5 Steem for the leasing fee and power up 19.5 Steem</li>
		  </ul>
		  <br/>
		  <ColoredLine color="green" />
		  <img alt="weed gif" src="https://i.imgur.com/jkLSE.gif" />
		  <br/>
		  <h3>Next, get yourself a seed to plant on your plot</h3>
		  <h4><u>3 Seed types to choose from</u></h4>
		  <ul>
		  <li>1) Choose a Hand-Picked Seed.  These are the best seeds in our seed bank and come with 2250 xp.  For 3 Steem you will be able to purchase one of these top shelf seeds </li>
		  <li>2) Choose a Premium Seed.  Looking to grow get your feet wet and find new traits with these 750 XP seeds for 1.5 Steem</li>
		  <li>3) Choose a Basic Seed.  These seeds come with 1 XP and cost .75 Steem. These seeds are for the casual gardner looking to earn only passive income from their crops</li>
		  </ul>
		  <br/>
		  <ColoredLine color="green" />
		  <br/>
		  <h3>Now get to work in your garden</h3>
		  <h4><u>Please choose from these 2 tasks</u></h4>
		  <ul>
		  <li>1) Plant your seed.</li>
		  <li>2) Water your seed.  You will want to water EVERY 24 HOURS throughout the life of your plant</li>
		  </ul>
		  <br/>
		  <img alt="weed divider" src={require("assets/img/weed_divider.png")} style={{ width: "60%" }} />
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
				<Button onClick={() => this.buyHPSeed("tseed hk")} className="btn-round" color="warning" type="button">
                Hindu Kush
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed afg")} className="btn-round" color="warning" type="button">
                Afghani
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed lkg")} className="btn-round" color="warning" type="button">
                Lashkar Gah
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed mis")} className="btn-round" color="warning" type="button">
                Mazar i Sharif
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed lb")} className="btn-round" color="warning" type="button">
                Lambs Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed kbr")} className="btn-round" color="warning" type="button">
                Kings Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed aca")} className="btn-round" color="warning" type="button">
                Acapulco Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed swz")} className="btn-round" color="warning" type="button">
                Swazi Gold
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed kmj")} className="btn-round" color="warning" type="button">
                Kilimanjaro
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed dp")} className="btn-round" color="warning" type="button">
                Durban Poison
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed mal")} className="btn-round" color="warning" type="button">
                Malawi
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed pam")} className="btn-round" color="warning" type="button">
                Panama Red
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed cg")} className="btn-round" color="warning" type="button">
                Columbian Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed ach")} className="btn-round" color="warning" type="button">
                Aceh
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed tha")} className="btn-round" color="warning" type="button">
                Thai
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyHPSeed("tseed cht")} className="btn-round" color="warning" type="button">
                Chocolate Thai
              </Button>
              </Col>
			</Row>
			<br/>
			<br/>
		  <h3>Premium Seed Cost: 1.5 Steem <br/>Valued 750 XP</h3>          
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed hk")} className="btn-round" color="info" type="button">
                Hindu Kush
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed afg")} className="btn-round" color="info" type="button">
                Afghani
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed lg")} className="btn-round" color="info" type="button">
                Lashkar Gah
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed mis")} className="btn-round" color="info" type="button">
                Mazar i Sharif
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed lb")} className="btn-round" color="info" type="button">
                Lambs Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed kbr")} className="btn-round" color="info" type="button">
                Kings Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed aca")} className="btn-round" color="info" type="button">
                Acapulco Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed swz")} className="btn-round" color="info" type="button">
                Swazi Gold
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed kmj")} className="btn-round" color="info" type="button">
                Kilimanjaro
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed dp")} className="btn-round" color="info" type="button">
                Durban Poison
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed mal")} className="btn-round" color="info" type="button">
                Malawi
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed pam")} className="btn-round" color="info" type="button">
                Panama Red
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed cg")} className="btn-round" color="info" type="button">
                Columbian Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed ach")} className="btn-round" color="info" type="button">
                Aceh
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed tha")} className="btn-round" color="info" type="button">
                Thai
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyPremiumSeed("mseed cht")} className="btn-round" color="info" type="button">
                Chocolate Thai
              </Button>
              </Col>
			</Row>
			<br/>
			<br/>
		  <h3>Basic Seed Cost: 0.75 Steem <br/> Valued 1 XP</h3>
		  			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed hk")} className="btn-round" color="default" type="button">
                Hindu Kush
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed afg")} className="btn-round" color="default" type="button">
                Afghani
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed lg")} className="btn-round" color="default" type="button">
                Lashkar Gah
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed mis")} className="btn-round" color="default" type="button">
                Mazar i Sharif
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed lb")} className="btn-round" color="default" type="button">
                Lambs Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed kbr")} className="btn-round" color="default" type="button">
                Kings Bread
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed aca")} className="btn-round" color="default" type="button">
                Acapulco Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed swz")} className="btn-round" color="default" type="button">
                Swazi Gold
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed kmj")} className="btn-round" color="default" type="button">
                Kilimanjaro
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed dp")} className="btn-round" color="default" type="button">
                Durban Poison
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed mal")} className="btn-round" color="default" type="button">
                Malawi
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed pam")} className="btn-round" color="default" type="button">
                Panama Red
              </Button>
              </Col>
			</Row>
			<Row>
			<Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed cg")} className="btn-round" color="default" type="button">
                Columbian Gold
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed ach")} className="btn-round" color="default" type="button">
                Aceh
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed tha")} className="btn-round" color="default" type="button">
                Thai
              </Button>
              </Col>
			  <Col className="mt-5 mt-sm-0" sm="3" xs="6">
				<Button onClick={() => this.buyBasicSeed("rseed cht")} className="btn-round" color="default" type="button">
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
