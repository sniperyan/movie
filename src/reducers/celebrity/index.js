/**
 * Created by liyan on 2017/1/23.
 */
import * as types from '../../constants/actionTypes';
const initialState = {
    showLoading: false,
    celebrity:{}
}
export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_CELEBRITY:
            if(action.data.celebrity !== undefined){
                //set celebrity
                return Object.assign({}, state, {
                    showLoading: action.data.showLoading,
                    celebrity:action.data.celebrity
                });
            }else {
                // setLoading
                return Object.assign({}, state, {
                    showLoading: action.data.showLoading
                });
            }
        default:
            return state;
    }
}