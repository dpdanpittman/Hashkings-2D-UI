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
  cg: "Columbian Gold",
  ach: "Aceh",
  tha: "Thai",
  cht: "Chocolate Thai"
};
