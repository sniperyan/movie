/**
 * Created by liyan on 2017/1/22.
 * 加载状态提示，如果正在加载，则转圈提示
 * 加载完了没有数据，则提示'没有更多内容了...'
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    ActivityIndicator
} from 'react-native';
import * as configs from '../constants/config';
class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static defaultProps = {}
    static propTypes = {
        showLoading:React.PropTypes.bool.isRequired,   //是否在加载中
        hasMore:React.PropTypes.bool.isRequired        //是否有更多数据
    }
    shouldComponentUpdate(nextProps, nextState){
        const {showLoading,hasMore} = this.props;
        return nextProps.showLoading !==showLoading
            || nextProps.hasMore !== hasMore; // 父元素控制是否更新
    }
    render() {
        const {showLoading,hasMore} = this.props;
        const width = Dimensions.get('window').width;
        if (showLoading) {
            return (
                <ActivityIndicator
                    animating={true}
                    style={[styles.indicator,{width:width}]}
                    size="small"
                    color={configs.MAIN_GREEN}
                />
            )
        } else if (!hasMore) {
            return (
                <View style={[styles.indicator,{width:width}]}>
                    <Text style={styles.tipsText}>
                        {'没有更多内容了...'}
                    </Text>
                </View>

            )

        }else {
            return(
                <View></View>
            )
        }
    }
}
const styles = StyleSheet.create({
    indicator: {
        height: 30

    },
    tipsText: {
        textAlign: 'center',
        color: '#ccc',
        height: 30,
        lineHeight:30
    }

});
export default Loading;