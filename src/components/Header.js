/**
 * Created by liyan on 2017/1/20.
 */
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    Platform
} from 'react-native';
//引入字体文件
import Icon from 'react-native-vector-icons/Entypo';
import * as configs from '../constants/config';
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        if(Platform.OS === 'ios'){
            this.height = 24

        }else if(Platform.OS === 'android'){
            this.height = 0
        }
    }

    static defaultProps = {
    }
    static propTypes = {
        name: React.PropTypes.string,     //头部标题名称
        leftEle: React.PropTypes.string,  //左边图标
        leftFunc: React.PropTypes.func,    //左边点击回调函数
        rightEle: React.PropTypes.string,  //右边图标
        rightFunc: React.PropTypes.func    //右边点击回调函数
    }
    render() {
        const {name, leftEle, leftFunc,rightEle,rightFunc} = this.props;
        let left = <View style={styles.left}></View>;
        if (leftEle && leftFunc) {
            left =
                (
                    <TouchableOpacity style={[styles.left,{marginTop: this.height}]} onPress={()=>leftFunc()}>
                        <Icon
                            name={leftEle}
                            size={22}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                )
        }
        let right = <View style={styles.right}></View>;
        if (rightEle && rightFunc) {
            right =
                (
                    <TouchableOpacity style={[styles.right,{marginTop: this.height}]} onPress={()=>leftFunc()}>
                        <Icon
                            name={rightEle}
                            size={22}
                            color={'#fff'}
                        />
                    </TouchableOpacity>
                )
        }
        return (
            <View style={[styles.header,{height:28+this.height}]}>
                {left}
                <Text style={[styles.text,{marginTop: this.height}]}>{name}</Text>
                {right}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    header: {
        flexDirection: 'row',
        backgroundColor: configs.MAIN_GREEN,
    },
    text: {
        color: '#ffffff',
        fontSize: 22,
        flex:1,
        textAlign:'center'
    },
    left:{
        width:60,
        paddingLeft:10

    },
    right:{
        width:60,
        paddingRight:10
    }


});
export default Header;