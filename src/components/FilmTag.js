/**
 * Created by liyan on 2017/1/23.
 * film genres标签
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

class FilmTag extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    static defaultProps = {}
    static propTypes = {
        tags: React.PropTypes.array.isRequired,  //标签集合
        tapTag: React.PropTypes.func.isRequired  //点击标签的回调
    }
    tapTag(tag){
        const {tapTag} = this.props;
        tapTag(tag);
    }

    renderGenres(genres) {
        return genres.map((item, index) => {
            return (
                <TouchableOpacity style={styles.touchView} key={index} onPress={()=>this.tapTag(item)}>
                    <View style={styles.tag}>
                        <Text style={styles.label}>{item}</Text>
                    </View>
                </TouchableOpacity>
            )
        })

    }

    //跳转到电影条目（详情）
    tapSubject(id) {
        const {tapSubject} = this.props;
        tapSubject(id);
    }


    render() {
        const {tags} = this.props;
        return (

            <View style={styles.tags}>
                {this.renderGenres(tags)}
            </View>


        );
    }
}
const styles = StyleSheet.create({
    tags: {
        justifyContent: 'flex-start',
        flexDirection: 'row',
        flexWrap: 'wrap'
    },
    tag: {
        marginLeft: 8,
        borderRadius: 4,
        backgroundColor: '#ddd',
        height:24,
        paddingLeft:5,
        paddingRight:5,
        justifyContent:'center',
    },
    label: {
        fontSize: 14,
        color: '#666',
        height:24,
        lineHeight:24,
    },
    touchView:{
        height:24,
        marginBottom:10
    }
});
export default FilmTag;