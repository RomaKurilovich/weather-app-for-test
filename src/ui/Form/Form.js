import React, { useState, useEffect } from 'react'
import './../../App.css';


let Form = (props) => {

    const [value, setValue] = useState('');
    const [editMode, setEditMode] = useState(false);
    const [editFontSize, setEditFontSize] = useState(false);
    const [editColorMode, setEditColorMode] = useState(false);

    let updateText = (e) => {
        setValue(e.currentTarget.value)
    }

    let closeSetting = () => {
        setEditColorMode(false);
        setEditFontSize(false);
        setEditMode(false);
    }

    let onGetWeather = () => {
        if (value.trim().length > 0) {
            props.getWeather(value)
            props.setCity(value)
        }
        else {
            props.changeStatus('ERROR');
            props.setErrorMessage('Введите город')
        }
    }
    let setColor = (e) => {
        let color = e.currentTarget.innerText;
        props.changeColor(color)
    }

    return <div className="form" >
        <div className="formSearchAndSetting">
            <div className="searchPath">
                <input placeholder="Введите город" list="cities" className="inputCity" onChange={updateText} value={value} />
                <button onClick={onGetWeather} className="buttonSearch">Найти </button>
                <datalist id="cities">
                    {props.cities.map((c, index) => {
                        return <option key={index} value={c} />
                    })}
                </datalist>
            </div>
            <div className="setting" >
                <div className="settingImg" onClick={() => { setEditMode(!editMode); setEditFontSize(false); setEditColorMode(false); }}>
                    <img alt="setting" src="http://icons.iconarchive.com/icons/pelfusion/long-shadow-media/256/Settings-icon.png"></img>
                </div>
                {editMode && <div className="menuSetting">
                    <div onClick={() => { setEditMode(false); setEditFontSize(true) }}>Изменить размер</div>
                    <div onClick={() => { setEditMode(false); setEditColorMode(true) }}>Изменить цвет текста</div>
                    <div onClick={closeSetting}>выйти</div>
                </div>}
                {editFontSize && <div className="menuSetting">
                    <div onClick={() => props.changeFontSize(0.75)}>75%</div>
                    <div onClick={() => props.changeFontSize(1)}>100%</div>
                    <div onClick={() => props.changeFontSize(1.25)}>125%</div>
                    <div onClick={() => props.changeFontSize(1.50)}>150%</div>
                    <div onClick={closeSetting}>выйти</div>
                </div>}
                {editColorMode && <div className="menuSetting">
                    <div onClick={setColor}>yellow</div>
                    <div onClick={setColor}>violet</div>
                    <div onClick={setColor}>white</div>
                    <div onClick={closeSetting}>выйти</div>
                </div>}
            </div>
            <div className="status">
                {props.status === "ERROR" && <div><img alt="error" src="https://docs.zendframework.com/zend-expressive/images/error.png"></img></div>}
                {props.status === "SUCCESS" && <img alt="success" src="https://cdn4.iconfinder.com/data/icons/colicon/24/checkmark_done_complete-512.png"></img>}
                {props.status === "INPROGRESS" && <img alt="error" src="https://www.avira.com/cache-buster-23424/static/common/images/loading.gif"></img>}
               
            </div>
            {props.status === "ERROR" && <div className="error">
                {props.errorMessage}
            </div>}
            

        </div>
    </div>
}



export default Form;