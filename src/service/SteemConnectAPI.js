import steemconnect from "steemconnect";

const api = new steemconnect.Client({
  app: "review.app",
  baseURL: "https://steemconnect.com",
  callbackURL:
    process.env.REACT_SC_CALLBACK || "http://localhost:3000/callback",
  scope: ["custom_json", "login"]
});

export default api;
