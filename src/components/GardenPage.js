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
      <div className="card-blank-brown">
        <div className="p-fluid">
          <div className="p-col-12">
			<center>
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
			<div className="p-col-12">
			  <img src="https://i.imgur.com/CR1joah.png" width="450" height="100" />
		    </div>
			<h1><b><font color="black">Daily and Weekly Care</font></b></h1></center>
          </div>
		  </div>
		  <br/><br/>
          <div className="p-grid">
            <div className="p-col-6">
              <div className="card-blank-darkbrown card-w-title">
                <img src="https://i.imgur.com/rS4kysA.png" width="400" height="75" />
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
            <div className="p-col-6">
              <div className="card-blank-water card-w-title">
                <img src="https://i.imgur.com/SiK2AhU.png" width="400" height="75" />
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
            <div className="p-col-6">
              <div className="card-blank-nutrients card-w-title">
                <img src="https://i.imgur.com/Yfdv2uC.png" width="400" height="75" />
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
            <div className="p-col-6">
              <div className="card-blank-green card-w-title">
                <img src="https://i.imgur.com/pvh6cuj.png" width="400" height="75" />
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
		  <h1><b><font color="black">Pollinate and Harvest</font><font color="red">(Coming Soon)</font></b></h1></center>
		  <br/><br/>
		  <div className="p-grid">
            <div className="p-col-6">
              <div className="card-blank-pollen card-w-title">
			  <img src="https://i.imgur.com/T8JNCZs.png" width="400" height="75" />
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
            <div className="p-col-6">
              <div className="card-blank-red card-w-title">
                <img src="https://i.imgur.com/wHKvHYK.png" width="400" height="75" />
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
		  <h1><b><u><font color="black">Extended Care<font color="red">(Coming Soon)</font></font></u></b></h1></center>
		  <br/><br/>
		  <div className="p-grid">
            <div className="p-col-6">
              <div className="card-blank-ph card-w-title">
                <img src="https://i.imgur.com/1hU0SER.png" width="400" height="75" />
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
            <div className="p-col-6">
              <div className="card-blank-fixph card-w-title">
                <img src="https://i.imgur.com/Cyn3Wdd.png" width="400" height="75" />
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
        <div className="p-col-12">
          <div className="card-weedLeft card-w-title">
		  <center><h1><b><font color="black">Inventory</font></b></h1></center>
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