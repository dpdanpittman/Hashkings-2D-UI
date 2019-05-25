import React, {useContext, useEffect, useState} from "react";
import {Panel} from "primereact/panel";
import {Chart} from "primereact/chart";
import {HashkingsAPI, seedNames} from "../service/HashkingsAPI";
import {StateContext} from "../App";

export const Dashboard = () => {
  const {username} = useContext(StateContext);
  const [dashboardStats, setDashboardStats] = useState({
    gardeners: 0,
    gardens: 0,
    availableSeeds: 0,
    activeGardens: 0,
    availableGardens: 0,
    activity: [],
    delegation: 0
  });

  const [lineData] = useState({
    labels: ["4-20", "4-21", "4-22", "4-23", "4-24", "4-25", "4-26"],
    datasets: [
      {
        label: "Last Week",
        data: [65, 59, 80, 81, 56, 63, 65],
        fill: false,
        borderColor: "#bf2a2a"
      },
      {
        label: "This Week",
        data: [67, 57, 79, 82, 59, 55, 73],
        fill: false,
        borderColor: "#110adb"
      }
    ]
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
          <span className="title">HashKings Citizens</span>
          <span className="detail">Total number of Citizens</span>
          <span className="count visitors">{dashboardStats.gardeners}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">Total Gardens</span>
          <span className="detail">Number of gardens</span>
          <span className="count purchases">{dashboardStats.gardens}</span>
        </div>
      </div>
      <div className="p-col-12 p-lg-4">
        <div className="card summary">
          <span className="title">Economy</span>
          <span className="detail">Total Delegated Steem</span>
          <span className="count revenue">{dashboardStats.delegation}</span>
        </div>
      </div>

      {username && (
        <>
          <div className="p-col-12 p-md-6 p-xl-3">
            <div className="highlight-box">
              <div
                className="initials"
                style={{backgroundColor: "#007be5", color: "#00448f"}}
              >
                <span>AG</span>
              </div>
              <div className="highlight-details ">
                <span>Active Gardens</span>
                <span className="count">{dashboardStats.activeGardens}</span>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-6 p-xl-3">
            <div className="highlight-box">
              <div
                className="initials"
                style={{backgroundColor: "#ef6262", color: "#a83d3b"}}
              >
                <span>TS</span>
              </div>
              <div className="highlight-details ">
                <span>Total Seeds</span>
                <span className="count">{dashboardStats.availableSeeds}</span>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-6 p-xl-3">
            <div className="highlight-box">
              <div
                className="initials"
                style={{backgroundColor: "#20d077", color: "#038d4a"}}
              >
                <span>EG</span>
              </div>
              <div className="highlight-details ">
                <span>Empty Gardens</span>
                <span className="count">{dashboardStats.availableGardens}</span>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-md-6 p-xl-3">
            <div className="highlight-box">
              <div
                className="initials"
                style={{backgroundColor: "#f9c851", color: "#b58c2b"}}
              >
                <span>WP</span>
              </div>
              <div className="highlight-details ">
                <span>Estimated Steem</span>
                <span className="count">0.896</span>
              </div>
            </div>
          </div>
          <div className="p-col-12 p-lg-8">
            <div className="card">
              <Chart type="line" data={lineData} />
            </div>
          </div>

          <div className="p-col-12 p-lg-4">
            <Panel
              header="Activity (max 3 actions per garden)"
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
    </div>
  );
};
