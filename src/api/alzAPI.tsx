import axios from "axios";

const baseURL = 'https://alzhapp-prb.herokuapp.com/api';

const alzAPI = axios.create({baseURL}); 

export default alzAPI;