import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import PlantModal from "./PlantModal";
import WaterModal from "./WaterModal";
import Inventory from "./Inventory";

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
            <h2><u>Before you begin make sure to purchase seeds and lease garden plots</u></h2>
			<p><b><a href="/market/seedbank">Purchase seeds</a></b></p>
			<p><b><a href="/market/gardenplots">Lease gardens</a></b></p>
			<center>
				<div className="p-col-12">
				<img alt="weed_divider" height="100px" src={require("./weed_divider.png")} />
				</div>
			</center>			
			<h2><b>Planting and watering.</b></h2>
          </div>
          <div className="p-grid">
            <div className="p-col-3" />
            <div className="p-col-6">
              <div className="card-blank card-w-title">
                <h1>Plant seeds</h1>
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
            <img alt="weed_divider" height="100px" src={require("./weed_divider.png")} />
          </div>
        </center>
        <div className="p-col-12">
          <div className="card-weedLeft card-w-title">
            <h1>
              <b>Inventory</b>
            </h1>
            <Inventory user={user} />
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
