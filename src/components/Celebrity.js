/**
 * Created by liyan on 2017/1/23.
 * 影人详情
 */

import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    ScrollView,
    Dimensions,
    Image
} from 'react-native';
import * as configs from '../constants/config';
class Celebrity extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {}
    static propTypes = {
        celebrity: React.PropTypes.object.isRequired, //  影人详情对象
        tapSubject:React.PropTypes.func.isRequired, //电影条目点击事件

    }
    tapSubject(id){
        const {tapSubject} = this.props;
        tapSubject(id);
    }

    //渲染主要作品item
    renderMainItem(celebrity){
        const width = Dimensions.get('window').width;
        return(
            <View style={styles.filmList}>
                {celebrity.works.map((item,index)=>{
                    return(
                        <View style={[styles.filmItem,{width:width/2-7,height:(width/2-7)*1.5+58}]} key={index}>
                            <TouchableOpacity onPress={()=>this.tapSubject(item.subject.id)}>
                                <Image style={{width:width/2-7,height:(width/2-7)*1.5}} source={{uri: item.subject.images.large}}></Image>
                                <Text numberOfLines={1}
                                      ellipsizeMode='tail'
                                    style={styles.filmItemText1}>{item.subject.title}</Text>
                                <Text numberOfLines={1}
                                      ellipsizeMode='tail'
                                    style={styles.filmItemText2}>担任：{item.roles.map((subItem,subIndex)=>{
                                    if (subIndex + 1 === item.roles.length) {
                                        return subItem
                                    } else {
                                        return subItem + ','
                                    }
                                })}</Text>
                            </TouchableOpacity>
                        </View>
                    )

                })}


            </View>
        )

    }
    //渲染主要作品
    renderMainFilm(celebrity){
        return(
            <View style={styles.fdBd}>
                <View style={styles.fdTitle}>
                    <Text style={styles.fdTitleText}>主要作品</Text>
                </View>
                {this.renderMainItem(celebrity)}

            </View>
        )

    }
    render() {
        const {celebrity} = this.props;
        const width = Dimensions.get('window').width;
        const height = width / 1.2;
        return (
            !celebrity.avatars ? <View></View> :
                <ScrollView contentContainerStyle={[styles.contentContainer,{width:width}]}>
                    <Image style={[styles.bigImg,{width:width,height:height}]} source={{uri: celebrity.avatars.medium}}>
                        <View style={[styles.blurView,{width:width,height:height}]}>
                        </View>
                    </Image>
                    <View style={[styles.headerDetail,{width:width,height:height}]}>
                        <Image style={[styles.headerImg,{width:width/2.7,height:width/2.7,borderRadius:width/5.4}]} source={{uri: celebrity.avatars.medium}}>
                        </Image>
                        <Text style={styles.headerText1}>{celebrity.name}</Text>
                        <Text style={styles.headerText2}>{celebrity.name_en}</Text>
                        <Text style={styles.headerText3}>{celebrity.born_place}</Text>
                    </View>
                    {this.renderMainFilm(celebrity)}

                </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    contentContainer: {
    },
    bigImg: {
        opacity: 0.2,
        zIndex: 1
    },
    blurView: {
        zIndex: 2,
        opacity: 0.7,
        backgroundColor: '#000000',
    },
    headerDetail: {
        position: 'absolute',
        left: 0,
        top: 0,
        zIndex: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center'
    },
    headerText1:{
        color:'#fff',
        fontSize:22,
        marginTop:10,
        fontWeight:'bold'

    },
    headerText2:{
        color:'#fff',
        fontSize:16,
        marginTop:6,
    },
    headerText3:{
        color:'#fff',
        fontSize:18,
        marginTop:6,
    },
    fdBd:{
        paddingLeft:5,
        paddingRight:5,
        paddingBottom:20

    },
    fdTitle:{
        marginTop:20,
        borderLeftWidth:5,
        paddingLeft:10,
        borderLeftColor:configs.MAIN_GREEN,
        marginLeft:2,
        marginBottom:10,
    },
    filmList:{
        justifyContent: 'space-between',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    filmItem:{
        marginTop:10,
        backgroundColor:'#fff'
    },
    filmItemText1:{
        textAlign:'center',
        color:'#333',
        fontSize:22,
        marginTop:6
    },
    filmItemText2:{
        textAlign:'center',
        color:'#666',
        fontSize:16,
        marginTop:4
    },
    fdTitleText:{
        fontSize:22,
        fontWeight:'bold'
    }

});
export default Celebrity;