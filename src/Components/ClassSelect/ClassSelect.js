import React from 'react';
import axios from 'axios';
import Combat from '../GameEngine/GameEngine'
import {connect} from 'react-redux'
class TheGauntlet extends React.Component{
    constructor(){
        super()
        this.state = {
            classList:[1,2,3],
            classClick:false,
            classSelected:false,
            userMonsters:false,

            class1Name:'',
            class1Desc:'',
            class1Health:0,
            class1attack1Name:'',
            class1attack1Damage:0,
            class1attack1Type:'',
            class1attack2Name:'',
            class1attack2Damage:0,
            class1attack2Type:'',
            class1weaknesses:'',
            class1resistances:'',

            class2Name:'',
            class2Desc:'',
            class2Health:0,
            class2attack1Name:'',
            class2attack1Damage:0,
            class2attack1Type:'',
            class2attack2Name:'',
            class2attack2Damage:0,
            class2attack2Type:'',
            class2weaknesses:'',
            class2resistances:'',

            class3Name:'',
            class3Desc:'',
            class3Health:0,
            class3attack1Name:'',
            class3attack1Damage:0,
            class3attack1Type:'',
            class3attack2Name:'',
            class3attack2Damage:0,
            class3attack2Type:'',
            class3weaknesses:'',
            class3resistances:'',

            selectedClassName:'',
            selectedClassDesc:'',
            selectedClassHealth:0,
            selectedClassattack1Name:'',
            selectedClassattack1Damage:0,
            selectedClassattack1Type:'',
            selectedClassattack2Name:'',
            selectedClassattack2Damage:'',
            selectedClassattack2Type:'',
            selectedClassWeaknesses:'',
            selectedClassResistances:'',

            playerNameFirst:'First',
            playerNameLast:'Last',
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
                class1weaknesses:this.state.classList[class1].weaknesses,
                class1resistances:this.state.classList[class1].resistances,
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
                class2weaknesses:this.state.classList[class2].weaknesses,
                class2resistances:this.state.classList[class2].resistances,
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
                class3weaknesses:this.state.classList[class3].weaknesses,
                class3resistances:this.state.classList[class3].resistances,
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
            selectedClassWeaknesses: this.state.class1weaknesses,
            selectedClassResistances: this.state.class1resistances
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
            selectedClassWeaknesses: this.state.class2weaknesses,
            selectedClassResistances: this.state.class2resistances
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
            selectedClassWeaknesses: this.state.class3weaknesses,
            selectedClassResistances: this.state.class3resistances
        })
    }
    classConfirm = () => {
        this.setState({classSelected:true})
        let random = Math.floor(Math.random(5))
        let random2 = Math.floor(Math.random(5))
        let random3 = Math.floor(Math.random(5))

    }
    allowUserMonsters = () => {
        this.setState({userMonsters:true})
    }
    dontAllowUserMonsters = () => {
        this.setState({userMonsters:false})
    }


    

    render(){
        return(
            <div>
                {this.state.classSelected === false ?(
                <div>
                <>
                {this.state.userMonsters === false?(
                    <button onClick={this.allowUserMonsters}>Don't Allow User Created Monsters</button>
                    ):(
                    <button onClick={this.dontAllowUserMonsters}>Allow User Created Monsters</button>
                )}
                <h2>Class Select</h2>
                <div className='classes'>
                <p onClick={this.selectedClass1} className='classSelect'>{this.state.class1Name}</p>
                <p onClick={this.selectedClass2} className='classSelect'>{this.state.class2Name}</p>
                <p onClick={this.selectedClass3} className='classSelect'>{this.state.class3Name}</p>
                </div>
            {this.state.classClick === false ? (
                null
            ):(
                <div>
                    <div>
                        <p>Class:{this.state.selectedClassName}</p>
                        <p>Desc:{this.state.selectedClassDesc}</p>
                        <p>Health: {this.state.selectedClassHealth}</p>
                        <p>Resistances: {this.state.selectedClassResistances}</p>
                        <p>Weaknesses: {this.state.selectedClassWeaknesses}</p>
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
                    <Combat health={this.state.selectedClassHealth} className={this.state.selectedClassName} attack1name={this.state.selectedClassattack1Name} attack1damage={this.state.selectedClassattack1Damage} attack1type={this.state.selectedClassattack1Type}  attack2name={this.state.selectedClassattack2Name} attack2damage={this.state.selectedClassattack2Damage} attack2type={this.state.selectedClassattack2Type} weaknesses={this.state.selectedClassWeaknesses} resistances={this.state.selectedClassResistances} reduxState={this.props.reduxState}
                    userMonsters={this.state.userMonsters}></Combat>
                </div>
            )}
        </div>
        )
    }
}
const mapStateToProps = reduxState =>{
    return{
        reduxState
    }
}

export default connect(mapStateToProps)(TheGauntlet)