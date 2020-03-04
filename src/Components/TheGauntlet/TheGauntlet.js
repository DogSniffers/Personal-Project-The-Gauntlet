import React from 'react';
import axios from 'axios';

class TheGauntlet extends React.Component{
    constructor(){
        super()
        this.state = {
            classList:[],
            classClick:false,
            classSelected:false,

            class1Name:'',
            class1Desc:'',
            class1attack1Name:'',
            class1attack1Damage:'',
            class1attack1Type:'',
            class1attack1Cost:0,
            class1attack2Name:'',
            class1attack2Damage:'',
            class1attack2Type:'',
            class1attack2Cost:0,

            class2Name:'',
            class2Desc:'',
            class2attack1Name:'',
            class2attack1Damage:'',
            class2attack1Type:'',
            class2attack1Cost:0,
            class2attack2Name:'',
            class2attack2Damage:'',
            class2attack2Type:'',
            class2attack2Cost:0,

            class3Name:'',
            class3Desc:'',
            class3attack1Name:'',
            class3attack1Damage:'',
            class3attack1Type:'',
            class3attack1Cost:0,
            class3attack2Name:'',
            class3attack2Damage:'',
            class3attack2Type:'',
            class3attack2Cost:0,

            selectedClassName:'',
            selectedClassDesc:'',
            selectedClassattack1Name:'',
            selectedClassattack1Damage:'',
            selectedClassattack1Type:'',
            selectedClassattack1Cost:0,
            selectedClassattack2Name:'',
            selectedClassattack2Damage:'',
            selectedClassattack2Type:'',
            selectedClassattack2Cost:0,


        }
    }
    componentDidMount(){
        axios.get('/api/classes').then(res => {
            this.setState({classList:res.data})}
        )
    }

    


    handleClassClick = () => {
        this.setState({classClick:true})
    }

    render(){
        console.log(this.state.classList)
        return(
            <div>
                {this.state.classSelected === false ?(
                    
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
            ):(
                <div>

                </div>
                )}
                <div>Attacks Div</div>
                <div>Monster Div</div>
            </div>
        )
    }
}

export default TheGauntlet