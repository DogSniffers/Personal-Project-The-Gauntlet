import {createStore, combineReducers} from 'redux';
import reducer from './reducer';
import colorReducer from './colorReducer'

const rootReducer = combineReducers({
    reducer,
    colorReducer
})

export default createStore(rootReducer);


