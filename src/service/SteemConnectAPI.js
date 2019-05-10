import steemconnect from "steemconnect";

const api = steemconnect.Initialize({
  app: "review.app",
  baseURL: "https://steemconnect.com",
  callbackURL: "http://localhost:3000/callback",
  scope: ["custom_json", "login"]
});

export default api;
