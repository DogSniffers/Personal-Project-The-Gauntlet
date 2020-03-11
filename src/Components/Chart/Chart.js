import React from 'react'
import {Bar} from 'react-chartjs-2'
import {connect} from 'react-redux'

class Chart extends React.Component{
    constructor(){
        super()
        this.state = {

        }
    }
    render(){
        return(
            <div>
                <Bar 
                data={this.props.chartData}
                options={{
                    maintainAspectRatio: false}}/>
            </div>
        )
    }
}

const mapStateToProps = reduxState =>{
    return{
        reduxState
    }
}

export default connect(mapStateToProps)(Chart)