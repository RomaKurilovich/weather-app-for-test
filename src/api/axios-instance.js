import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: 'https://api.openweathermap.org/data/2.5/',
})

export const API = {
    async getWeatherAPI(city, key){
        try{
            const res = await axiosInstance.get(`weather?q=${city}&appid=${key}`)
            return res.data;
        }
        catch(error){
            if (error.response.status === 404){
            return Promise.reject("city not found");
        } else {
            return Promise.reject('some error')
        }
    }
}}