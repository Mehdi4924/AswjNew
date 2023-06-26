import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import persistedReducer from './reducers/combined';
import {persistStore} from 'redux-persist';
//Create A Store
export const store = createStore(persistedReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
