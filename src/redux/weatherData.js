import { API } from "../api/axios-instance";
import { localStorageService } from "../api/localStorageService";

export const statuses = {
    NOT_INITIALIZED: 'NOT_INITIALIZED',
    ERROR: 'ERROR',
    INPROGRESS: 'INPROGRESS',
    SUCCESS: 'SUCCESS',
}

const SET_WEATHER = "WD/SET_WEATHER";
const SET_CITY_FROM_INPUT = "WD/SET_CITY_FROM_INPUT";
const ADD_CITY = "WD/ADD_CITY";
const SET_CITY_FROM_LOCALSTORAGE = 'WD/SET_CITY_FROM_LOCALSTORAGE';
const CHANGE_FONT_SIZE = 'WD/CHANGE_FONT_SIZE';
const CHANGE_COLOR = "WD/CHANGE_COLOR";
const CHANGE_STATUS ="WD/CHANGE_STATUS";
const SET_ERROR_MESSAGE = "WD/SET_ERROR_MESSAGE";

let initialState = {

    coefficient: 1,
    color:'white',
    status: statuses.NOT_INITIALIZED,
    city: '',
    API_KEY: '1ae16df993c07c547ccd1942b3965093',
    cities: [],
    errorMessage: '',
    data: {
        temp: undefined,
        main: null,
        city: null,
        windSpeed: null,
        pressure: null,
        hamidity: null,
        sunrise: null,
        sunset: null,
        nameCity: null,
    },
}

export const setWeather = (temp, main, windSpeed, pressure, hamidity, sunrise, sunset, nameCity) => ({
    type: SET_WEATHER, temp, main, windSpeed, pressure, hamidity, sunrise, sunset, nameCity
});
// add city to localstorege
export const addCity = (city) => ({ type: ADD_CITY, city: city });
//from input city
export const setCity = (value) => ({ type: SET_CITY_FROM_INPUT, value });
//get city from localStorage
export const loadCitiesAC = (cities) => ({ type: SET_CITY_FROM_LOCALSTORAGE, cities });
export const changeFontSize = (coefficient) => ({ type: CHANGE_FONT_SIZE, coefficient});
export const changeColor = (color) => ({ type: CHANGE_COLOR, color});
export const changeStatus = (status) => ({type: CHANGE_STATUS, status});
export const setErrorMessage = (error) => ({type: SET_ERROR_MESSAGE, error});

export const loadCities = () => async (dispatch) => {
    const cities = await localStorageService.loadCities();
    dispatch(loadCitiesAC(cities));
}

const weatherData = (state = initialState, action) => {
    switch (action.type) {
        case SET_WEATHER: {
            let newData = {
                temp: action.temp,
                main: action.main,
                windSpeed: action.windSpeed,
                pressure: action.pressure,
                hamidity: action.hamidity,
                sunrise: action.sunrise,
                sunset: action.sunset,
                nameCity: action.nameCity,
            }
            return { ...state, data: newData }
        }
        case ADD_CITY: {
            return { ...state, cities: [action.city, ...state.cities] }
        }
        case SET_CITY_FROM_LOCALSTORAGE: {
            return { ...state, cities: action.cities }
        }
        case SET_CITY_FROM_INPUT: {
            return { ...state, city: action.value }
        }
        case CHANGE_FONT_SIZE: {
            return { ...state, coefficient: action.coefficient}
        }
        case CHANGE_COLOR: {
            return {...state, color: action.color}
        }
        case CHANGE_STATUS:{
            return{...state, status: action.status}
        }
        case SET_ERROR_MESSAGE:{
            return{...state, errorMessage: action.error}
        }
        default: return state
    }
}

export default weatherData;

export const getWeather = (value) => async (dispatch, getState) => {

    let city = value;
    let cities = getState().data.cities;
    dispatch(changeStatus(statuses.INPROGRESS))

    try {

        const data = await API.getWeatherAPI(value, getState().data.API_KEY);

        dispatch(setWeather(Math.round(data.main.temp - 273), data.weather[0].description, data.wind.speed,
            data.main.pressure, data.main.humidity, convertTimeSun(data.sys.sunrise), convertTimeSun(data.sys.sunset), data.name))

        dispatch(changeStatus(statuses.SUCCESS))

        let checkCity = cities.filter(prevCity => prevCity.toUpperCase() === city.toUpperCase());
        if (checkCity.length === 0) dispatch(addCity(city))

        if (checkCity.length === 0) {
            localStorageService.saveCities(getState().data.cities)
        }
    }
    catch (errorMessage) {
        dispatch(changeStatus(statuses.ERROR))
        dispatch(setErrorMessage(errorMessage))
    }
}

let convertTimeSun = (time) => {
    var date = new Date();
    date.setTime(time);
    let res = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    return res;
}

