import axios from 'axios';

const AxiosEndPointsConfig = axios.create({
    baseURL: process.env.API2,
});

export default AxiosEndPointsConfig;