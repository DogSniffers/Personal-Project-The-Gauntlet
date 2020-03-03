const initialState = {
    username:'',
    id:null
}

const GET_USER = 'GET_USER';

export default function reducer(state=initialState,action){
    const {type,payload} = action
    switch(type){
        default:
            return state;
    }
}