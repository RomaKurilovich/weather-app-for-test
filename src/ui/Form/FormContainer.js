import React from 'react';
import Form from './Form';
import { connect } from 'react-redux';
import { getWeather, setCity, loadCities, changeFontSize, changeColor, changeStatus, setErrorMessage } from '../../redux/weatherData';



class FormContainer extends React.Component{

    componentDidMount() {
        this.props.loadCities();
    }
    
    render() {
        return  < Form {...this.props}/>  
    }
}

let mapStateToProps = (state) =>({
    city: state.data.city,
    cities: state.data.cities,
    status: state.data.status,
    errorMessage: state.data.errorMessage,
    })

let mapDispatchToProps = (dispatch) => ({
    getWeather: (value) => { dispatch(getWeather(value)) },
    setCity: (value) => { dispatch(setCity(value)) },
    loadCities: () => { dispatch(loadCities()) },
    changeFontSize: (coefficient) => { dispatch(changeFontSize(coefficient)) },
    changeColor: (color) => {dispatch(changeColor(color))},
    changeStatus: (status) => {dispatch(changeStatus(status))},
    setErrorMessage: (errorMessage) => {dispatch(setErrorMessage(errorMessage))}
    })




export default connect(mapStateToProps, mapDispatchToProps)(FormContainer);