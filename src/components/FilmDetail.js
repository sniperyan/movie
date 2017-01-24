/**
 * Created by liyan on 2017/1/22.
 * 电影条目信息（详情）
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
import FileTag from './FilmTag'
class FilmDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    static defaultProps = {}
    static propTypes = {
        subject: React.PropTypes.object.isRequired, //主题详情对象
        tapCelebrity:React.PropTypes.func.isRequired, //演员导演点击事件
        tapTag:React.PropTypes.func.isRequired, //点击标签的回调
    }
    tapCelebrity(id){
        const {tapCelebrity} = this.props;
        tapCelebrity(id);
    }
    //渲染导演演员
    renderPerson(subject){
        return(
            <View style={styles.fdBd}>
                <View style={styles.fdTitle}>
                    <Text style={styles.fdTitleText}>导演/演员</Text>
                </View>
                <ScrollView
                    contentContainerStyle = {styles.fdPerView}
                    horizontal={true}>
                    {/*豆瓣的数据有问题，有的会返回null,id也为null，对于没有图片的，就没有点击跳转*/}
                    {!subject.directors[0].avatars?
                        <TouchableOpacity>
                            <View>
                                <Image style={styles.fdPerImg}></Image>
                                <Text style={styles.fdPerText1}>{subject.directors[0].name}</Text>
                                <Text style={styles.fdPerText2}>导演</Text>
                            </View>
                        </TouchableOpacity>:
                        <TouchableOpacity onPress={()=>this.tapCelebrity(subject.directors[0].id)}>
                            <View>
                                <Image style={styles.fdPerImg} source={{uri: subject.directors[0].avatars.medium}}></Image>
                                <Text style={styles.fdPerText1}>{subject.directors[0].name}</Text>
                                <Text style={styles.fdPerText2}>导演</Text>
                            </View>
                        </TouchableOpacity>}
                    {subject.casts.map((item,index)=>{
                        return (
                        !item.avatars?
                            <TouchableOpacity key={index}>
                                <View style={styles.fdPerItem}>
                                    <Image style={styles.fdPerImg}></Image>
                                    <Text style={styles.fdPerText1}>{item.name}</Text>
                                    <Text style={styles.fdPerText2}>演员</Text>
                                </View>
                            </TouchableOpacity>:
                            <TouchableOpacity key={index} onPress={()=>this.tapCelebrity(item.id)}>
                                <View style={styles.fdPerItem}>
                                    <Image style={styles.fdPerImg} source={{uri: item.avatars.medium}}></Image>
                                    <Text style={styles.fdPerText1}>{item.name}</Text>
                                    <Text style={styles.fdPerText2}>演员</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                </ScrollView>
            </View>
        )

    }

    render() {
        const {subject,tapTag} = this.props;
        const width = Dimensions.get('window').width;
        const height = width / 1.2;
        return (
            !subject.images ? <View></View> :
                <ScrollView contentContainerStyle={[styles.contentContainer,{width:width}]}>
                    <Image style={[styles.bigImg,{width:width,height:height}]} source={{uri: subject.images.large}}>
                        <View style={[styles.blurView,{width:width,height:height}]}>
                        </View>
                    </Image>
                    <View style={[styles.headerDetail,{width:width,height:height}]}>
                        <View style={[styles.leftImg,{width:width/2,height:height}]}>
                            <Image style={[styles.img,{width:width/2-40,height:height-80}]}
                                   source={{uri: subject.images.large}}>
                            </Image>
                        </View>
                        <View style={[styles.rightText,{width:width/2,height:height}]}>
                            <Text style={styles.detailTitle}>{subject.title}</Text>
                            <Text style={styles.detailSub}>导演：{subject.directors[0].name}</Text>
                            <Text style={styles.detailSub}>演员：{subject.casts.map((item, index) => {
                                if (index + 1 === subject.casts.length) {
                                    return item.name
                                } else {
                                    return item.name + '/'
                                }

                            })}</Text>
                            <Text style={styles.detailSub}>豆瓣评分：
                                {subject.rating.average==0?"暂无评分":subject.rating.average+"分"}
                            </Text>
                            <Text style={styles.detailSub}>上映年份：{subject.year}年</Text>
                        </View>
                    </View>

                    <View style={[styles.fdData,{width:width,height:width/4.8}]}>
                        <View style={[styles.fdDataItem]}>
                            <Text style={styles.fdDataNum}>{subject.collect_count}</Text>
                            <Text style={styles.fdDataDesc}>看过</Text>
                        </View>
                        <View style={[styles.fdDataItem,styles.fdDataItemCenter,{height:width/4.8-20}]}>
                            <Text style={styles.fdDataNum}>{subject.wish_count}</Text>
                            <Text style={styles.fdDataDesc}>想看</Text>
                        </View>
                        <View style={[styles.fdDataItem]}>
                            <Text style={styles.fdDataNum}>{subject.ratings_count}</Text>
                            <Text style={styles.fdDataDesc}>评分人数</Text>
                        </View>
                    </View>
                    <View style={styles.fdBd}>
                        <View style={styles.fdTitle}>
                            <Text style={styles.fdTitleText}>剧情简介</Text>
                        </View>
                        <Text style={styles.fdContent}>
                            {subject.summary}
                        </Text>
                    </View>
                    {this.renderPerson(subject)}

                    <View style={styles.fdBd}>
                        <View style={styles.fdTitleTag}>
                            <Text style={styles.fdTitleText}>标签</Text>
                        </View>
                        <View style={styles.tags}>
                            <FileTag tapTag={tapTag} tags={subject.genres}/>
                        </View>

                    </View>


                </ScrollView>
        );
    }
}
const styles = StyleSheet.create({
    contentContainer: {},
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
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    leftImg: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    rightText: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        marginTop: 40
    },
    img: {
        borderRadius: 4
    },
    detailTitle: {
        fontSize: 22,
        color: '#fff',
        fontWeight: 'bold'
    },
    detailSub: {
        color: '#fff',
        fontSize: 18,
        marginTop: 10
    },
    fdData:{
        borderBottomColor:'#f4f4f4',
        borderBottomWidth:1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center'
    },
    fdDataItem:{
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    fdDataItemCenter:{
        borderLeftColor:'#f4f4f4',
        borderLeftWidth:1,
        borderRightColor:'#f4f4f4',
        borderRightWidth:1

    },
    fdDataNum:{
        fontSize:22,
        fontWeight:'bold',
        color:'#444'
    },
    fdDataDesc:{
        fontSize:18,
        color:'#999'
    },
    fdBd:{
        paddingLeft:20,
        paddingRight:20,
        paddingBottom:20

    },
    fdTitle:{
        marginTop:20,
        borderLeftWidth:5,
        paddingLeft:10,
        borderLeftColor:configs.MAIN_GREEN
    },
    fdTitleTag:{
        borderLeftWidth:5,
        paddingLeft:10,
        borderLeftColor:configs.MAIN_GREEN
    },
    fdTitleText:{
        fontSize:22
    },
    fdContent:{
        color:'#666',
        fontSize:16,
        lineHeight:16,
        marginTop:10
    },
    tags:{
        marginTop:10,
        marginLeft:-8
    },
    fdPerView:{
        marginTop:10,
        paddingBottom:20

    },
    fdPerImg:{
        width:150,
        height:220
    },
    fdPerItem:{
        marginLeft:10
    },
    fdPerText1:{
        textAlign:'center',
        color:'#666',
        fontSize:18
    },
    fdPerText2:{
        textAlign:'center',
        color:'#999',
        fontSize:16,
        marginTop:6
    }
});
export default FilmDetail;