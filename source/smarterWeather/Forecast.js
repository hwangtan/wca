import React, { Component } from 'react';
import {
 View,
 Text,
 StyleSheet,
} from 'react-native';

import styles from './styles/textStyles';

const forecastStyles = StyleSheet.create({
  forecast: {
    alignItems: 'center',
  }
})

export default class Forecast extends Component {
  constructor(props) {
    super(props);
    console.log(this.props);
  }

  render() {
    return (<View style={forecastStyles.forecast}>
      <Text style={styles.bigText}>
        {this.props.main}
      </Text>
      <Text style={styles.mainText}>
        Current conditions: {this.props.description}
      </Text>
      <Text style={styles.bigText}>
        {this.props.temp} F
      </Text>
    </View>);
  }
}
