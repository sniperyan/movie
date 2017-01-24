/**
 * Created by liyan on 2017/1/19.
 */
import React, { Component } from 'react';
import {
    AppRegistry
} from 'react-native';
import {Provider} from 'react-redux'
import configureStore from './store';
import App from './containers'
const store = configureStore();

export default class RootApp extends Component {
    render() {
        return (
            <Provider store={store}>
                <App/>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('movie', () => RootApp);