/**
 * Created by liyan on 2017/1/23.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import Celebrity from '../components/Celebrity';
import SubjectApp from './SubjectApp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as celebrityAction from '../actions/celebrity';
import * as configs from '../constants/config';
class CelebrityApp extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.loadData()

    }
    loadData() {
        //id 是从路由params属性里带过来的
        const {actions, celebrity,id} = this.props;
        //只有在showLoading===false下才发送请求
        if (celebrity.showLoading)return;
        actions.getCelebrity(id);
    }
    //跳转电影条目信息
    gotoSubject(id){
        const {navigator} = this.props;
        navigator.replace({
            component: SubjectApp,
            params:{
                id:id
            }
        });
    }
    render() {
        const {celebrity,navigator} = this.props;
        return (
            <View>
                <Header leftEle="chevron-thin-left" leftFunc={()=>{navigator.pop()}} name={celebrity.celebrity.name}/>
                <Celebrity celebrity={celebrity.celebrity} tapSubject={(id)=>this.gotoSubject(id)}></Celebrity>
                <Loading hasMore={true} showLoading={celebrity.showLoading}/>
            </View>
        )
    }
}
let styles = StyleSheet.create({

});
const mapStateToProps = state => {
    return {
        celebrity: state.celebrity
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, celebrityAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CelebrityApp);