/**
 * Created by liyan on 2017/1/21.
 * 电影列表中一个卡片
 * ellipsizeMode: React.PropTypes.oneOf(['head', 'middle', 'tail', 'clip']),
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    Dimensions,
    Image,
    TouchableOpacity
} from 'react-native';
import FileTag from './FilmTag'

class FilmItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {}
    static propTypes = {
        rowData: React.PropTypes.object.isRequired,   //列表页一条数据
        tapSubject: React.PropTypes.func.isRequired,  //列表页点击主题的回调
        tapTag: React.PropTypes.func.isRequired  //点击标签的回调
    }
    //跳转到电影条目（详情）
    tapSubject(id){
        const {tapSubject} = this.props;
        tapSubject(id);
    }


    render() {
        const {rowData,tapTag} = this.props;
        const width = Dimensions.get('window').width / 2 - 8;
        const height = width * 2;
        const imageHeight = height - 70;
        return (
            <View style={[styles.filmItem,{width:width,height:height}]}>
                <TouchableOpacity onPress={()=>this.tapSubject(rowData.id)}>
                    <Image style={{width:width,height:imageHeight}} source={{uri: rowData.images.large}}>
                        <View style={[styles.scoreBg,{width:width}]}>
                            {rowData.rating.average === 0 ?
                                <Text style={styles.scoreText}>暂无评分</Text> :
                                <Text style={styles.scoreText}>{rowData.rating.average}分</Text>
                            }
                        </View>
                    </Image>

                </TouchableOpacity>
                <TouchableOpacity onPress={()=>this.tapSubject(rowData.id)}>
                    <Text numberOfLines={1}
                          ellipsizeMode='tail'
                          style={styles.title}>{rowData.title}
                    </Text>
                </TouchableOpacity>
                <FileTag tags={rowData.genres} tapTag={tapTag}></FileTag>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    filmItem: {
        backgroundColor: '#fff',
        marginTop: 5,
        marginRight: 4,
        marginLeft: 4,
        marginBottom: 5,
        borderRadius: 10,
        overflow:'hidden'
    },
    title: {
        padding: 8,
        fontSize: 22
    },
    tags: {
        justifyContent: 'flex-start',
        flexDirection: 'row'
    },
    tag: {
        marginLeft: 8,
        padding: 2,
        borderRadius: 4,
        backgroundColor: '#000'
    },
    label: {
        fontSize: 8,
        color: '#fff',
    },
    scoreBg: {
        opacity: 0.7,
        position: 'absolute',
        bottom: 0,
        left: 0,
        backgroundColor: '#000',
        height:26
    },
    scoreText: {
        color: '#fff',
        textAlign: 'right',
        fontSize: 20,
        fontWeight:'bold',
        paddingRight:6,
        height:26,
        paddingTop:3
    }
});
export default FilmItem;