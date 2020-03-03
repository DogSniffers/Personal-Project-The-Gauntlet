import React from 'react'
import axios from 'axios'

class Class extends React.Component{
    constructor(){
        super()
        this.state = {
            classList:[],
            classClick:false,

        }
    }

    handleClassClick = () => {
        this.setState({classClick:true})
    }

    render(){
        return(
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
        )
    }
}

export default Class