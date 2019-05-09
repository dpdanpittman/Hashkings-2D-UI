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
