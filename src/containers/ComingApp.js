/**
 * Created by liyan on 2017/1/20.
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
import SearchResultApp from './SearchResultApp';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as comingAction from '../actions/coming';
import * as configs from '../constants/config';
class ComingApp extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => false});
    }

    componentWillMount() {
        this.loadData()
    }
    loadData() {
        const {actions, coming} = this.props;
        //只有在showLoading===false下才发送请求
        if (coming.showLoading)return;
        actions.getComingList(coming.start, configs.CITY, configs.PAGESIZE);
    }
    //跳转电影条目信息
    gotoSubject(id){
        const {navigator} = this.props;
        navigator.push({
            component: SubjectApp,
            params:{
                id:id
            }
        });
    }
    //点击tag跳转搜索结果
    gotoSearch(tag){
        const {navigator} = this.props;
        navigator.push({
            component: SearchResultApp,
            params:{
                tag:tag
            }
        });
    }

    render() {
        const {coming} = this.props;
        return (
            <View>
                <Header name="即将上映"/>
                <ListView contentContainerStyle={styles.filmList}
                          dataSource={this.ds.cloneWithRows(coming.films)}
                          renderRow={(rowData) =>
                          <FilmItem tapTag={(tag)=>this.gotoSearch(tag)} rowData={rowData} tapSubject={(id)=>this.gotoSubject(id)}/>}
                          enableEmptySections={true}
                          onEndReached={()=>this.loadData()}
                          onEndReachedThreshold = {5}
                          renderFooter={()=><Loading hasMore={coming.hasMore} showLoading={coming.showLoading}/>}
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
        coming: state.coming
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, comingAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(ComingApp);