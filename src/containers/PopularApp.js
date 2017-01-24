/**
 * Created by liyan on 2017/1/20.
 * 报错in next release empty section headers will be rendered
 * 在ListView下 加个 enableEmptySections = {true} 就可以解决了
 * 可是这个属性api文档里没有啊
 *
 * 在ListView下   contentContainerStyle
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
import * as popularAction from '../actions/popular';
import * as configs from '../constants/config';
class PopularApp extends Component {
    constructor(props) {
        super(props);
        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => false});
    }

    componentDidMount() {
        this.loadData()
    }

    loadData() {
        const {actions, popular} = this.props;
        //只有在showLoading===false下才发送请求
        if (popular.showLoading)return;
        actions.getPopularList(popular.start, configs.CITY, configs.PAGESIZE);
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
        const {popular} = this.props;
        return (
            <View>
                <Header name="正在热映"/>
                <ListView contentContainerStyle={styles.filmList}
                          dataSource={this.ds.cloneWithRows(popular.films)}
                          renderRow={(rowData) =>
                          <FilmItem tapTag={(tag)=>this.gotoSearch(tag)} rowData={rowData} tapSubject={(id)=>this.gotoSubject(id)}/>}
                          enableEmptySections={true}
                          onEndReached={()=>this.loadData()}
                          onEndReachedThreshold={5}
                          renderFooter={()=><Loading hasMore={popular.hasMore} showLoading={popular.showLoading}/>}
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
        popular: state.popular
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, popularAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(PopularApp);