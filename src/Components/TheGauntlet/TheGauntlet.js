import React from 'react';
import axios from 'axios';

class TheGauntlet extends React.Component{
    constructor(){
        super()
        this.state = {
            classList:[],
            classClick:false,


        }
    }
    componentDidMount()
    
    fetchClasses = () => {
        axios.get('/api/classes').then(res => {
            this.setState({classList: res.data})
        })

    }


    handleClassClick = () => {
        this.setState({classClick:true})
    }

    render(){
        return(
            <div>
                <div>
                <>
            <div onClick={this.handleClassClick}>Class 1</div>
            <div onClick={this.handleClassClick}>Class 2</div>
            <div onClick={this.handleClassClick}>Class 3</div>
            {this.state.classClick === false ? (
                null
            ):(
                <div>
                    <div>CLASS
                        <p>Class Name</p>
                        <p>Class Desc</p>
                        <p>Class Attacks</p>
                    </div>
                <button>Confirm?</button>
                </div>
            )
            }
            </>
                </div>
                <div>Attacks Div</div>
                <div>Monster Div</div>
            </div>
        )
    }
}

export default TheGauntlet