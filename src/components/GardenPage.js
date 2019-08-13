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
                <u>Please sign in to see your Farm</u>
              </b>
            </h1>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="card-blank-green-1">
        <div className="p-col-12 bg-black">
          <div className="p-col-12 bg-sky">
            <center>
              <div className="p-col-12 bg-sky">
                <center><h1><b><font color="#098819">Welcome to your Farm</font></b></h1></center>
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
       <div className="p-col-12">
        <div className="card-blank-green-2">
          <div className="p-grid">
            <div className="p-col-4">
              <center><h2><b><u><font color="#FFC897">Daily</font></u></b></h2></center><br/>
                  <center>
                  <Button
                    label="Water"
                    icon="pi pi-external-link"
                    onClick={() => setWaterModal(!waterModal)}
                  />
                  </center>
                  <br/>
                  <center>
                  <Button
                    label="Plant"
                    icon="pi pi-external-link"
                    onClick={() => setPlantSeedModal(!plantSeedModal)}
                  />
                  </center>
      </div>
      <div className="p-col-4">
      <center><h2><b><u><font color="#FFC897">Extended (Coming Soon)</font></u></b></h2></center><br/>
                  <center>
                  <Button
                    label="Check PH"
                    icon="pi pi-external-link"
                  />
                  </center>
                  <br/>
                  <center>
                  <Button
                    label="Flush"
                    icon="pi pi-external-link"
                  />
                  </center>
                  <br/>
                  <center>
                        <Button
                          label="Fix PH"
                          icon="pi pi-external-link"
                        />
                  </center>
                  <br/>
                  <center>
                        <Button
                          label="Dry Soil"
                          icon="pi pi-external-link"
                        />
                  </center>	
      </div>
      <div className="p-col-4">
      <center><h2><b><u><font color="#FFC897">Harvest (Coming Soon)</font></u></b></h2></center><br/>
                  <center>
                  <Button
                    label="Chop Plant"
                    icon="pi pi-external-link"
                  />
                  </center>
                  <br/>
                  <center>
                  <Button
                    label="Trim"
                    icon="pi pi-external-link"
                  />
                  </center>
                  <br/>
                  <center>
                        <Button
                          label="Hang Dry"
                          icon="pi pi-external-link"
                        />
                  </center>
                  <br/>
                  <center>
                        <Button
                          label="Pollinate"
                          icon="pi pi-external-link"
                        />
                  </center>	
      </div>
    </div>        
</div>
      <div className="card-blank-black">
      <div className="p-fluid">
        <div className="p-col-12">
          <h1>
            <b>
              <u><font color="#FFC897">Inventory</font></u>
            </b>
          </h1>
        </div>
      </div>
      <div className="p-col-12">
        <div className="card-blank-sand-3 card-w-title">
          <Inventory user={user} />
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
