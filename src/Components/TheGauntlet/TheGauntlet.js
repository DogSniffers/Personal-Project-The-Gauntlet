import React from 'react';
import axios from 'axios';
import Combat from '../GameEngine/GameEngine'
class TheGauntlet extends React.Component{
    constructor(){
        super()
        this.state = {
            classList:[1,2,3],
            classClick:false,
            classSelected:false,

            class1Name:'',
            class1Desc:'',
            class1Health:0,
            class1attack1Name:'',
            class1attack1Damage:0,
            class1attack1Type:'',
            class1attack2Name:'',
            class1attack2Damage:0,
            class1attack2Type:'',

            class2Name:'',
            class2Desc:'',
            class2Health:0,
            class2attack1Name:'',
            class2attack1Damage:0,
            class2attack1Type:'',
            class2attack2Name:'',
            class2attack2Damage:0,
            class2attack2Type:'',

            class3Name:'',
            class3Desc:'',
            class3Health:0,
            class3attack1Name:'',
            class3attack1Damage:0,
            class3attack1Type:'',
            class3attack2Name:'',
            class3attack2Damage:0,
            class3attack2Type:'',

            selectedClassName:'',
            selectedClassDesc:'',
            selectedClassHealth:0,
            selectedClassattack1Name:'',
            selectedClassattack1Damage:0,
            selectedClassattack1Type:'',
            selectedClassattack2Name:'',
            selectedClassattack2Damage:'',
            selectedClassattack2Type:'',

            playerNameFirst:'TestFirst',
            playerNameLast:'TestLast',
            playerNameNumeral:'III'


        }
    }
    componentDidMount(){
        axios.get('/api/classes').then(res => {
            this.setState({classList:res.data})
            
            let classes = []
            while(classes.length < 3){
                var random = Math.floor(Math.random() * this.state.classList.length)
                if(classes.indexOf(random) === -1){
                    classes.push(random)
                }
                // console.log(classes)
            }
            let class1 = classes[0]
            let class2 = classes[1]
            let class3 = classes[2]
        this.setState({
                class1Name: this.state.classList[class1].class,
                class1Desc:this.state.classList[class1].desc,
                class1Health:this.state.classList[class1].health,
                class1attack1Name:this.state.classList[class1].attack1name,
                class1attack1Damage:this.state.classList[class1].attack1damage,
                class1attack1Type:this.state.classList[class1].attack1type,
                class1attack2Name:this.state.classList[class1].attack2name,
                class1attack2Damage:this.state.classList[class1].attack2damage,
                class1attack2Type:this.state.classList[class1].attack2type,
            })
        this.setState({
                class2Name: this.state.classList[class2].class,
                class2Desc:this.state.classList[class2].desc,
                class2Health:this.state.classList[class2].health,
                class2attack1Name:this.state.classList[class2].attack1name,
                class2attack1Damage:this.state.classList[class2].attack1damage,
                class2attack1Type:this.state.classList[class2].attack1type,
                class2attack2Name:this.state.classList[class2].attack2name,
                class2attack2Damage:this.state.classList[class2].attack2damage,
                class2attack2Type:this.state.classList[class2].attack2type,
            })
        this.setState({
                class3Name: this.state.classList[class3].class,
                class3Desc:this.state.classList[class3].desc,
                class3Health:this.state.classList[class3].health,
                class3attack1Name:this.state.classList[class3].attack1name,
                class3attack1Damage:this.state.classList[class3].attack1damage,
                class3attack1Type:this.state.classList[class3].attack1type,
                class3attack2Name:this.state.classList[class3].attack2name,
                class3attack2Damage:this.state.classList[class3].attack2damage,
                class3attack2Type:this.state.classList[class3].attack2type,
            })
            // console.log(class1,class2,class3)
            
            }
        )
    }

    


    selectedClass1 = () => {
        this.setState({
            classClick:true,
            selectedClassName: this.state.class1Name,
            selectedClassDesc: this.state.class1Desc,
            selectedClassHealth: this.state.class1Health,
            selectedClassattack1Name: this.state.class1attack1Name,
            selectedClassattack1Damage: this.state.class1attack1Damage,
            selectedClassattack1Type: this.state.class1attack1Type,
            selectedClassattack2Name: this.state.class1attack2Name,
            selectedClassattack2Damage: this.state.class1attack2Damage,
            selectedClassattack2Type: this.state.class1attack2Type,
        })
    }

    selectedClass2 = () => {
        this.setState({
            classClick:true,
            selectedClassName: this.state.class2Name,
            selectedClassDesc: this.state.class2Desc,
            selectedClassHealth: this.state.class2Health,
            selectedClassattack1Name: this.state.class2attack1Name,
            selectedClassattack1Damage: this.state.class2attack1Damage,
            selectedClassattack1Type: this.state.class2attack1Type,
            selectedClassattack2Name: this.state.class2attack2Name,
            selectedClassattack2Damage: this.state.class2attack2Damage,
            selectedClassattack2Type: this.state.class2attack2Type,
        })
    }

    selectedClass3 = () => {
        this.setState({
            classClick:true,
            selectedClassName: this.state.class3Name,
            selectedClassDesc: this.state.class3Desc,
            selectedClassHealth: this.state.class3Health,
            selectedClassattack1Name: this.state.class3attack1Name,
            selectedClassattack1Damage: this.state.class3attack1Damage,
            selectedClassattack1Type: this.state.class3attack1Type,
            selectedClassattack2Name: this.state.class3attack2Name,
            selectedClassattack2Damage: this.state.class3attack2Damage,
            selectedClassattack2Type: this.state.class3attack2Type,
        })
    }
    classConfirm = () => {
        this.setState({classSelected:true})
    }

    

    render(){
        // console.log(this.state)
        return(
            <div>
                {this.state.classSelected === false ?(
                    
                <div>
                <>
                <div onClick={this.selectedClass1}>{this.state.class1Name}</div>
                <div onClick={this.selectedClass2}>{this.state.class2Name}</div>
                <div onClick={this.selectedClass3}>{this.state.class3Name}</div>
            {this.state.classClick === false ? (
                null
            ):(
                <div>
                    <div>CLASS
                        <p>Class:{this.state.selectedClassName}</p>
                        <p>Desc:{this.state.selectedClassDesc}</p>
                        <p>Health: {this.state.selectedClassHealth}</p>
                        <p>Attack 1:{this.state.selectedClassattack1Name}</p>
                        <p>Type:{this.state.selectedClassattack1Type}</p>
                        <p>Damage:{this.state.selectedClassattack1Damage}</p>
                        <p>Attack 2:{this.state.selectedClassattack2Name}</p>
                        <p>Damage:{this.state.selectedClassattack2Damage}</p>
                        <p>Type:{this.state.selectedClassattack2Type}</p>
                    </div>
                <button onClick={this.classConfirm}>Confirm?</button>
                </div>
            )
            }
            </>
                </div>
            ):(
                <div>
                    <h1>{this.state.playerNameFirst} {this.state.playerNameLast} the {this.state.playerNameNumeral}</h1>
                    {/* I'm going to want to pass down the selected Class Health, attacks and Damage as props down into the Combat Component
                    Everything here is temporary for nao */}
                    <p>{this.state.selectedClassName}</p>
                    <Combat health={this.state.selectedClassHealth} attack1name={this.state.selectedClassattack1Name} attack1damage={this.state.selectedClassattack1Damage} attack1type={this.state.selectedClassattack1Type}  attack2name={this.state.selectedClassattack2Name} attack2damage={this.state.selectedClassattack2Damage} attack2type={this.state.selectedClassattack2Type}></Combat>
                </div>
            )}
        </div>
        )
    }
}

export default TheGauntlet