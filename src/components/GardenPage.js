import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {HashkingsAPI, gardenNames, seedNames} from "../service/HashkingsAPI";
import _ from "lodash";
import {StateContext} from "../App";
import PlantModal from "./PlantModal";
import WaterModal from "./WaterModal";

export const GardenPage = () => {
  const {username} = useContext(StateContext);

  const [plantSeedModal, setPlantSeedModal] = useState(false);
  const [waterModal, setWaterModal] = useState(false);
  const [user, setUser] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: []
  });

  const hashkingsApi = new HashkingsAPI();

  useEffect(() => {
    if (username) {
      hashkingsApi.getUserGarden(username).then(garden => {
        setUser(garden);
      });
    }
  }, [username]);

  if (!username) {
    return (
      <div className="card-blank">
        <div className="p-fluid">
          <div className="p-col-12">
            <h1>
              <b>
                <u>Please sign in to see your garden</u>
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
                      onClick={() => setPlantSeedModal(!plantSeedModal)}
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
                      onClick={() => setWaterModal(!waterModal)}
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
            <img alt="..." height="100px" src={require("./weed_divider.png")} />
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
                  {_.uniqBy(user.activeGardens, garden => garden.id[0])
                    .map(garden => ({
                      id: garden.id[0],
                      count: user.activeGardens.filter(
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
                  {_.uniqBy(user.availableGardens, garden => garden[0])
                    .map(garden => ({
                      id: garden[0],
                      count: user.availableGardens.filter(
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
                  {_.uniqBy(user.availableSeeds, seed => seed.strain)
                    .map(seed => ({
                      strain: seed.strain,
                      count: user.availableSeeds.filter(
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
            isOpen={plantSeedModal}
            toggleModal={() => setPlantSeedModal(!plantSeedModal)}
            availableGardens={user.availableGardens}
            availableSeeds={user.availableSeeds}
            username={username}
          />
          <WaterModal
            isOpen={waterModal}
            toggleModal={() => setWaterModal(!waterModal)}
            activeGardens={user.activeGardens}
            username={username}
          />
        </div>
      </div>
    );
  }
};
