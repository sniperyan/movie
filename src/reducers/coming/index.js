/**
 * Created by liyan on 2017/1/22.
 */
import * as types from '../../constants/actionTypes';
const initialState = {
    showLoading: false,
    hasMore: true,
    start: 0,
    films: []
}
export default function (state = initialState, action) {
    switch (action.type) {
        case types.SET_COMING:
            if(action.data.hasMore !== undefined && action.data.start!== undefined){
                //has more data 都有值
                return Object.assign({}, state, {
                    showLoading: action.data.showLoading,
                    hasMore: action.data.hasMore,
                    start: action.data.start,
                    films: [
                        ...state.films,
                        ...action.data.films
                    ]
                });
            }else if(action.data.hasMore!== undefined){
                // no more data 检查 action.data.start
                return Object.assign({}, state, {
                    showLoading: action.data.showLoading,
                    hasMore: action.data.hasMore
                });
            }else {
                // setLoading 检查 action.data.hasMore action.data.start
                return Object.assign({}, state, {
                    showLoading: action.data.showLoading
                });
            }
        default:
            return state;
    }
}