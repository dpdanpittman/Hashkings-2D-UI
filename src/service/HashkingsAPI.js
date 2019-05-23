import axios from "axios";

export class HashkingsAPI {
  baseUrl = "https://hashkings.herokuapp.com/";

  get(suffix) {
    return axios.get(this.baseUrl + suffix).then(res => res.data);
  }

  getUser(username) {
    return this.get(`u/${username}`);
  }

  getUserLand(username) {
    return this.get(`a/${username}`);
  }

  getUserDelegation(username) {
    return this.get(`delegation/${username}`);
  }

  getStats() {
    return this.get("stats");
  }

  getAll() {
    return this.get("");
  }

  getDGPO() {
    return axios
      .post(
        "https://api.steemit.com",
        JSON.stringify({
          id: 0,
          jsonrpc: "2.0",
          method: "condenser_api.get_dynamic_global_properties",
          params: []
        })
      )
      .then(res => res.data.result);
  }

  async getDashboardStats(username = undefined) {
    let requests = [this.getStats(), this.getAll(), this.getDGPO()];

    if (username) {
      const userRequests = [this.getUser(username), this.getUserLand(username)];
      requests = [...requests, ...userRequests];
    }

    const [stats, all, dgpo, user, userLand] = await Promise.all(requests);

    const {ac, bc, cc, dc, ec, fc} = stats.supply.land;

    const gardens = ac + bc + cc + dc + ec + fc;

    const totalDelegation = all.delegations
      .map(delegation => delegation.vests)
      .reduce((prev, current) => prev + current);

    const delegationVestsToSteem = (
      (parseFloat(dgpo.total_vesting_fund_steem.split(" ")[0]) *
        totalDelegation) /
        parseFloat(dgpo.total_vesting_shares.split(" ")[0]) /
        1000000
    ).toFixed(3);

    if (username) {
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

      return {
        gardeners: stats.gardeners,
        gardens,
        availableSeeds: availableSeeds.length,
        activeGardens: activeGardens.length,
        availableGardens: availableGardens.length,
        activity,
        delegation: delegationVestsToSteem
      };
    } else {
      return {
        gardeners: stats.gardeners,
        gardens,
        delegation: delegationVestsToSteem
      };
    }
  }

  async getUserGarden(username) {
    const [user, userLand] = await Promise.all([
      this.getUser(username),
      this.getUserLand(username)
    ]);
    const activeGardens = userLand.filter(land => typeof land === "object");
    const availableGardens = userLand.filter(land => typeof land === "string");
    const availableSeeds = user.seeds || [];

    return {
      activeGardens,
      availableGardens,
      availableSeeds
    };
  }

  userExists(username) {
    return this.getAll().then(all => Object.keys(all.users).includes(username));
  }
}

export const gardenNames = {
  a: "Afghanistan",
  b: "Africa",
  c: "Asia",
  d: "Central America",
  e: "Jamaica",
  f: "Mexico"
};

export const seedNames = {
  hk: "Hindu Kush",
  dp: "Durban Poison",
  lb: "Lambs Bread",
  afg: "Afghani",
  lkg: "Lashkar Gah",
  mis: "Mazar i Sharif",
  kbr: "Kings Bread",
  aca: "Acapulco Gold",
  swz: "Swazi Gold",
  kmj: "Kilimanjaro",
  mal: "Malawi",
  pam: "Panama Red",
  cg: "Colombian Gold",
  ach: "Aceh",
  tha: "Thai",
  cht: "Chocolate Thai"
};

export const seedTypes = {
  reg: {
    num: 750,
    str: "0.750"
  },
  mid: {
    num: 1500,
    str: "1.500"
  },
  top: {
    num: 3000,
    str: "3.000"
  }
};
