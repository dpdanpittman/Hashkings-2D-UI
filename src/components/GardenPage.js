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
    availableGardens: [],
    headBlockNum: undefined
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
      <div className="card-blank-light">
        <div className="p-fluid">
          <div className="p-col-12">
			<center>
				<div className="p-col-12">
				<img src="https://i.imgur.com/wab47CT.png" width="450" height="150" />
				</div>
			<h1><b><font color="black">Plant Seeds, Water Plots, Harvest and Care</font></b></h1></center>
          </div>
		  <br/><br/>
          <div className="p-grid">
            <div className="p-col-3" />
            <div className="p-col-6">
              <div className="card-blank-green card-w-title">
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
                width="150"
                height="150"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              />
            </div>
            <div className="p-col-3" />
            <div className="p-col-6">
              <div className="card-blank-green card-w-title">
                <h1>Water your Farm Plots</h1>
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
			<div className="p-col-3">
            </div>
            <div className="p-col-6">
              <div className="card-blank-green card-w-title">
                <h1>Feed your plants(Coming Soon)</h1>
                <div className="p-grid">
                  <div className="p-col-12">
                    <Button
                      label="Coming Soon"
                      icon="pi pi-external-link"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-col-3" />
			<div className="p-col-3" />
            <div className="p-col-6">
              <div className="card-blank-green card-w-title">
                <h1>Prune Leaves(Coming Soon)</h1>
                <div className="p-grid">
                  <div className="p-col-12">
                    <Button
                      label="Coming Soon"
                      icon="pi pi-external-link"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-col-3" />
            <div className="p-col-3" />
          </div><center>
		  <br/><br/><br/>
		  <h2><b><u><font color="black">Pollinate and Harvest</font><font color="red">(Coming Soon)</font></u></b></h2></center>
		  <br/><br/>
		  <div className="p-grid">
			<div className="p-col-3" />
            <div className="p-col-6">
              <div className="card-blank-red card-w-title">
                <h1>Pollinate your buds</h1>
                <div className="p-grid">
                  <div className="p-col-12">
                    <Button
                      label="Coming Soon"
                      icon="pi pi-external-link"
                    />
                  </div>
                </div>
              </div>
            </div>
			<div className="p-col-3" />  
			<div className="p-col-3" />
            <div className="p-col-6">
              <div className="card-blank-red card-w-title">
                <h1>Harvest</h1>
                <div className="p-grid">
                  <div className="p-col-12">
                    <Button
                      label="Coming Soon"
                      icon="pi pi-external-link"
                    />
                  </div>
                </div>
              </div>
            </div>		  
		  </div>
		  <br/><br/><br/>
		  <center>
		  <h2><b><u><font color="black">Extended Care<font color="red">(Coming Soon)</font></font></u></b></h2></center>
		  <br/><br/>
		  <div className="p-grid">
			<div className="p-col-3" />
            <div className="p-col-6">
              <div className="card-blank-gold card-w-title">
                <h1>Check Soil PH</h1>
                <div className="p-grid">
                  <div className="p-col-12">
                    <Button
                      label="Coming Soon"
                      icon="pi pi-external-link"
                    />
                  </div>
                </div>
              </div>
            </div>
			<div className="p-col-3">
              <iframe
                title="dropper"
                src="https://giphy.com/embed/9LXMo1s7RgsZfjvgzA"
                width="150"
                height="150"
                frameBorder="0"
                className="giphy-embed"
                allowFullScreen
              />
			</div>  
			<div className="p-col-3" />
            <div className="p-col-6">
              <div className="card-blank-gold card-w-title">
                <h1>Fix Soil PH</h1>
                <div className="p-grid">
                  <div className="p-col-12">
                    <Button
                      label="Coming Soon"
                      icon="pi pi-external-link"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-col-3" />		  
		  </div>
        </div>
        <div className="p-col-12">
          <div className="card-weedLeft card-w-title">
		  <center><img src="https://i.imgur.com/jctsukU.png" width="200" height="100" /></center>
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
            headBlockNum={user.headBlockNum}
          />
        </div>
      </div>
    );
  }
};