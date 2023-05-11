import axios from "axios";
const instance = axios.create({
  baseURL: "https://api.vimeo.com",
  // timeout: 1000,
  headers: { Authorization: "Bearer 9f104b1c6d604cc910b294c1b924c850" },
});

export default instance;
