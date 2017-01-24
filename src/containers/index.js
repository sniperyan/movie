/**
 * Created by liyan on 2017/1/20.
 * callback func 传递demo
 * filmdetail：
 *  <TouchableOpacity onPress={()=>this.tapCelebrity(subject.directors[0].id)}>
 *      tapCelebrity(id){
        const {tapCelebrity} = this.props;
        tapCelebrity(id);
    }
 如果还有中间层（引用传递）： tapCelebrity={tapCelebrity}
 container层：<FilmDetail subject={subject.subject} tapCelebrity={(id)=>this.gotoCelebrity(id)}/>

 只有在 ComingApp PopularApp  SearchApp TopApp中导航的跳转才是push，其余都为replace（防止页面层级过多）
 *
 *
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    BackAndroid,
    View,
    Text,
    Dimensions,
    Navigator
} from 'react-native';
import Toast from 'react-native-root-toast';
import TabBar from '../components/TabBar';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as tabsAction from '../actions/tabs';
import ComingApp from './ComingApp';
import PopularApp from './PopularApp';
import SearchApp from './SearchApp';
import TopApp from './TopApp';

class App extends Component {
    constructor(props) {
        super(props);
        this.onBackAndroid = this.onBackAndroid.bind(this);
        this.tabs = [{
            name: 'bar-graph',
            size: 25,
            color: '#686868',
            desc: '热映'
        }, {
            name: 'video-camera',
            size: 25,
            color: '#686868',
            desc: '待映'
        }, {
            name: 'ccw',
            size: 25,
            color: '#686868',
            desc: '搜索'
        }, {
            name: 'area-graph',
            size: 25,
            color: '#686868',
            desc: '排行'
        }];
        this.navigator = {};
    }

    componentWillMount() {
        BackAndroid.addEventListener('hardwareBackPress', this.onBackAndroid);
    }

    onBackAndroid() {
        if (this.lastBackPressed && this.lastBackPressed + 2000 >= Date.now()) {
            return false;
        }
        Toast.show('再按一次退出应用', {
            duration: 2000,
            position: Toast.positions.BOTTOM,
            shadow: true,
            animation: true,
            hideOnPress: false,
            delay: 0,
            onShow: () => {
                // calls on toast\`s appear animation start
                this.lastBackPressed = Date.now();
            },
            onShown: () => {
                // calls on toast\`s appear animation end.
            },
            onHide: () => {
                // calls on toast\`s hide animation start.
            },
            onHidden: () => {
                // calls on toast\`s hide animation end.
            }
        });
        return true;
    }

    //tab切换
    changeTab(index) {
        const {actions} = this.props;
        actions.setTab(index);
        switch (index) {
            case 0:
                this.navigator.replace({
                    name: '正在热映',
                    component: PopularApp
                });
                break;
            case 1:
                this.navigator.replace({
                    name: '即将上映',
                    component: ComingApp
                });
                break;
            case 2:
                this.navigator.replace({
                    name: '搜索',
                    component: SearchApp
                });
                break;
            case 3:
                this.navigator.replace({
                    name: 'Top250',
                    component: TopApp
                });
                break;
        }
    }

    render() {
        const {tabIndex} = this.props;
        return (
                <Navigator style={styles.main}
                           initialRoute={{ name: '正在热映', component: PopularApp }}
                           configureScene={(route, routeStack) => Navigator.SceneConfigs.PushFromRight}
                           renderScene={(route, navigator) => {
                           let Component = route.component;
                           this.navigator = navigator;
                           return <Component {...route.params} navigator={navigator} />

                        }}
                           navigationBar={
                           <View style={styles.tabs}>
                           <TabBar changeTab={(index)=>this.changeTab(index)} tabIndex={tabIndex} tabs={this.tabs}/>
                           </View>
                       }
                >
                </Navigator>


        )
    }
}
let styles = StyleSheet.create({
    main: {
        backgroundColor: '#eee'
    },
    tabs: {
        backgroundColor: '#fff'
    }
});
const mapStateToProps = state => {
    return {
        tabIndex: state.tabs.tabIndex
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, tabsAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);