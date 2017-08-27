import React, { Component } from 'react';
import CustomButton from './CustomButton';
import styles from './styles/buttonStyle';

export default class LocationButton extends Component {
  static propTypes = {
    onGetCoords: React.PropTypes.func.isRequired,
  }

  _onPress() {
    navigator.geolocation.getCurrentPosition((initPosition) =>
    this.props.onGetCoords(initPosition.coords.latitude,
      initPosition.coords.longitude),
       (error) => new Error(error),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000});
  }

  render() {
    return (
      <CustomButton
        label="Use CurrentLocation"
        style={styles.button}
        onPress={this._onPress.bind(this)} />
    );
  }
}
