/**
 * Created by liyan on 2017/1/22.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import FilmDetail from '../components/FilmDetail';
import CelebrityApp from './CelebrityApp';
import SearchResultApp from './SearchResultApp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as subjectAction from '../actions/subject';
import * as configs from '../constants/config';
class SubjectApp extends Component {
    constructor(props) {
        super(props);

    }
    componentDidMount() {
        this.loadData()

    }
    loadData() {
        //id 是从路由params属性里带过来的
        const {actions, subject,id} = this.props;
        //只有在showLoading===false下才发送请求
        if (subject.showLoading)return;
        actions.getSubject(id);
    }
    //跳转影人详情信息
    gotoCelebrity(id){
        const {navigator} = this.props;
        navigator.replace({
            component: CelebrityApp,
            params:{
                id:id
            }
        });
    }
    //点击tag跳转搜索结果
    gotoSearch(tag){
        const {navigator} = this.props;
        navigator.replace({
            component: SearchResultApp,
            params:{
                tag:tag
            }
        });
    }
    componentWillUnmount() {
        //页面卸载前清空subject
        const {actions} = this.props;
        actions.resetSubject();
    }
    render() {
        const {subject,navigator} = this.props;
        return (
            <View>
                <Header leftEle="chevron-thin-left" leftFunc={()=>{navigator.pop()}} name={subject.subject.title}/>
                <FilmDetail tapTag={(tag)=>this.gotoSearch(tag)} subject={subject.subject} tapCelebrity={(id)=>this.gotoCelebrity(id)}/>
                <Loading hasMore={true} showLoading={subject.showLoading}/>
            </View>
        )
    }
}
let styles = StyleSheet.create({

});
const mapStateToProps = state => {
    return {
        subject: state.subject
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, subjectAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SubjectApp);