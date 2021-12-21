import { createStore, combineReducers } from 'redux';
import reducer from '../reducers';

const rootReducer = combineReducers({ reducer })

const store = createStore(rootReducer, (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__());

export default store;