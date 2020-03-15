const initialState = {
    color:'green'
}

const SET_COLOR = 'SET_COLOR';

export function setColor(color){
    return{
        type:SET_COLOR,
        payload:color,
    }
}

export default function colorReducer(state=initialState,action){
    const {type,payload} = action
    switch(type){
        case SET_COLOR:
            return{...state, color:payload.color}
        default:
            return state
    }
}