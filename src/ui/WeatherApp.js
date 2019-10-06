import React from 'react';
import './../App.css';
import FormContainer from './Form/FormContainer';
import WeatherContainer from './Weather/WeatherContainer';


let WeatherApp = (props) => {

    return <div className="weatherApp">
         <FormContainer/>
         <WeatherContainer/>
    </div>


}

export default WeatherApp;