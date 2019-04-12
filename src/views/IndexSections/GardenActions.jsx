import React, {useState, useEffect} from "react";
import classnames from "classnames";
// cookie components for login
import Cookie from "js-cookie";
import "Login.css";
import "assets/css/GardenActions.css";
import "fetch";
import _ from "lodash";

// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  Progress,
  Container,
  Row,
  Col,
  Modal,
  Button,
  Label,
  Input
} from "reactstrap";

// fancy coloredline, default green
const ColoredLine = ({color}) => (
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

const PayoutColoredLine = ({color}) => (
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

export const gardenNames = {
  a: "Afghanistan",
  b: "Africa",
  c: "Asia",
  d: "Central America",
  e: "Jamaica",
  f: "Mexico"
};

export const seedNames = {
  hk: "Hindu Kush",
  dp: "Durban Poison",
  lb: "Lambs Bread",
  afg: "Afghani",
  lkg: "Lashkar Gah",
  mis: "Mazar i Sharif",
  kbr: "Kings Bread",
  aca: "Acapulco Gold",
  swz: "Swazi Gold",
  kmj: "Kilimanjaro",
  mal: "Malawi",
  pam: "Panama Red",
  cg: "Columbian Gold",
  ach: "Aceh",
  tha: "Thai",
  cht: "Chocolate Thai"
};

class PaginationSection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pills: 1,
      myGarden: {
        addrs: [],
        seeds: [],
        land: []
      },
      plantSeedModal: false,
      waterModal: false
    };
  }

  async componentDidMount() {
    const username = Cookie.get("username");
    if (username) {
      let url = `https://hashkings.herokuapp.com/u/${username}`;
      try {
        const data = await fetch(url).then(results => results.json());
        const land = await fetch(
          `https://hashkings.herokuapp.com/a/${username}`
        ).then(res => res.json());
        this.setState({
          myGarden: {
            ...data,
            land
          }
        });
      } catch {
        Cookie.remove("username");
      }
    }
  }

  toggleTabs = (stateName, index) => {
    this.setState({
      [stateName]: index
    });
  };

  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
    if (!this.state[modalState]) {
      document.getElementById("root").classList.add(["root-modal-open"]);
      document.getElementById("root").classList.remove(["root-modal-closed"]);
    } else {
      document.getElementById("root").classList.remove(["root-modal-open"]);
      document.getElementById("root").classList.add(["root-modal-closed"]);
    }
  };

  render() {
    const userGardens = _.uniq(
      this.state.myGarden.addrs.map(garden => garden[0])
    ).map(id => ({
      id,
      name: gardenNames[id],
      count: this.state.myGarden.addrs.filter(g => g[0] === id).length,
      addrs: this.state.myGarden.addrs.filter(g => g[0] === id)
    }));

    const userSeeds = _.uniqBy(
      this.state.myGarden.seeds,
      seed => seed.strain
    ).map(seed => ({
      id: seed.strain,
      name: seedNames[seed.strain],
      count: this.state.myGarden.seeds.filter(s => s.strain === seed.strain)
        .length
    }));

    let emptyGardens = this.state.myGarden.addrs.filter(
      addr =>
        !this.state.myGarden.land.find(
          l => typeof l === "object" && l.id === addr
        )
    );
    emptyGardens = _.uniqBy(emptyGardens, a => a[0]).map(l => ({
      id: l[0],
      name: gardenNames[l[0]],
      count: emptyGardens.filter(g => g[0] === l[0]).length,
      addrs: emptyGardens.filter(g => g[0] === l[0])
    }));

    return (
      <div className="section section-pagination">
        <img alt="..." className="path" src={require("assets/img/path4.png")} />
        <img
          alt="..."
          className="path path1"
          src={require("assets/img/path5.png")}
        />
        <Container>
          <br />
          <br />
          <center>
            <h1 className="title">
              Step 3,
              <br />
              Work in the Garden
            </h1>
          </center>
          <br />
          <br />
          <h2>
            <u>Welcome to your Garden</u>
          </h2>
          <br />
          <h3>All Actions are Free and earn curation rewards</h3>
          <p className="category">
            Earn XP through your in-game actions
            <br />
            <br />
            Each Action is timed! and the closer to the correct time you water
            and feed etc... the more XP you will receive. Water EVERY 24 hours!
          </p>
          <br />
          <br />
          <center>
            <Row>
              <Col md="4">
                <h2>
                  <font color="red">Payouts (Coming Soon)</font>
                </h2>
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
                  <NavItem className="garden-actions">
                    <NavLink
                      className={classnames({
                        "active show": this.state.pills === 1
                      })}
                      onClick={() => {
                        this.toggleModal("plantSeedModal");
                        this.toggleTabs("pills", 1);
                      }}
                    >
                      <i className="tim-icons icon-atom" />
                      Plant
                    </NavLink>
                  </NavItem>
                  <NavItem className="garden-actions">
                    <NavLink
                      className={classnames({
                        "active show": this.state.pills === 2
                      })}
                      onClick={() => {
                        this.toggleModal("waterModal");
                        this.toggleTabs("pills", 2);
                      }}
                    >
                      <i className="tim-icons icon-tap-02" />
                      Water
                    </NavLink>
                  </NavItem>
                  <NavItem className="garden-actions">
                    <NavLink
                      className={classnames({
                        "active show": this.state.pills === 3
                      })}
                      onClick={() => this.toggleTabs("pills", 3)}
                    >
                      <i className="tim-icons icon-scissors" />
                      Prune (coming soon)
                    </NavLink>
                  </NavItem>
                  <NavItem className="garden-actions">
                    <NavLink
                      className={classnames({
                        "active show": this.state.pills === 4
                      })}
                      onClick={() => this.toggleTabs("pills", 4)}
                    >
                      <i className="tim-icons icon-cart" />
                      Harvest (coming Soon)
                    </NavLink>
                  </NavItem>
                </Nav>
              </Col>
              <Col md="4">
                <h2>Inventory</h2>
                <div>
                  <h4>My Gardens</h4>
                  {userGardens.map((garden, i) => (
                    <h5 key={garden.id}>
                      {garden.count} {garden.name} Plot
                      {garden.count !== 1 ? "s" : ""}
                    </h5>
                  ))}
                  <div>
                    <ColoredLine color="green" />
                  </div>
                </div>
                <div>
                  <h4>My Seeds</h4>
                  {userSeeds.map((seedName, i) => (
                    <h5 key={seedName.id}>
                      {seedName.count} {seedName.name} Seed
                      {seedName.count !== 1 ? "s" : ""}
                    </h5>
                  ))}
                  <ColoredLine color="brown" />
                </div>
                <div>
                  <h4>My Empty Gardens</h4>
                  {emptyGardens.map((gardenName, i) => (
                    <h5 key={gardenName.id}>
                      {gardenName.count} {gardenName.name} Plot
                      {gardenName.count !== 1 ? "s" : ""}
                    </h5>
                  ))}
                  <ColoredLine color="white" />
                </div>
              </Col>
            </Row>
          </center>
          <div className="space-70" />
          <h3 className="mb-4">Daily Progress</h3>
          <Row>
            <Col md="6">
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
          <PlantModal
            isOpen={this.state.plantSeedModal}
            toggleModal={this.toggleModal}
            myGarden={this.state.myGarden}
            emptyGardens={emptyGardens}
            userSeeds={userSeeds}
          />
          <WaterModal
            isOpen={this.state.waterModal}
            toggleModal={this.toggleModal}
            myGarden={this.state.myGarden}
          />
          <br />
        </Container>
      </div>
    );
  }
}

function PlantModal({isOpen, toggleModal, myGarden, emptyGardens, userSeeds}) {
  const [seed, setSeed] = useState();
  const [land, setLand] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSeed();
      setLand();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
    const custom_json_id = "qwoyn_plant";
    const key_type = "posting";
    const custom_JSON = JSON.stringify({
      addr: myGarden.addrs.find(addr => addr[0] === land),
      seed
    });

    try {
      await new Promise((resolve, reject) => {
        return steem_keychain.requestCustomJson(
          [username],
          custom_json_id,
          key_type,
          custom_JSON,
          "Plant your Seed",
          response => {
            if (response.success) {
              resolve(response);
            } else {
              reject();
            }
          }
        );
      });
      toggleModal("plantSeedModal");
    } catch {
      setIsSubmitting(false);
    }
  };

  const ModalContent = () => {
    if (emptyGardens.length === 0) {
      return <p>Sorry, you don't have any empty gardens</p>;
    } else if (myGarden.seeds.length === 0) {
      return <p>Sorry, you don't have any seeds</p>;
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <Label for="seed">Seed</Label>
          <Input
            value={seed}
            onChange={e => setSeed(e.target.value)}
            type="select"
            name="seed"
            id="seed"
            className="plant-select"
          >
            <option>Choose a seed...</option>
            {userSeeds.map((seed, i) => (
              <option value={seed.id} key={seed.id}>
                {seed.name}
              </option>
            ))}
          </Input>
          <Label for="land">Land</Label>
          <Input
            value={land}
            onChange={e => setLand(e.target.value)}
            type="select"
            name="land"
            id="land"
            className="plant-select"
          >
            <option>Choose a land plot...</option>
            {emptyGardens.map((garden, i) => (
              <option value={garden.id} key={i}>
                {garden.name}
              </option>
            ))}
          </Input>
          <Button color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Planting" : "Plant"}
          </Button>
        </form>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal("plantSeedModal")}
      backdrop={true}
    >
      <div className="modal-header justify-content-center">
        <button className="close" onClick={() => toggleModal("plantSeedModal")}>
          <i className="tim-icons icon-simple-remove" />
        </button>
        <h4 className="title title-up">Plant Seed</h4>
      </div>
      <div className="modal-body">
        <p>Please select a seed and plot of land to plant your seed</p>
        <ModalContent />
      </div>
    </Modal>
  );
}

function WaterModal({isOpen, toggleModal, myGarden}) {
  const [garden, setGarden] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setGarden();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const steem_keychain = window.steem_keychain;
    const username = Cookie.get("username");
    const custom_json_id = "qwoyn_water";
    const key_type = "posting";
    const custom_JSON = JSON.stringify({plants: [garden]});

    try {
      await new Promise((resolve, reject) => {
        return steem_keychain.requestCustomJson(
          [username],
          custom_json_id,
          key_type,
          custom_JSON,
          "Water your Plant",
          response => {
            if (response.success) {
              resolve(response);
            } else {
              reject();
            }
          }
        );
      });
      toggleModal("waterModal");
    } catch {
      setIsSubmitting(false);
    }
  };

  const ModalContent = () => {
    const usedGardens = myGarden.land
      .filter(land => typeof land === "object")
      .map(l => ({
        ...l,
        name: gardenNames[l.id[0]]
      }));

    if (usedGardens.length === 0) {
      return <p>Sorry, you don't have any gardens with seeds planted</p>;
    } else {
      return (
        <form onSubmit={handleSubmit}>
          <Input
            value={garden}
            onChange={e => setGarden(e.target.value)}
            type="select"
            name="garden"
            id="garden"
            className="plant-select"
          >
            <option>Choose a garden...</option>
            {usedGardens.map((garden, i) => (
              <option value={garden.id} key={i}>
                {`${garden.name} - ${seedNames[garden.strain]}`}
              </option>
            ))}
          </Input>
          <Button color="primary" disabled={isSubmitting}>
            {isSubmitting ? "Watering" : "Water"}
          </Button>
        </form>
      );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={() => toggleModal("waterModal")}
      backdrop={true}
    >
      <div className="modal-header justify-content-center">
        <button className="close" onClick={() => toggleModal("waterModal")}>
          <i className="tim-icons icon-simple-remove" />
        </button>
        <h4 className="title title-up">Water</h4>
      </div>
      <div className="modal-body">
        <p>Please select a garden to water</p>
        <ModalContent />
      </div>
    </Modal>
  );
}

export default PaginationSection;
