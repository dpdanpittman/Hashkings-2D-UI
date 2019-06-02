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
			  <img src="https://i.imgur.com/wab47CT.png" width="450" height="150" />
		    </div>
			<h1><b><font color="black">Plant Seeds, Water Plots, Harvest and Care</font></b></h1></center>
          </div>
		  </div>
		  <br/><br/>
          <div className="p-grid">
            <div className="p-col-6">
              <div className="card-blank-darkbrown card-w-title">
                <img src="https://i.imgur.com/XTOvfHc.png" width="400" height="75" />
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
                <img src="https://i.imgur.com/jTd9uqX.png" width="400" height="75" />
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
                <img src="https://i.imgur.com/SmXHjbV.png" width="400" height="75" />
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
                <img src="https://i.imgur.com/nbgWWrh.png" width="400" height="75" />
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
			  <img src="https://i.imgur.com/B5hVUwe.png" width="400" height="75" />
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
                <img src="https://i.imgur.com/ELNOAbz.png" width="400" height="75" />
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
                <img src="https://i.imgur.com/TcVJ8JP.png" width="400" height="75" />
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
                <img src="https://i.imgur.com/xA95PfK.png" width="400" height="75" />
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