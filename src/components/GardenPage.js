import React, {Component, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {Dialog} from "primereact/dialog";
import {HashkingsAPI, gardenNames, seedNames} from "../service/HashkingsAPI";
import Cookie from "js-cookie";
import {Dropdown} from "primereact/dropdown";
import _ from "lodash";

export class GardenPage extends Component {
  constructor() {
    super();
    this.state = {
      cities: [
        {name: "New York", code: "NY"},
        {name: "Rome", code: "RM"},
        {name: "London", code: "LDN"},
        {name: "Istanbul", code: "IST"},
        {name: "Paris", code: "PRS"}
      ],
      city: "",
      plantSeedModal: false,
      waterModal: false,
      user: {
        availableSeeds: [],
        activeGardens: [],
        availableGardens: [],
        username: "",
        loaded: false
      }
    };

    this.hashkingsApi = new HashkingsAPI();
  }

  async componentDidMount() {
    const username = Cookie.get("username");
    if (username) {
      const user = await this.hashkingsApi.getUser(username);
      if (user) {
        const userLand = await this.hashkingsApi.getUserLand(username);
        if (userLand) {
          const activeGardens = userLand.filter(
            land => typeof land === "object"
          );
          const availableGardens = userLand.filter(
            land => typeof land === "string"
          );
          const availableSeeds = user.seeds;
          this.setState({
            user: {
              availableSeeds,
              activeGardens,
              availableGardens,
              username,
              loaded: true
            }
          });
        }
      } else {
        this.setState({
          user: {
            loaded: true
          }
        });
      }
    } else {
      this.setState({
        user: {
          loaded: true
        }
      });
    }
  }

  toggleModal = modalState => {
    this.setState({
      [modalState]: !this.state[modalState]
    });
  };

  render() {
    if (!this.state.user.username) {
      return (
        <div className="card-blank">
          <div className="p-fluid">
            <div className="p-col-12">
              <h1>
                <b>
                  <u>
                    {this.state.user.loaded
                      ? "Please sign in to see your garden"
                      : "Loading your garden"}
                  </u>
                </b>
              </h1>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div className="card-blank">
          <div className="p-fluid">
            <div className="p-col-12">
              <h1>
                <b>
                  <u>Welcome to your Garden</u>
                </b>
              </h1>
              <br />
              <p>Here is where you will perform all your Garden Actions</p>
            </div>
            <div className="p-grid">
              <div className="p-col-3" />
              <div className="p-col-6">
                <div className="card-blank card-w-title">
                  <h1>Plant a Seed</h1>
                  <div className="p-grid">
                    <div className="p-col-12">
                      <Button
                        label="Plant"
                        icon="pi pi-external-link"
                        onClick={() => this.toggleModal("plantSeedModal")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-col-3">
                <iframe
                  title="sun giphy"
                  src="https://giphy.com/embed/L08sJsg6tEUyb1E0VW"
                  width="100"
                  height="100"
                  frameBorder="0"
                  className="giphy-embed"
                  allowFullScreen
                />
              </div>
              <div className="p-col-3" />
              <div className="p-col-6">
                <div className="card-blank card-w-title">
                  <h1>Water your Garden</h1>
                  <div className="p-grid">
                    <div className="p-col-12">
                      <Button
                        label="Water"
                        icon="pi pi-external-link"
                        onClick={() => this.toggleModal("waterModal")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-col-3" />
            </div>
          </div>
          <center>
            <div className="p-col-12">
              <img
                alt="..."
                height="100px"
                src={require("./weed_divider.png")}
              />
            </div>
          </center>
          <div className="p-col-12">
            <div className="card-weedLeft card-w-title">
              <h1>
                <b>Inventory</b>
              </h1>
              <div className="p-grid">
                <div className="card p-col-3 card-margin">
                  <h3>
                    <u>Active Gardens</u>
                    {_.uniqBy(
                      this.state.user.activeGardens,
                      garden => garden.id[0]
                    )
                      .map(garden => ({
                        id: garden.id[0],
                        count: this.state.user.activeGardens.filter(
                          agarden => agarden.id[0] === garden.id[0]
                        ).length
                      }))
                      .map(garden => (
                        <p key={garden.id}>
                          {garden.count} {gardenNames[garden.id]} Plot
                          {garden.count !== 1 ? "s" : ""}
                        </p>
                      ))}
                  </h3>
                </div>
                <div className="card p-col-3 card-margin">
                  <h3>
                    <u>Available Gardens</u>
                    {_.uniqBy(
                      this.state.user.availableGardens,
                      garden => garden[0]
                    )
                      .map(garden => ({
                        id: garden[0],
                        count: this.state.user.availableGardens.filter(
                          agarden => agarden[0] === garden[0]
                        ).length
                      }))
                      .map(garden => (
                        <p key={garden.id}>
                          {garden.count} {gardenNames[garden.id]} Plot
                          {garden.count !== 1 ? "s" : ""}
                        </p>
                      ))}
                  </h3>
                </div>
                <div className="card p-col-3 card-margin">
                  <h3>
                    <u>Available Seeds</u>
                    {_.uniqBy(
                      this.state.user.availableSeeds,
                      seed => seed.strain
                    )
                      .map(seed => ({
                        strain: seed.strain,
                        count: this.state.user.availableSeeds.filter(
                          aseed => aseed.strain === seed.strain
                        ).length
                      }))
                      .map(seed => (
                        <p key={seed.strain}>
                          {seed.count} {seedNames[seed.strain]} Seed
                          {seed.count !== 1 ? "s" : ""}
                        </p>
                      ))}
                  </h3>
                </div>
              </div>
            </div>
            <div className="p-col-12">
              <h2>Grow Timer (Coming Soon)</h2>
            </div>
            <PlantModal
              isOpen={this.state.plantSeedModal}
              toggleModal={this.toggleModal}
              availableGardens={this.state.user.availableGardens}
              availableSeeds={this.state.user.availableSeeds}
              username={this.state.user.username}
            />
            <WaterModal
              isOpen={this.state.waterModal}
              toggleModal={this.toggleModal}
              activeGardens={this.state.user.activeGardens}
              username={this.state.user.username}
            />
          </div>
        </div>
      );
    }
  }
}

function PlantModal({
  isOpen,
  toggleModal,
  availableGardens,
  availableSeeds,
  username
}) {
  const [seed, setSeed] = useState();
  const [garden, setGarden] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setSeed();
      setGarden();
      setIsSubmitting(false);
    }
  }, [isOpen]);

  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    const steem_keychain = window.steem_keychain;
    const custom_json_id = "qwoyn_plant";
    const key_type = "posting";
    const custom_JSON = JSON.stringify({
      addr: garden.id,
      seed: seed.strain
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

  return (
    <>
      <Dialog
        header="Plant a Seed"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500}}
        onHide={() => toggleModal("plantSeedModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="plantSeedModal"
      >
        {availableGardens.length === 0 && (
          <p>Sorry, you don't have any available gardens</p>
        )}
        {availableSeeds.length === 0 && <p>Sorry, you don't have any seeds</p>}
        {availableGardens.length > 0 && availableSeeds.length > 0 && (
          <form onSubmit={handleSubmit}>
            <label htmlFor="seed">Seed</label>
            <Dropdown
              optionLabel="name"
              value={seed}
              id="seed"
              options={_.uniqBy(availableSeeds, seed => seed.strain).map(
                seed => ({...seed, name: seedNames[seed.strain]})
              )}
              style={{width: "100%"}}
              onChange={e => {
                setSeed(e.value);
              }}
              placeholder="Choose a seed..."
            />
            <label htmlFor="garden">Garden</label>
            <Dropdown
              optionLabel="name"
              id="garden"
              value={garden}
              options={_.uniqBy(availableGardens, garden => garden[0]).map(
                garden => ({id: garden, name: gardenNames[garden[0]]})
              )}
              style={{width: "100%"}}
              onChange={e => {
                setGarden(e.value);
              }}
              placeholder="Choose a garden..."
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Planting" : "Plant"}
              onClick={handleSubmit}
            />
          </form>
        )}
      </Dialog>
    </>
  );
}

function WaterModal({isOpen, toggleModal, activeGardens, username}) {
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
    const custom_json_id = "qwoyn_water";
    const key_type = "posting";
    const custom_JSON = JSON.stringify({plants: [garden.id]});

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

  return (
    <>
      <Dialog
        header="Water your Garden"
        visible={isOpen}
        modal={true}
        style={{width: "50vw", maxWidth: 500}}
        onHide={() => toggleModal("waterModal")}
        closeOnEscape={true}
        dismissableMask={true}
        id="waterModal"
      >
        {activeGardens.length === 0 ? (
          <p>Sorry, you don't have any active gardens</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="garden">Garden</label>
            <Dropdown
              optionLabel="name"
              id="garden"
              value={garden}
              options={_.uniqBy(activeGardens, garden => garden.id[0]).map(
                garden => ({...garden, name: gardenNames[garden.id[0]]})
              )}
              style={{width: "100%"}}
              onChange={e => {
                setGarden(e.value);
              }}
              placeholder="Choose a garden..."
            />
            <Button
              disabled={isSubmitting}
              label={isSubmitting ? "Watering" : "Water"}
              onClick={handleSubmit}
            />
          </form>
        )}
      </Dialog>
    </>
  );
}
