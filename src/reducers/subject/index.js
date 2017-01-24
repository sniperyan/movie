/**
 * Created by liyan on 2017/1/22.
 */
import * as types from '../../constants/actionTypes';
const initialState = {
    showLoading: false,
    subject: {}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_SUBJECT:
            if(action.data.subject !== undefined){
                //set subject
                return Object.assign({}, state, {
                    showLoading: action.data.showLoading,
                    subject:action.data.subject
                });
            }else {
                // setLoading
                return Object.assign({}, state, {
                    showLoading: action.data.showLoading
                });
            }
        case types.RESET_SUBJECT:
            return initialState;
        default:
            return state;
    }
}