# movie
Douban movie app build by react-native ,using react-native + redux

## 下载

```
git clone git@github.com:sniperyan/movie.git
```

## 运行方法

安装依赖:

```
npm install
```

安卓运行:

```
react-native run-android
```

ios运行:

```
react-native run-ios
```

## 说明

1. 豆瓣API参考 [https://developers.douban.com/wiki/?title=api_v2](https://developers.douban.com/wiki/?title=api_v2)
1. 开发过程中最好使用mock server，豆瓣的api有调用限制，频繁调用会被封ip，mock server地址[https://github.com/sniperyan/doubanMock](https://github.com/sniperyan/doubanMock)
1. 字体图标使用`react-native-vector-icons`，安卓和ios使用都需要配置，具体使用方法请参考官方文档[https://github.com/oblador/react-native-vector-icons](https://github.com/oblador/react-native-vector-icons)

## run on iphone

1. 点击`movie.xcodeproj`文件，启动xcode
1. 在工程目录下，把movieTest目录删除
1. 添加signing team,修改bundle identifier,如图![如图](./images/movie1.png)
1. 选中自己的iPhone，点击build按钮
1. build success之后，在手机 设置-通用-描述文件与设备管理-开发者应用 内选择信任应用

## 运行效果
![运行效果](./images/movie-ios.gif)


