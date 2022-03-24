import axios from "axios";
import AsyncStorage from '@react-native-async-storage/async-storage';

const baseURL = 'https://alzhapp-prb.herokuapp.com/api';

const alzAPIH = axios.create({baseURL});

alzAPIH.interceptors.request.use(
    async(config:any)=>
    {
        const token = await AsyncStorage.getItem('token');
        if(token){
            config.headers['x-token'] = token;
        }
        return config;
    }
) 
export default alzAPIH;