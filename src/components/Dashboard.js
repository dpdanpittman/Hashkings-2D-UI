import React, {useContext, useEffect, useState} from "react";
import {Panel} from "primereact/panel";
import {HashkingsAPI, seedNames} from "../service/HashkingsAPI";
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
    <div className="p-grid p-fluid dashboard bgimgdash">
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">
            <font color="white">HashKings Farmers</font>
          </span>
          <span className="detail">
            <font color="white">Total number of Farmers</font>
          </span>
          <span className="count visitors">{dashboardStats.gardeners}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">
            <font color="white">Total Farms</font>
          </span>
          <span className="detail">
            <font color="white">Number of farms</font>
          </span>
          <span className="count purchases">{dashboardStats.gardens}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">
            <font color="white">Economy</font>
          </span>
          <span className="detail">
            <font color="white">Total Delegated Steem</font>
          </span>
          <span className="count revenue">{dashboardStats.delegation}</span>
        </div>
      </div>

      {username && (
        <>
          <div className="p-col-12 p-md-6 p-xl-4">
            <div className="highlight-box">
              <div
                className="initials"
                style={{backgroundColor: "#007be5", color: "#00448f"}}
              >
                <span>AG</span>
              </div>
              <div className="highlight-details">
                <span>Active Plots</span>
                <span className="count">{dashboardStats.activeGardens}</span>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-6 p-xl-4">
            <div className="highlight-box">
              <div
                className="initials"
                style={{backgroundColor: "#ef6262", color: "#a83d3b"}}
              >
                <span>TS</span>
              </div>
              <div className="highlight-details">
                <span>Total Seeds</span>
                <span className="count">{dashboardStats.availableSeeds}</span>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-6 p-xl-4">
            <div className="highlight-box">
              <div
                className="initials"
                style={{backgroundColor: "#20d077", color: "#038d4a"}}
              >
                <span>EG</span>
              </div>
              <div className="highlight-details ">
                <span>Empty Plots</span>
                <span className="count">{dashboardStats.availableGardens}</span>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-lg-12">
            <Panel
              header="Activity (max 3 actions per farm)"
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
        </>
      )}
      <div className="p-col-12 p-lg-12">
        <DataTable
          value={dashboardStats.leaderboard}
          responsive={true}
          emptyMessage="No users found"
          header="Top Farmers"
          autoLayout={true}
        >
          <Column field="position" header="Position" />
          <Column field="username" header="User" />
          <Column field="xp" header="XP" sortable={true} />
        </DataTable>
      </div>
    </div>
  );
};
