import steemconnect from "steemconnect";

const api = new steemconnect.Client({
  app: "hive-loginking",
  baseURL: "https://hivesigner.com/",
  callbackURL:
    process.env.REACT_APP_SC_CALLBACK || "http://localhost:3000/callback",
  scope: ["custom_json", "login"]
});

export default api;
