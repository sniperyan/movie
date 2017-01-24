/**
 * Created by liyan on 2017/1/23.
 * 搜索结果页，每次离开搜索结果页面，页面数据都清空
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    ListView
} from 'react-native';
import Header from '../components/Header';
import Loading from '../components/Loading';
import FilmItem from '../components/FilmItem';
import SubjectApp from './SubjectApp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as searchResultAction from '../actions/searchResult';
import * as configs from '../constants/config';
class SearchResultApp extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => false});
        this.state={
            name:'搜索结果'
        }
    }

    componentDidMount() {
        this.loadData();
        //设置header name
        this.setState({
            name:this.props.tag
        })

    }

    loadData() {
        //isQ为搜索的时候，判断是tag还是q参数，只有传递true时才搜索q
        const {actions, searchResult,tag,isQ} = this.props;
        //只有在showLoading===false下才发送请求
        if (searchResult.showLoading)return;
        actions.getSearchResult(searchResult.start, tag, configs.PAGESIZE,isQ);
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
    //点击tag跳转搜索结果
    gotoSearch(tag){
        //自己跳转自己的页面？no，会报错的，只需重置state就行了
        //设置header name
        this.setState({
            name:tag
        })
        const {actions} = this.props;
        actions.resetSearchResult();
        actions.getSearchResult(0, tag, configs.PAGESIZE);
    }

    componentWillUnmount() {
        //页面卸载前清空搜索结果数据
        const {actions} = this.props;
        actions.resetSearchResult();
    }

    render() {
        const {searchResult,navigator} = this.props;
        return (
            <View>
                <Header leftEle="chevron-thin-left" leftFunc={()=>{navigator.pop()}} name={this.state.name}/>
                <ListView contentContainerStyle={styles.filmList}
                          dataSource={this.ds.cloneWithRows(searchResult.films)}
                          renderRow={(rowData) =>
                          <FilmItem tapTag={(tag)=>this.gotoSearch(tag)} rowData={rowData} tapSubject={(id)=>this.gotoSubject(id)}/>}
                          enableEmptySections={true}
                          onEndReached={()=>this.loadData()}
                          onEndReachedThreshold={5}
                          renderFooter={()=><Loading hasMore={searchResult.hasMore} showLoading={searchResult.showLoading}/>}
                />
            </View>
        )
    }
}
let styles = StyleSheet.create({
    filmList: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    }
});
const mapStateToProps = state => {
    return {
        searchResult: state.searchResult
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, searchResultAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultApp);