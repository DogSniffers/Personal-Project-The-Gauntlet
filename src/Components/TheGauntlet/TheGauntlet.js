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
            this.setState({classList:res.data})
            let classListLength = this.state.classList.length
            console.log(classListLength)
            let class1 = Math.floor(Math.random()*classListLength)
            let class2 = Math.floor(Math.random()*classListLength)
            let class3 = Math.floor(Math.random()*classListLength)
            if(class1 === class2){
                if(class2 === classListLength){
                    class2 -= 1
                }else{
                    class2 += 1
                }}
            if(class1 === class3){
                if(class3 === classListLength){
                    class3 -= 1}
                else{
                    class3 += 1
                }}
            if(class2 === class3){
                if(class3 === classListLength){
                    class3 -=2}
                    else{
                        class3+=1
                    }}
            
            console.log(class1, class2, class3)
            
            }
        )
    }

    


    selectedClass1 = () => {
        this.setState({
            classClick:true,
            selectedClassName: this.state.class1Name,
            selectedClassDesc: this.state.class1Desc,
            selectedClassattack1Name: this.state.class1attack1Name,
            selectedClassattack1Damage: this.state.class1attackDamage,
            selectedClassattack1Type: this.state.class1attack1Type,
            selectedClassattack1Cost: this.state.class1attack1Cost,
            selectedClassattack2Name: this.state.class1attack2Name,
            selectedClassattack2Damage: this.state.class1attack2Damage,
            selectedClassattack2Type: this.state.class1attack2Type,
            selectedClassattack2Cost: this.state.class1attack2Cost,
        })
    }

    selectedClass2 = () => {
        this.setState({
            classClick:true,
            selectedClassName: this.state.class2Name,
            selectedClassDesc: this.state.class2Desc,
            selectedClassattack1Name: this.state.class2attack1Name,
            selectedClassattack1Damage: this.state.class2attackDamage,
            selectedClassattack1Type: this.state.class2attack1Type,
            selectedClassattack1Cost: this.state.class2attack1Cost,
            selectedClassattack2Name: this.state.class2attack2Name,
            selectedClassattack2Damage: this.state.class2attack2Damage,
            selectedClassattack2Type: this.state.class2attack2Type,
            selectedClassattack2Cost: this.state.class2attack2Cost,
        })
    }

    selectedClass3 = () => {
        this.setState({
            classClick:true,
            selectedClassName: this.state.class3Name,
            selectedClassDesc: this.state.class3Desc,
            selectedClassattack1Name: this.state.class3attack1Name,
            selectedClassattack1Damage: this.state.class3attackDamage,
            selectedClassattack1Type: this.state.class3attack1Type,
            selectedClassattack1Cost: this.state.class3attack1Cost,
            selectedClassattack2Name: this.state.class3attack2Name,
            selectedClassattack2Damage: this.state.class3attack2Damage,
            selectedClassattack2Type: this.state.class3attack2Type,
            selectedClassattack2Cost: this.state.class3attack2Cost,
        })
    }

    

    render(){
        console.log(this.state.classList)
        return(
            <div>
                {this.state.classSelected === false ?(
                    
                <div>
                <>
            <div onClick={this.selectedClass1}>Class 1</div>
            <div onClick={this.selectedClass2}>Class 2</div>
            <div onClick={this.selectedClass3}>Class 3</div>
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
                <div>Player Div
                    <p>Class Name</p>
                    <p>Class Health</p>
                    <p></p>
                </div>
                <div>Attacks Div</div>
                <div>Monster Div</div>
            </div>
        )
    }
}

export default TheGauntlet