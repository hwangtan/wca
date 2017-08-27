import React, { Component } from 'react';
import {
 View,
 Text,
 TextInput,
 StyleSheet,
 Image,
 AsyncStorage,
} from 'react-native';
import Forecast from './Forecast';
import LocationButton from './LocationButton';
import PhotoBackdrop from './PhotoBackdrop';
import textStyles from './styles/textStyles';

const STORAGE_KEY = '@smarterWeather:zip';
const WEATHER_API_KEY = '4c6b5cc00209e88b7178a0a620352d20';
const API_STEM = 'http://api.openweathermap.org/data/2.5/weather?';

const baseFontSize = 16;

const styles = StyleSheet.create({
 overlay: {
   paddingTop: 5,
   backgroundColor: '#000000',
   opacity: 0.5,
 },
 row: {
   width: 400,
   flex: 1,
   flexDirection: 'row',
   flexWrap: 'nowrap',
   alignItems: 'center',
   justifyContent: 'center',
   padding: 30,
 },
 zipContainer: {
   borderBottomColor: '#DDDDDD',
   borderBottomWidth: 1,
   marginLeft: 5,
   marginTop: 3,
   padding: 0,
 },
 zipCode: {
   width: 50,
   height: textStyles.baseFontSize,
   padding: 0,
 }
});

export default class WeatherProject extends Component {
  constructor(props) {
    super(props);
    this.state = { forecast: { main: '', description: '', temp : 0 } };
    this._getForecast = this._getForecast.bind(this);
    this._getForecastForZip = this._getForecastForZip.bind(this);
    this._getForecastCoords = this._getForecastCoords.bind(this);
    this._handleTextChange = this._handleTextChange.bind(this);
  }

  componentDidMount() {
    AsyncStorage.getItem(STORAGE_KEY)
    .then(value => {
      if (value !== null) {
        this._getForecastForZip(value);
      }
    })
    .catch(err => new Error(err))
    .done();
  }

  _getForecastForZip(zip = 'seoul') {
    AsyncStorage.setItem(STORAGE_KEY, zip)
    .then(() => console.log('saved'))
    .catch(err => new Error(err))
    .done();
    this._getForecast(`${API_STEM}q=${zip}&units=imperial&APPID=${WEATHER_API_KEY}`);
  }

  _getForecastCoords(lat, lon) {
    this._getForecast(`${API_STEM}lat=${lat}&lon=${lon}&units=imperial&APPID=${WEATHER_API_KEY}`);
  }

  _getForecast(url, cb) {
    fetch(url)
      .then((response) => response.json())
      .then((responseJSON) => {
        this.setState({
          forecast: {
            main: responseJSON.weather[0].main,
            description: responseJSON.weather[0].description,
            temp: responseJSON.main.temp
          }
        });
      })
      .catch((error) => {
        console.warn(error);
      });
  }

  _handleTextChange(event) {
    console.log('changed', event.nativeEvent.text);
    this._getForecastForZip(event.nativeEvent.text);
  }

  render() {

    return (
      <PhotoBackdrop>
        <View style={styles.overlay}>
          <View style={styles.row}>
            <Text style={textStyles.mainText}>
               Current weather for
            </Text>
            <View style={styles.zipContainer}>
              <TextInput
                style={[textStyles.mainText, styles.zipCode]}
                returnKeyType='go'
                onSubmitEditing={this._handleTextChange}
              />
            </View>
          </View>
          <View style={styles.row}>
            <LocationButton onGetCoords={this._getForecastCoords} />
          </View>
            <View style={styles.row}>
              <Forecast
                main={this.state.forecast.main}
                description={this.state.forecast.description}
                temp={this.state.forecast.temp}
              />
            </View>
        </View>
      </PhotoBackdrop>
    );
  }
}
