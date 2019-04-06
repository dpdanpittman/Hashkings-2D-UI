import React from "react";
import ImageGallery from 'react-image-gallery';
// reactstrap components
import { Dropdown } from 'react-bootstrap';
import "react-image-gallery/styles/css/image-gallery.css";
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

    redeemVoucher = (seedType) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
 	const custom_json_id = "qwoyn_redeem";
	const key_type = "active";
	var custom_JSON = JSON.stringify({type:seedType});
    if(steem_keychain && username) {
		steem_keychain.requestCustomJson(username, custom_json_id, key_type, custom_JSON, "Redeem a seed Voucher", function(response) {
			console.log(response);
		});
    }
  }
  
    delegatorLease = () => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
    const delegatee = "hashkings"
    const amount = "20.000";
	const unit = "SP";
    if(steem_keychain && username) {
		steem_keychain.requestDelegation(username, delegatee, amount, unit, function(response) {
			console.log(response);
		});
    }
    }
	
	delegatedPlot = (landType) => {
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
    const toAccount = "hashkings"
    const amount = "0.500";
    if(steem_keychain && username) {
        steem_keychain.requestTransfer(username, toAccount, amount, landType, "STEEM", function(response) {
            console.log(response);
        },true);
    }
  }
  
  render() {
	  const images = [
      {
        original: 'https://i.imgur.com/F3G7OJ1.png',
        thumbnail: 'https://i.imgur.com/F3G7OJ1l.png',
      },
      {
        original: 'https://i.imgur.com/mEQ9DuD.png',
        thumbnail: 'https://i.imgur.com/mEQ9DuDl.png'
      },
      {
        original: 'https://i.imgur.com/sp1WVnQ.png',
        thumbnail: 'https://i.imgur.com/sp1WVnQl.png'
      },
	  {
        original: 'https://i.imgur.com/HFcvuGs.png',
        thumbnail: 'https://i.imgur.com/HFcvuGst.png'
      },
	  {
        original: 'https://i.imgur.com/46VcHyk.png',
        thumbnail: 'https://i.imgur.com/46VcHykh.png'
      },
	  {
        original: 'https://i.imgur.com/IomdkMf.png',
        thumbnail: 'https://i.imgur.com/IomdkMfl.png'
      },
    ]
    return (
      <div className="section section-basic" id="basic-elements">
        <img alt="HashKings Plant" className="path" src={require("assets/img/weedPlant.png")} style={{opacity: "0.2"}} />
		<Container>
		<center><img alt="weed divider" src={require("assets/img/weed_divider.png")} style={{ width: "60%" }} /></center>
		  <br/>
		  <center><ImageGallery items={images} /></center>
		  <br/>
		  <h2><center>Delegate Steem Power to @hashkings and choose a Garden</center></h2>
		  <h1><center><b><font color="green"><u>20 Steem</u></font></b></center></h1>
		  <br/>
		  <center>
		  <Button onClick={() => this.delegatorLease()} className="btn-round" color="success" type="button">
          Delegate Here
		  </Button>
		  </center>
		  <center>
		  <Dropdown>
		    <Dropdown.Toggle variant="success" id="dropdown-basic">
		    Choose your Garden
		    </Dropdown.Toggle>
			<Dropdown.Menu>
		    <Dropdown.Item onClick={() => this.delegatedPlot("a manage")} className="btn-round" color="warning" type="button">Afghanistan</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.delegatedPlot("b manage")} className="btn-round" color="warning" type="button">Africa</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.delegatedPlot("c manage")} className="btn-round" color="warning" type="button">Asia</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.delegatedPlot("d manage")} className="btn-round" color="warning" type="button">Central America</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.delegatedPlot("e manage")} className="btn-round" color="warning" type="button">Jamaica</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.delegatedPlot("f manage")} className="btn-round" color="warning" type="button">Mexico</Dropdown.Item>
		    </Dropdown.Menu>
		  </Dropdown>
		  </center>	
		  <center><img alt="weed gif" src="https://i.imgur.com/jkLSE.gif" /></center>
		  <center><img alt="weed divider" src={require("assets/img/weed_divider.png")} style={{ width: "60%" }} /></center>
		  <h1><center>Next, get yourself a bag of seeds.</center></h1>
		  <h4><center><u>3 Seed types to choose from</u></center></h4>
		  <h5><u>Hand-Picked Seeds.</u></h5>  
		  <p>These are the best seeds in our seed bank and come with 2250 xp.  For 3 Steem you will be able to purchase one of these top shelf seeds</p>
		  <br/>
		  <h5><u>Premium Seeds.</u></h5> 
		  <p>Looking to grow get your feet wet and find new traits with these 750 XP seeds for 1.5 Steem</p>
		  <br/>
		  <h5><u>Basic Seeds.</u></h5>
		  <p>These seeds come with 1 XP and cost .75 Steem. These seeds are for the casual gardner looking to earn only passive income from their crops</p>
		  <br/>
		  <h4><u>Choose Below</u></h4>
		  <ColoredLine color="green" />
		  <Dropdown>
		    <Dropdown.Toggle variant="warning" id="dropdown-basic">
		    Hand-Picked Seeds
		    </Dropdown.Toggle>
			<Dropdown.Menu>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed hk")} className="btn-round" color="warning" type="button">Hindu Kush</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed afg")} className="btn-round" color="warning" type="button">Afghani</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed lkg")} className="btn-round" color="warning" type="button">Lashkar Gah</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed mis")} className="btn-round" color="warning" type="button">Mazar i Sharif</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed lb")} className="btn-round" color="warning" type="button">Lambs Bread</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed kbr")} className="btn-round" color="warning" type="button">Kings Bread</Dropdown.Item>
			<Dropdown.Item onClick={() => this.buyHPSeed("tseed aca")} className="btn-round" color="warning" type="button">Acapulco Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed swz")} className="btn-round" color="warning" type="button">Swazi Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed kmj")} className="btn-round" color="warning" type="button">Asia</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed dp")} className="btn-round" color="warning" type="button">Durban Poison</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed mal")} className="btn-round" color="warning" type="button">Malawi</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed pam")} className="btn-round" color="warning" type="button">Panama Red</Dropdown.Item>
			<Dropdown.Item onClick={() => this.buyHPSeed("tseed cg")} className="btn-round" color="warning" type="button">Columbian Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed ach")} className="btn-round" color="warning" type="button">Aceh</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed tha")} className="btn-round" color="warning" type="button">Thai</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("tseed cht")} className="btn-round" color="warning" type="button">Chocolate Thai</Dropdown.Item>
		    </Dropdown.Menu>
		  </Dropdown>
		  <h3>Hand-Picked Seed Cost: <font color="green"><b>3 Steem</b></font></h3>
			<ColoredLine color="green" />
			<br/>
			<Dropdown>
		    <Dropdown.Toggle variant="info" id="dropdown-basic">
		    Premium Seeds
		    </Dropdown.Toggle>
			<Dropdown.Menu>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed hk")} className="btn-round" color="warning" type="button">Hindu Kush</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed afg")} className="btn-round" color="warning" type="button">Afghani</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed lkg")} className="btn-round" color="warning" type="button">Lashkar Gah</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed mis")} className="btn-round" color="warning" type="button">Mazar i Sharif</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed lb")} className="btn-round" color="warning" type="button">Lambs Bread</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed kbr")} className="btn-round" color="warning" type="button">Kings Bread</Dropdown.Item>
			<Dropdown.Item onClick={() => this.buyHPSeed("mseed aca")} className="btn-round" color="warning" type="button">Acapulco Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed swz")} className="btn-round" color="warning" type="button">Swazi Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed kmj")} className="btn-round" color="warning" type="button">Asia</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed dp")} className="btn-round" color="warning" type="button">Durban Poison</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed mal")} className="btn-round" color="warning" type="button">Malawi</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed pam")} className="btn-round" color="warning" type="button">Panama Red</Dropdown.Item>
			<Dropdown.Item onClick={() => this.buyHPSeed("mseed cg")} className="btn-round" color="warning" type="button">Columbian Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed ach")} className="btn-round" color="warning" type="button">Aceh</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed tha")} className="btn-round" color="warning" type="button">Thai</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("mseed cht")} className="btn-round" color="warning" type="button">Chocolate Thai</Dropdown.Item>
		    </Dropdown.Menu>
		  </Dropdown>
		  <h3>Premium Seed Cost: <font color="green"><b>1.5 Steem</b></font></h3>  
			<ColoredLine color="green" />
			<br/>
			<Dropdown>
		    <Dropdown.Toggle variant="default" id="dropdown-basic">
		    Basic Seeds
		    </Dropdown.Toggle>
			<Dropdown.Menu>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed hk")} className="btn-round" color="warning" type="button">Hindu Kush</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed afg")} className="btn-round" color="warning" type="button">Afghani</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed lkg")} className="btn-round" color="warning" type="button">Lashkar Gah</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed mis")} className="btn-round" color="warning" type="button">Mazar i Sharif</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed lb")} className="btn-round" color="warning" type="button">Lambs Bread</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed kbr")} className="btn-round" color="warning" type="button">Kings Bread</Dropdown.Item>
			<Dropdown.Item onClick={() => this.buyHPSeed("rseed aca")} className="btn-round" color="warning" type="button">Acapulco Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed swz")} className="btn-round" color="warning" type="button">Swazi Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed kmj")} className="btn-round" color="warning" type="button">Asia</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed dp")} className="btn-round" color="warning" type="button">Durban Poison</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed mal")} className="btn-round" color="warning" type="button">Malawi</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed pam")} className="btn-round" color="warning" type="button">Panama Red</Dropdown.Item>
			<Dropdown.Item onClick={() => this.buyHPSeed("rseed cg")} className="btn-round" color="warning" type="button">Columbian Gold</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed ach")} className="btn-round" color="warning" type="button">Aceh</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed tha")} className="btn-round" color="warning" type="button">Thai</Dropdown.Item>
		    <Dropdown.Item onClick={() => this.buyHPSeed("rseed cht")} className="btn-round" color="warning" type="button">Chocolate Thai</Dropdown.Item>
		    </Dropdown.Menu>
		  </Dropdown>
		  <h3>Basic Seeds Cost: <font color="green"><b>0.75 Steem</b></font></h3>  
			<ColoredLine color="green" />
			<br/>
			<center><img alt="weed divider" src={require("assets/img/weed_divider.png")} style={{ width: "60%" }} /></center>
        </Container>
      </div>
    );
  }
}

export default Basics;
