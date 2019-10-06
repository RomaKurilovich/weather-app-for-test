import React from 'react';
import { connect } from 'react-redux';
import Weather from './Weather';

class WeatherContainer extends React.Component{

    render() {
        return  < Weather {...this.props}/>  
    }
}

let mapStateToProps = (state) => ({
    data: state.data.data,
    coefficient: state.data.coefficient,
    city: state.data.city,
    color: state.data.color,
})

export default connect(mapStateToProps, null)(WeatherContainer);


