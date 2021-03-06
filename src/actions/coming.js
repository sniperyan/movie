/**
 * Created by liyan on 2017/1/22.
 */
import * as types from '../constants/actionTypes';
import Toast from 'react-native-root-toast';
import * as configs from '../constants/config';
/**
 * @param start
 * @param city  城市
 * @param count pageSize
 * @returns {Function}
 */
export function getComingList(start,city,count) {
    return function (dispatch, getState) {
        //设置加载动画
        dispatch(setComing({
            showLoading: true
        }));
        return fetch(configs.HOST+'/v2/movie/coming_soon?city='+city+'&start='+start+'&count='+count)
            .then((response) => response.json())
            .then((responseJson) => {
                if(responseJson.subjects.length === 0){
                    //no more data
                    dispatch(setComing({
                        showLoading: false,
                        hasMore: false
                    }));
                }else {
                    // has more data
                    dispatch(setComing({
                        showLoading: false,
                        hasMore: true,
                        films: responseJson.subjects,
                        start: start + responseJson.subjects.length
                    }));
                }
            }).catch(function (ex) {
                Toast.show('网络发生错误,请重试!', {
                    duration: 2000,
                    position: 0,
                    shadow: true,
                    animation: true,
                    hideOnPress: false,
                    delay: 0
                });

            })
    };
}
export function setComing(data) {
    return {
        type: types.SET_COMING,
        data
    };
}