/**
 * Created by liyan on 2017/1/19.
 */
import * as types from '../../constants/actionTypes';
const initialState = {
    tabIndex:0
}

export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_TAB:
            return Object.assign({}, state, {
                tabIndex: action.data
            });
        default:
            return state;
    }
}