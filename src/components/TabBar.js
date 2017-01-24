/**
 * Created by liyan on 2017/1/19.
 * app底部的tabBar
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Text
} from 'react-native';
//引入字体文件
import Icon from 'react-native-vector-icons/Entypo';
import * as configs from '../constants/config';
class TabBar extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static defaultProps = {}
    static propTypes = {
        tabs: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                name: React.PropTypes.string.isRequired,   //tab icon名称
                size: React.PropTypes.number.isRequired,   //icon尺寸
                color: React.PropTypes.string.isRequired,   //icon color
                desc: React.PropTypes.string.isRequired     //icon 描述
            })
        ),//所有tabs集合
        changeTab:React.PropTypes.func.isRequired, //点击tab的回调
        tabIndex: React.PropTypes.number.isRequired //当前被选中的tab下标
    }
    renderTabOption(tab, i) {
        const {tabIndex,changeTab} = this.props;
        return (
            <TouchableOpacity key={i} onPress={()=>changeTab(i)} style={styles.tab}>
                <View style={styles.tabItem}>
                    {tabIndex === i ? <Icon
                            name={tab.name}
                            size={tab.size}
                            color={configs.MAIN_GREEN}
                        /> : <Icon
                            name={tab.name}
                            size={tab.size}
                            color={tab.color}
                        />}
                    <Text
                        style={[styles.text,{color:tabIndex === i?configs.MAIN_GREEN:tab.color}]}>
                        {tab.desc}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const {tabs} = this.props;
        return (
            <View style={styles.tabs}>
                {tabs.map((tab, i) => this.renderTabOption(tab, i))}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    tabs: {
        flexDirection: 'row',
        height: 54,
    },
    tab: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabItem: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    text: {
        fontSize: 16
    }
});
export default TabBar;