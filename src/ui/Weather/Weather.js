import React from 'react'
import './../../App.css';

let Weather = (props) => {

    //adds 0 before time if hours or minutes are less than 10
    let now = new Date();
    let checkTime = (i) => {
        if (i < 10) {
            i = "0" + i;
        }
        return i
    }

    return <div className="weather">
        <div style={{ fontSize: 18 * props.coefficient, color: props.color }}>
            {props.data.temp && <div className="weatherInfo">
                <div className="weatherInfoFirstPath">
                    <span>{props.data.nameCity}</span>
                    <span>{now.toDateString()}</span>
                    <span style={{ fontSize: 30 * props.coefficient }} className="time">{checkTime(now.getHours())}:{checkTime(now.getMinutes())}</span>
                    <span>Скорость ветра: {props.data.windSpeed} м/с</span>
                    <span>Давление: {props.data.pressure}</span>
                </div>
                <div className="weatherInfoSecondPath">
                    <div className="temp">
                        <span style={{ fontSize: 40 * props.coefficient }}>{props.data.temp}°C</span>
                    </div>
                    <div className="sun">
                        <div>    Время восхода солнца: {props.data.sunrise} </div>
                        <div>    Время захода солнца: {props.data.sunset} </div>
                    </div>
                </div>
            </div>}
        </div>
    </div>
}

export default Weather;
