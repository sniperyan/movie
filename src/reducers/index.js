/**
 * Created by liyan on 2017/1/19.
 */
import {combineReducers} from 'redux';
import popular from './popular';
import coming from './coming';
import top from './top';
import subject from './subject';
import tabs from './tabs';
import celebrity from './celebrity';
import searchResult from './searchResult';
const reducers = {
    popular,
    coming,
    top,
    subject,
    celebrity,
    searchResult,
    tabs
};
export default combineReducers({
    ...reducers
});