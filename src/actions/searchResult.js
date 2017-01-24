/**
 * Created by liyan on 2017/1/23.
 */
import * as types from '../constants/actionTypes';
import Toast from 'react-native-root-toast';
import * as configs from '../constants/config';
/**
 * 搜索电影结果
 * @param start
 * @param tag
 * @param count
 * @param isQ  可选择，如果不传，则搜索tag，如果传true则搜索q
 * @returns {Function}
 */
export function getSearchResult(start,tag,count,isQ) {
    return function (dispatch, getState) {
        //设置加载动画
        dispatch(setSearchResult({
            showLoading: true
        }));
        if(isQ){
            return fetch(configs.HOST+'/v2/movie/search?q='+tag+'&start='+start+'&count='+count)
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.subjects.length === 0){
                        //no more data
                        dispatch(setSearchResult({
                            showLoading: false,
                            hasMore: false
                        }));
                    }else {
                        // has more data
                        dispatch(setSearchResult({
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

        }else {
            return fetch(configs.HOST+'/v2/movie/search?tag='+tag+'&start='+start+'&count='+count)
                .then((response) => response.json())
                .then((responseJson) => {
                    if(responseJson.subjects.length === 0){
                        //no more data
                        dispatch(setSearchResult({
                            showLoading: false,
                            hasMore: false
                        }));
                    }else {
                        // has more data
                        dispatch(setSearchResult({
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
        }

    };
}
export function setSearchResult(data) {
    return {
        type: types.SET_SEARCHRESULT,
        data
    };
}
export function resetSearchResult() {
    return {
        type: types.RESET_SEARCHRESULT
    };
}