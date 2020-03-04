import React from 'react'

class Combat extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            health:0,
            attack1name:'',
            attack1damage:0,
            attack1type:'',
            attack1cost:0,
            attack2name:'',
            attack2damage:0,
            attack2type:'',
            attack2cost:0,

        }
    }

    componentDidMount(){
        this.setState({health:this.props.health, attack1name:this.props.attack1name, attack1damage:this.props.attack1damage, attack1type:this.props.attack1type, attack1cost:this.props.attack1cost,
        attack2name:this.props.attack2name, attack2damage:this.props.attack2damage, attack2type:this.props.attack1type, attack2cost:this.props.attack2cost, })
    }

    render(){
        console.log(this.state)
        return(
            <div>
                <p>Health{this.state.health}</p>
                <div className='attacks'>{this.state.attack1name}
                    <p>Damage:{this.state.attack1damage}</p>
                    <p>Type:{this.state.attack1type}</p>
                    <p>Cost:{this.state.attack1cost}</p>
                </div>
                <div className='attacks'>{this.state.attack2name}
                    <p>Damage:{this.state.attack2damage}</p>
                    <p>Type:{this.state.attack2type}</p>
                    <p>Cost:{this.state.attack2cost}</p>
                </div>
            </div>
        )
    }

}

export default Combat