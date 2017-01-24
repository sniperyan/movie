/**
 * Created by liyan on 2017/1/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Picker,
    Alert
} from 'react-native';
import SearchResultApp from './SearchResultApp';
import Header from '../components/Header';
import {connect} from 'react-redux';
import * as configs from '../constants/config';
import {bindActionCreators} from 'redux';
import * as tabsAction from '../actions/tabs';
import FileTag from '../components/FilmTag'
class SearchApp extends Component {
    constructor(props) {
        super(props);
        this.state={
            text:'',
            showPicker:false,
            type:0   //搜索类型 0默认  1类型
        };
        this.hotKeyword= ['功夫熊猫', '烈日灼心', '摆渡人', '长城', '我不是潘金莲', '这个杀手不太冷', '驴得水', '海贼王之黄金城', '西游伏妖片', '我在故宫修文物', '你的名字'],
        this.hotTag=['动作', '喜剧', '爱情', '悬疑']
    }

    componentWillMount() {
    }

    //改变type的方法
    changeType(type){
        this.setState({
            showPicker:false,
            type:type   //搜索类型 0默认  1类型
        })
    }
    // open picker
    onOpen(){
        this.setState({
            showPicker:!this.state.showPicker,
        })
    }
    //点击搜索按钮
    search(){
        const {navigator} = this.props;

        if(this.state.text==''){
            Alert.alert('请输入内容')
        }else {
            navigator.push({
                component: SearchResultApp,
                params:{
                    tag:this.state.text,
                    isQ:this.state.type===0
                }
            });
        }
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
        const width = Dimensions.get('window').width;
        return (
            <View>
                <Header name="搜索"/>
                <View style={styles.searchTitle}>
                    <TouchableOpacity onPress={()=>this.onOpen()}>
                        <View style={[styles.lBtnView,{width:width/6.2}]}>
                            <Text>{this.state.type===0?"默认":"类型"}</Text>
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.searchInput,{width:width/1.6}]}>
                        <TextInput placeholder={this.state.type===0?'请输入电影标题、演员或导演' : '请输入影片类型，如：爱情、喜剧'}
                                   onChangeText={(text) => this.setState({text})}
                                   value={this.state.text}
                            style={[styles.searchInput,{width:width/1.6}]}></TextInput>
                    </View>
                    <TouchableOpacity onPress={()=>this.search()}>
                        <View style={[styles.rBtnView,{width:width/6.2}]}>
                            <Text>搜索</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={[styles.fdBd,{marginTop:40}]}>
                    <View style={styles.fdTitle}>
                        <Text style={styles.fdTitleText}>热门搜索</Text>
                    </View>
                    <FileTag tags={this.hotKeyword} tapTag={(tag)=>this.gotoSearch(tag)}></FileTag>
                </View>
                <View style={styles.fdBd}>
                    <View style={styles.fdTitle}>
                        <Text style={styles.fdTitleText}>热门标签</Text>
                    </View>
                    <FileTag tags={this.hotTag} tapTag={(tag)=>this.gotoSearch(tag)}></FileTag>
                </View>



                {this.state.showPicker?
                    <Picker
                        selectedValue={this.state.type}
                        onValueChange={(type) => this.changeType(type)}>
                        <Picker.Item label="默认" value={0} />
                        <Picker.Item label="类型" value={1} />
                    </Picker>:<View></View>}
            </View>
        )
    }
}
let styles = StyleSheet.create({
    searchTitle:{
        flexDirection:'row',
        justifyContent:'center',
        marginTop:15

    },
    lBtnView:{
        height:44,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc',
        borderWidth:1,
        borderTopLeftRadius:5,
        borderBottomLeftRadius:5
    },
    rBtnView:{
        height:44,
        justifyContent:'center',
        alignItems:'center',
        borderColor:'#ccc',
        borderWidth:1,
        borderTopRightRadius:5,
        borderBottomRightRadius:5,
        backgroundColor:'#bbb'
    },
    searchInput:{
        height:44,
        borderBottomWidth:1,
        borderTopWidth:1,
        borderBottomColor:'#ccc',
        borderTopColor:'#ccc',
    },
    fdBd:{
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:20

    },
    fdTitle:{
        borderLeftWidth:5,
        paddingLeft:10,
        borderLeftColor:configs.MAIN_GREEN,
        marginBottom:20
    },
    fdTitleText:{
        fontSize:22
    },
});
const mapStateToProps = state => {
    return {
        tabIndex: state.tabs.tabIndex
    }
};
const mapDispatchToProps = (dispatch) => ({
    actions: bindActionCreators(Object.assign({}, tabsAction), dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchApp);