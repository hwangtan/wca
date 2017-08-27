import React, {
 Component,
} from 'react';

import { Image } from 'react-native';
import styles from './styles/photoStyle';

export default class PhotoBackdrop extends Component {
  render() {
    return (
      <Image
        style={styles.backdrop}
        source={require('./601.png')}
        resizeMode='cover'>
          {this.props.children}
        </Image>
    );
  }
}
