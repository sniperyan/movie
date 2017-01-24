/**
 * Created by liyan on 2017/1/22.
 */
import * as types from '../constants/actionTypes';
import Toast from 'react-native-root-toast';
import * as configs from '../constants/config';
/**
 *
 * @param id 电影条目id
 * @returns {Function}
 */
export function getSubject(id) {
    return function (dispatch, getState) {
        //设置加载动画
        dispatch(setSubject({
            showLoading: true
        }));
        return fetch(configs.HOST+'/v2/movie/subject/'+id)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setSubject({
                    showLoading: false,
                    subject:responseJson
                }));
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
export function setSubject(data) {
    return {
        type: types.SET_SUBJECT,
        data
    };
}
export function resetSubject(data) {
    return {
        type: types.RESET_SUBJECT,
        data
    };
}