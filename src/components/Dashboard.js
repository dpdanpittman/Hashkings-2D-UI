import React, {useContext, useEffect, useState} from "react";
import {HashkingsAPI} from "../service/HashkingsAPI";
import {StateContext} from "../App";
import {DataTable} from "primereact/datatable";
import {Column} from "primereact/column";

export const Dashboard = () => {
  const {username} = useContext(StateContext);
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

  const hashkingsApi = new HashkingsAPI();

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

  return (
    <div className="p-grid p-fluid dashboard card-blank-black">
      <div className="p-col-12 p-lg-4 bg-black">
        <div className="card summary">
          <span className="title">
            <font color="DFB17B">HashKings Farmers</font>
          </span>
          <span className="detail">
            <font color="DFB17B">Total number of Farmers</font>
          </span>
          <span className="count visitors">{dashboardStats.gardeners}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-4 bg-black">
        <div className="card summary">
          <span className="title">
            <font color="DFB17B">Active Farms</font>
          </span>
          <span className="detail">
            <font color="DFB17B">Number of farms</font>
          </span>
          <span className="count purchases">{dashboardStats.gardens}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-4 bg-black">
        <div className="card summary">
          <span className="title">
            <font color="DFB17B">Economy</font>
          </span>
          <span className="detail">
            <font color="DFB17B">Total Delegated Steem</font>
          </span>
          <span className="count revenue"><font color="white">{dashboardStats.delegation}</font></span>
        </div>
      </div>

      {username && (
        <>
          <div className="p-col-12 p-lg-12">
            <DataTable
             value={dashboardStats.leaderboard}
             responsive={true}
             emptyMessage="No users found"
             header="Top Farmers"
             autoLayout={true}
            >
            <Column field="position" header="Position" />
            <Column field="username" header="Farmer" />
            <Column field="xp" header="XP" sortable={true} />
            </DataTable>
          </div>
        </>
      )}
    </div>
  );
};
