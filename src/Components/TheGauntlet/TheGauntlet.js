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
            selectedClassattack1Damage:0,
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
            // let classListLength = this.state.classList.length
            // let class1 = Math.floor(Math.random()*classListLength)
            // let class2 = Math.floor(Math.random()*classListLength)
            // let class3 = Math.floor(Math.random()*classListLength)
            // if(class1 === class2){
            //     if(class2 === classListLength){
            //         class2 -= 1
            //     }else{
            //         class2 += 1
            //     }}
            // if(class1 === class3){
            //     if(class3 === classListLength){
            //         class3 -= 1}
            //     else{
            //         class3 += 1
            //     }}
            // if(class2 === class3){
            //     if(class3 === classListLength){
            //         class3 -=2}
            //     else{
            //         class3+=1
            //     }}
            let classes = []
            while(classes <4){
                var random = Math.floor(Math.random(this.state.classList.length))
                if(classes.indexOf(random) === -1){
                    classes.push(random)
                }
            }
            let class1 = classes[0]
            let class2 = classes[1]
            let class3 = classes[2]
        this.setState({
                class1Name: this.state.classList[class1].class,
                class1Desc:this.state.classList[class1].desc,
                class1attack1Name:this.state.classList[class1].attack1name,
                class1attack1Damage:this.state.classList[class1].attack1damage,
                class1attack1Type:this.state.classList[class1].attack1type,
                class1attack1Cost:this.state.classList[class1].attack1cost,
                class1attack2Name:this.state.classList[class1].attack2name,
                class1attack2Damage:this.state.classList[class1].attack2damage,
                class1attack2Type:this.state.classList[class1].attack2type,
                class1attack2Cost:this.state.classList[class1].attack2cost,
            })
        this.setState({
                class2Name: this.state.classList[class2].class,
                class2Desc:this.state.classList[class2].desc,
                class2attack1Name:this.state.classList[class2].attack1name,
                class2attack1Damage:this.state.classList[class2].attack1damage,
                class2attack1Type:this.state.classList[class2].attack1type,
                class2attack1Cost:this.state.classList[class2].attack1cost,
                class2attack2Name:this.state.classList[class2].attack2name,
                class2attack2Damage:this.state.classList[class2].attack2damage,
                class2attack2Type:this.state.classList[class2].attack2type,
                class2attack2Cost:this.state.classList[class2].attack2cost,
            })
        this.setState({
                class3Name: this.state.classList[class3].class,
                class3Desc:this.state.classList[class3].desc,
                class3attack1Name:this.state.classList[class3].attack1name,
                class3attack1Damage:this.state.classList[class3].attack1damage,
                class3attack1Type:this.state.classList[class3].attack1type,
                class3attack1Cost:this.state.classList[class3].attack1cost,
                class3attack2Name:this.state.classList[class3].attack2name,
                class3attack2Damage:this.state.classList[class3].attack2damage,
                class3attack2Type:this.state.classList[class3].attack2type,
                class3attack2Cost:this.state.classList[class3].attack2cost,
            })
            console.log(class1,class2,class3)
            
            }
        )
    }

    


    selectedClass1 = () => {
        this.setState({
            classClick:true,
            selectedClassName: this.state.class1Name,
            selectedClassDesc: this.state.class1Desc,
            selectedClassattack1Name: this.state.class1attack1Name,
            selectedClassattack1Damage: this.state.class1attack1Damage,
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
            selectedClassattack1Damage: this.state.class2attack1Damage,
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
            selectedClassattack1Damage: this.state.class3attack1Damage,
            selectedClassattack1Type: this.state.class3attack1Type,
            selectedClassattack1Cost: this.state.class3attack1Cost,
            selectedClassattack2Name: this.state.class3attack2Name,
            selectedClassattack2Damage: this.state.class3attack2Damage,
            selectedClassattack2Type: this.state.class3attack2Type,
            selectedClassattack2Cost: this.state.class3attack2Cost,
        })
    }

    

    render(){
        console.log(this.state)
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
                        <p>Class:{this.state.selectedClassName}</p>
                        <p>Desc:{this.state.selectedClassDesc}</p>
                        <p>Attack 1:{this.state.selectedClassattack1Name}</p>
                        <p>Type:{this.state.selectedClassattack1Type}</p>
                        <p>Damage:{this.state.selectedClassattack1Damage}</p>
                        <p>Attack 2:{this.state.selectedClassattack2Name}</p>
                        <p>Damage:{this.state.selectedClassattack2Damage}</p>
                        <p>Type:{this.state.selectedClassattack2Type}</p>
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