/**
 * Created by liyan on 2017/1/23.
 */
import * as types from '../constants/actionTypes';
import Toast from 'react-native-root-toast';
import * as configs from '../constants/config';
/**
 * 获取影人信息
 * @param id 影人id
 * @returns {Function}
 */
export function getCelebrity(id) {
    return function (dispatch, getState) {
        //设置加载动画
        dispatch(setCelebrity({
            showLoading: true
        }));
        return fetch(configs.HOST+'/v2/movie/celebrity/'+id)
            .then((response) => response.json())
            .then((responseJson) => {
                dispatch(setCelebrity({
                    showLoading: false,
                    celebrity:responseJson
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
export function setCelebrity(data) {
    return {
        type: types.SET_CELEBRITY,
        data
    };
}