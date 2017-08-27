import React { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  TextInput,
} from 'react-native';

export default class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  _handleTextChange(e) {
    this.setState({ text: e.nativeEvent.text });
  }

  render() {
    return (
      <View>
        <Text>{this.state.text}</Text>
        <TextInput onSubmitEditing={(e) => this._handleTextChange(e)} />
      </View>
    );
  }
}

AppRegistry.registerComponent('WeatherProject', () => WeatherProject);
