import axios from "axios";

export default axios.create({
  // The host machine's address and the port mapped from the backend container
  baseURL: "http://localhost:4567" 
});
