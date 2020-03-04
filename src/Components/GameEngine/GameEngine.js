import React from 'react'

class Combat extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            floor:1,
            score:0,

            health:0,
            attack1name:'',
            attack1damage:0,
            attack1type:'',
            attack2name:'',
            attack2damage:0,
            attack2type:'',
            

            combatLog:[],
            costLimit:12,

        }
    }

    componentDidMount(){
        this.setState({health:this.props.health, attack1name:this.props.attack1name, attack1damage:this.props.attack1damage, attack1type:this.props.attack1type, 
        attack2name:this.props.attack2name, attack2damage:this.props.attack2damage, attack2type:this.props.attack1type,  })
    }

    attack1AddAction = () => {
        this.setState({combatLog:[...this.state.combatLog, this.state.attack1name ]})
    }
    attack2AddAction = () => {
        this.setState({combatLog:[...this.state.combatLog, this.state.attack2name ]})
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <h2>Floor:{this.state.floor}</h2>
                <h2>Score:{this.state.score}</h2>
                <p>Health{this.state.health}</p>
                <div className='attacks'>
                    <h2>{this.state.attack1name}</h2>
                    <p>Damage:{this.state.attack1damage}</p>
                    <p>Type:{this.state.attack1type}</p>
                    <button onClick={this.attack1AddAction}>Add Action</button>
                </div>
                <div className='attacks'>
                    <h2>{this.state.attack2name}</h2>
                    <p>Damage:{this.state.attack2damage}</p>
                    <p>Type:{this.state.attack2type}</p>
                    <button onClick={this.attack2AddAction}>Add Action</button>
                </div>
                <div>
                    <h2>Combat Log:</h2>
                    {this.state.combatLog.forEach(() =>{
                        return(
                        <div>{}</div>
                        )
                    })}
                    
                
                
            </div>
        </div>
        )
    }

}

export default Combat