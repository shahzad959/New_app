export const API_URL = window.location.hostname === "localhost"
  ? "http://localhost:27017"
  : "https://labs-mongo-red-steep-ghost.mongo.databases.labs.skills.network";

console.log("API_URL:", API_URL);