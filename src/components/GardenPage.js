import React, {useContext, useState, useEffect} from "react";
import {Button} from "primereact/button";
import {HashkingsAPI} from "../service/HashkingsAPI";
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
    availableGardens: [],
    headBlockNum: undefined
  });
  const [headBlockNum, setHeadBlockNum] = useState(0);

  const hashkingsApi = new HashkingsAPI();

  useEffect(() => {
    if (username) {
      hashkingsApi.getUserGarden(username).then(garden => {
        const {headBlockNum, ...user} = garden;
        setUser(user);
        setHeadBlockNum(headBlockNum);
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
        <div className="p-col-12">
          <div className="p-col-12">
            <center>
              <div className="p-col-12">
                <center><h1><b>Welcome to the Farm</b></h1></center>
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
              </div>
            </center>
          </div>          
        </div>

        <div className="p-col-3">
          <div className="p-col-12">
            <center>
              <div className="p-col-12">
              <div className="col-3">
                  <Button
                    label="Water"
                    icon="pi pi-external-link"
                    onClick={() => setWaterModal(!waterModal)}
                  />
                </div>
              </div>
            </center>
          </div>          
        </div>

        <div className="p-col-3">
          <div className="p-col-12">
            <center>
              <div className="p-col-12">
              <div className="col-3">
                  <Button
                    label="Plant"
                    icon="pi pi-external-link"
                    onClick={() => setPlantSeedModal(!plantSeedModal)}
                  />
                  <br/>
                  <Button
                    label="Plant"
                    icon="pi pi-external-link"
                    onClick={() => setPlantSeedModal(!plantSeedModal)}
                  />                  
                </div>
              </div>
            </center>
          </div>          
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
          headBlockNum={headBlockNum}
        />
      </div>
    );
  }
};
