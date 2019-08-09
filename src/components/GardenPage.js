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
        <div className="p-fluid">
          <div className="p-col-12">
            <center>
              <div className="p-col-12">
                <img
                  src="https://i.imgur.com/CR1joah.png"
                  width="450"
                  height="100"
                />
                <div className="p-col-3"></div>
                <div className="p-col-3"></div>
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
          <h1>
              <b>
              <font color="black"></font>
            </b>
          </h1>          
        </div>
        <div className="p-col-3 card-blank-darkbrown">
        <div className="p-grid">
        <center>
          <b>
            <font color="black">Daily Care</font>
          </b>
          </center>          
          <div className="p-col-12">
            <div className="card-blank-darkbrown card-w-title">
              <div className="p-grid">
                <div className="p-col-12">
                  <Button
                    label="Plants"
                    icon="pi pi-external-link"
                    onClick={() => setPlantSeedModal(!plantSeedModal)}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="p-col-12">
            <div className="card-blank-water card-w-title">
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
          <div className="p-col-12">
            <div className="card-blank-nutrients card-w-title">
              <div className="p-grid">
                <div className="p-col-12">
                  <Button label="Prune" icon="pi pi-external-link" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-col-12">
            <div className="card-blank-green card-w-title">
              <div className="p-grid">
                <div className="p-col-12">
                  <Button label="Feed" icon="pi pi-external-link" />
                </div>
              </div>
            </div>
          </div>
        </div>
        </div>
        <div className="p-col-3 card-blank-darkbrown">
        <div className="p-grid">
          <center>
          <b>
            <font color="black">Extended Care</font>
            <font color="red">(Coming Soon)</font>
          </b>
          </center>
          <div className="p-col-12">
            <div className="card-blank-pollen card-w-title">
              <div className="p-grid">
                <div className="p-col-12">
                  <Button label="Check PH" icon="pi pi-external-link" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-col-12">
            <div className="card-blank-red card-w-title">
              <div className="p-grid">
                <div className="p-col-12">
                  <Button label="Fix PH" icon="pi pi-external-link" />
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
        <div className="p-col-3 card-blank-darkbrown">
        <div className="p-grid">
        <center>
        <b>
          <font color="black">Harvest</font>
          <font color="red">(Coming Soon)</font>
        </b>
        </center>
          <div className="p-col-12">
            <div className="card-blank-ph card-w-title">
              <div className="p-grid">
                <div className="p-col-12">
                  <Button label="Coming Soon" icon="pi pi-external-link" />
                </div>
              </div>
            </div>
          </div>
          <div className="p-col-12">
            <div className="card-blank-fixph card-w-title">
              <div className="p-grid">
                <div className="p-col-12">
                  <Button label="Coming Soon" icon="pi pi-external-link" />
                </div>
              </div>
            </div>
          </div>
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
