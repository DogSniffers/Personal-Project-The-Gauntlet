import React from 'react'
import {Bar} from 'react-chartjs-2'

class Chart extends React.Component{
    constructor(){
        super()
        this.state = {
            chartData:{
                labels:['Test','Test2','Test3'],
                datasets:[{
                    label:'TEST',
                    data:[1,2,3,4]
                }],
                backgroundcolor:['rgba(255,99,132,0.6)']
            }

        }
    }

    render(){
        return(
            <div>CHART Component
                <Bar 
                data={this.state.chartData}
                options={{
                    maintainAspectRatio: false}}/>
            </div>
        )
    }
}

export default Chart