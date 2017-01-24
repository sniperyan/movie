/**
 * Created by liyan on 2017/1/19.
 */
import * as types from '../constants/actionTypes';
export function setTab(data) {
    return {
        type: types.SET_TAB,
        data
    };
}