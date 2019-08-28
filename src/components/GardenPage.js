import React, {useContext, useState, useEffect, useRef} from "react";
import Button from '@material-ui/core/Button';
import {HashkingsAPI, seedNames} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import PlantModal from "./PlantModal";
import WaterModal from "./WaterModal";
import Inventory from "./Inventory";
import {Panel} from "primereact/panel";
import { DataTable } from "primereact/datatable";
import { ProgressBar } from "primereact/progressbar";
import { Column } from "primereact/column";

export const GardenPage = () => {
  const {username} = useContext(StateContext);
  const payoutsTable = useRef(null);
  const landPurchasesTable = useRef(null);
  const seedPurchasesTable = useRef(null);

  const [dashboardStats, setDashboardStats] = useState({
    gardeners: 0,
    gardens: 0,
    availableSeeds: 0,
    activeGardens: 0,
    availableGardens: 0,
    activity: [],
    delegation: 0,
    leaderboard: []
  });

  const [plantSeedModal, setPlantSeedModal] = useState(false);
  const [waterModal, setWaterModal] = useState(false);
  const [user, setUser] = useState({
    availableSeeds: [],
    activeGardens: [],
    availableGardens: [],
    headBlockNum: undefined
  });

  const [gardens, setGardens] = useState([]);
  const [recentPayouts, setRecentPayouts] = useState([]);
  const [recentLandPurchases, setRecentLandPurchases] = useState([]);
  const [recentSeedPurchases, setRecentSeedPurchases] = useState([]);
  const [oldestId, setOldestId] = useState(-1);
  const [loading, setLoading] = useState(false);
  const [noMoreHistory, setNoMoreHistory] = useState(false);
  const [steemPerVest, setSteemPerVest] = useState(0);
  const [fetchAll, setFetchAll] = useState(false);

  const [oldestDate, setOldestDate] = useState(
    new Date(Date.now()).toDateString()
  );

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

  useEffect(() => {
    hashkingsApi
      .getDashboardStats(username)
      .then(stats => {
        if (username) {
          setDashboardStats(stats);
        } else {
          setDashboardStats({
            ...dashboardStats,
            ...stats
          });
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [username]);

  useEffect(() => {
    if (username) {
      setLoading(true);
      hashkingsApi.getDGPO().then(dgpo => {
        const spv =
          parseFloat(dgpo.total_vesting_fund_steem.split(" ")[0]) /
          parseFloat(dgpo.total_vesting_shares.split(" ")[0]);

        setSteemPerVest(spv);

        Promise.all([
          hashkingsApi
            .getAccountHistory(spv, username, false)
            .then(
              ({
                payouts,
                oldestId,
                stop,
                date,
                landPurchases,
                seedPurchases
              }) => {
                setOldestId(oldestId);
                setRecentPayouts(payouts);
                setRecentLandPurchases(landPurchases);
                setRecentSeedPurchases(seedPurchases);

                if (stop) {
                  setNoMoreHistory(true);
                }

                if (date) {
                  setOldestDate(date);
                }
              }
            ),
          hashkingsApi.getUserGarden(username).then(garden => {
            setGardens(garden.activeGardens);
          })
        ]).then(() => setLoading(false));
      });
    }
  }, [username]);

  function blockTemplate(data) {
    const trx_id = data.trx_id || "0000000000000000000000000000000000000000";

    return (
      <a href={`https://steemd.com/b/${data.block}#${trx_id}`}>{data.block}</a>
    );
  }

  if (!username) {
    return (
      <div className="card-blank-green">
        <div className="p-grid">
        <div className="p-col-3" />
          <div className="p-col-6">
            <center><h1>
              <a href="/login">
              <b>
                <u>Please sign in to see your Farm</u>
              </b></a>
            </h1></center>
            </div>
        </div>
        <div className="p-col-3" />
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
          <h1>
            <b>
              <u><font color="#FFC897">Farming</font></u>
            </b>
          </h1>
        </div>
       <div className="p-col-12">
        <div className="card-blank-green-2">
          <div className="p-grid">
            <div className="p-col-4">
              <center><h2><b><u><font color="#FFC897">Daily</font></u></b></h2></center><br/>
                  <center>
                  <Button
                    variant="contained" 
                    color="primary"
                    onClick={() => setWaterModal(!waterModal)}
                  ><span>Water</span></Button>
                  </center>
                  <br/>
                  <center>
                  <Button
                  variant="contained"
                  color="primary"
                    onClick={() => setPlantSeedModal(!plantSeedModal)}
                  ><span>Plant</span>
                  </Button>
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
<div className="p-col-12">
          <h1>
            <b>
              <u><font color="#FFC897">Recent Activity</font></u>
            </b>
          </h1>
        </div>
<div className="card-blank-sand-3 card-w-title">
<div className="p-col-12 p-lg-12">
            <Panel
              header="Activity (Displays 3 actions per farm)"
              className="activity-log"
            >
              <ul className="activity-list">
                {dashboardStats.activity.map(action => (
                  <li key={action.block}>
                    <div className="count">
                      {action.type.charAt(0).toUpperCase() +
                        action.type.slice(1)}
                    </div>
                    <div className="p-grid">
                      <div className="p-col-6">Plot #</div>
                      <div className="p-col-6">{action.id}</div>
                    </div>
                    <div className="p-grid">
                      <div className="p-col-6">Time</div>
                      <div className="p-col-6">{action.when}</div>
                    </div>
                    <div className="p-grid">
                      <div className="p-col-6">Seed</div>
                      <div className="p-col-6">{seedNames[action.strain]}</div>
                    </div>
                  </li>
                ))}
                {dashboardStats.activity.length === 0 && (
                  <p>No recent activity</p>
                )}
              </ul>
            </Panel>
          </div>
        </div>

        <h1><font color="#FFC897"><b><u>Progress of Active Farms</u></b></font></h1>
        <h3><font color="#FFC897"><b>8 Stages with 14 Substages (1 substage is ~1 day.)</b></font></h3>
        <br/>
        <p><font color="#FFC897">Go from seed to harvest in 8 stages where each Stage has 14 substages and determine
           the age of your cannabis.The progress bars below show you how 
           far along your plants are.</font>
        </p>

          <div className="p-col-12">
            <div className="card-blank-sand-3 card-w-title">
              <DataTable
                value={gardens}
                loading={loading}
                responsive={true}
                emptyMessage="No active farms"
              >
                <Column field="id" header="Plot #" sortable={true} />
                <Column
                  field="strain"
                  header="Strain"
                  sortable={true}
                  body={({ strain }) => seedNames[strain]}
                />
                <Column
                  field="stage"
                  header="Stage out of 8"
                  sortable={true}
                  body={({ stage }) => {
                    return (
                      <ProgressBar
                        value={Math.floor((stage / 8) * 100)}
                        showValue={false}
                      />
                    );
                  }}
                />
                <Column
                  field="substage"
                  header="Substage out of 14"
                  sortable={true}
                  body={({ substage }) => {
                    return (
                      <ProgressBar
                        value={Math.floor((substage / 14) * 100)}
                        showValue={false}
                      />
                    );
                  }}
                />
              </DataTable>
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
