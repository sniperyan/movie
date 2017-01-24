/**
 * Created by liyan on 2017/1/19.
 */
import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducers from '../reducers';

export default function configureStore(preloadedState) {
    const store = createStore(
        reducers,
        preloadedState,
        applyMiddleware(thunkMiddleware)
    )
    return store
}