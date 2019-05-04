import React, {Component} from "react";
import {CarService} from "../service/CarService";
import {Panel} from "primereact/panel";
import {Chart} from "primereact/chart";
import {HashkingsAPI, seedNames} from "../service/HashkingsAPI";
import Cookie from "js-cookie";

export class Dashboard extends Component {
  constructor() {
    super();
    this.state = {
      username: Cookie.get("username"),
      stats: {
        gardeners: 0,
        gardens: 0,
        availableSeeds: 0,
        activeGardens: 0,
        availableGardens: 0,
        activity: [],
        delegation: 0
      },
      tasks: [],
      city: null,
      selectedCar: null,
      lineData: {
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
      }
    };

    this.onTaskChange = this.onTaskChange.bind(this);
    this.onCityChange = this.onCityChange.bind(this);
    this.carservice = new CarService();
    this.hashkingsApi = new HashkingsAPI();
  }

  onTaskChange(e) {
    let selectedTasks = [...this.state.tasks];
    if (e.checked) selectedTasks.push(e.value);
    else selectedTasks.splice(selectedTasks.indexOf(e.value), 1);

    this.setState({tasks: selectedTasks});
  }

  onCityChange(e) {
    this.setState({city: e.value});
  }

  async componentDidMount() {
    try {
      const username = this.state.username;
      const [stats, user, userLand, all, dgpo] = await Promise.all([
        this.hashkingsApi.getStats(),
        this.hashkingsApi.getUser(username),
        this.hashkingsApi.getUserLand(username),
        this.hashkingsApi.getAll(),
        this.hashkingsApi.getDGPO()
      ]);

      const {ac, bc, cc, dc, ec, fc} = stats.supply.land;

      const gardens = ac + bc + cc + dc + ec + fc;

      const activeGardens = userLand.filter(land => typeof land === "object");
      const availableGardens = userLand.filter(
        land => typeof land === "string"
      );
      const availableSeeds = user.seeds;

      const watered = activeGardens
        .map(garden =>
          garden.care
            .filter(care => care[1] === "watered")
            .map(watered => ({
              block: watered[0],
              id: garden.id,
              strain: garden.strain,
              type: "watered"
            }))
        )
        .flat();
      const planted = activeGardens.map(garden => ({
        id: garden.id,
        strain: garden.strain,
        block: garden.planted,
        type: "planted"
      }));

      const activity = [...planted, ...watered]
          .sort((a, b) => b.block - a.block)
          .slice(0, 4);

      const delegationVestsToSteem = (
        (parseFloat(dgpo.total_vesting_fund_steem.split(" ")[0]) *
          totalDelegation) /
        parseFloat(dgpo.total_vesting_shares.split(" ")[0]) /
        1000000 + 3500
      ).toFixed(3);

      this.setState({
        stats: {
          gardeners: stats.gardeners,
          gardens,
          availableSeeds: availableSeeds.length,
          activeGardens: activeGardens.length,
          availableGardens: availableGardens.length,
          activity,
          delegation: delegationVestsToSteem
        }
      });
    } catch {}
  }

  render() {
    return (
      <div className="p-grid p-fluid dashboard bgimgdash">
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">HashKings Citizens</span>
            <span className="detail">Total number of Citizens</span>
            <span className="count visitors">{this.state.stats.gardeners}</span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Total Gardens</span>
            <span className="detail">Number of gardens</span>
            <span className="count purchases">{this.state.stats.gardens}</span>
          </div>
        </div>
        <div className="p-col-12 p-lg-4">
          <div className="card summary">
            <span className="title">Economy</span>
            <span className="detail">Total Delegated Steem</span>
            <span className="count revenue">
              {this.state.stats.delegation}
            </span>
          </div>
        </div>

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
              <span className="count">{this.state.stats.activeGardens}</span>
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
              <span className="count">{this.state.stats.availableSeeds}</span>
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
              <span className="count">{this.state.stats.availableGardens}</span>
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
            <Chart type="line" data={this.state.lineData} />
          </div>
        </div>

        <div className="p-col-12 p-lg-4">
          <Panel header="Activity" style={{height: "100%"}}>
            <ul className="activity-list">
              {this.state.stats.activity.map(action => (
                <li key={action.block}>
                  <div className="count">
                    {action.type.charAt(0).toUpperCase() + action.type.slice(1)}
                  </div>
                  <div className="p-grid">
                    <div className="p-col-6">Plot #</div>
                    <div className="p-col-6">{action.id}</div>
                  </div>
                  <div className="p-grid">
                    <div className="p-col-6">Block #</div>
                    <div className="p-col-6">{action.block}</div>
                  </div>
                  <div className="p-grid">
                    <div className="p-col-6">Seed</div>
                    <div className="p-col-6">{seedNames[action.strain]}</div>
                  </div>
                </li>
              ))}
            </ul>
          </Panel>
        </div>
      </div>
    );
  }
}
