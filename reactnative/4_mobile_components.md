
## Description

지난 시간에 간단한 날씨 프로젝트 만들었습니다.

책의 내용대로 인라인 스타일을 적용하면 원하는 화면이 나오지 않지만

이부분은 5장에서 스타일을 공부하여 수정해볼 계획 입니다.

과정속에서 우리는 리액트 네이티브에서 사용하는 기본 컴포넌트를 자연스럽게

사용해볼 기회를 가졌습니다.

각 컴포넌트에 대해서 상세한 정리는 불필요하다고 생각 합니다.

리액트 네이티브는 그만큼 쉽습니다.

그래서 체크 포인트만 정리하도록 하겠습니다.

### Text

RN 에서는 Text 컴포넌트만이 플레인 텍스트 노드를 자식으로 가질수 있습니다.

```js
// WRONG
<View>
 Hello?
</View>

// GOOD
<View>
 <Text>Hello?</Text>
</View>
```

리액트 네이티브가 JSX 기반의 문법이고 자바스크립트로 개발하지만, 웹과 그 개념을 분명히 해야할

부분을 설명 하겠습니다.

```html
<p>Hello <strong>My Friend</strong></p>
```

여러분이 보시는것은 html 코드 입니다.

RN 에선 이것이 불가능 합니다.

```js
const styles = StyleSheet.create({
   textWeight: 'bold',
});
<Text>Hello
  <Text style={styles.textWeight}>My Friend</Text>
</Text>
```

RN 에서는 해당방식으로 코드를 작성 합니다.

그런데 이런 방식으로 컴포넌트를 구현하다보면 코드가 금방 더러워 질것 입니다.

그래서 페이스북에서는 컴포넌트화 하여 사용하는 방식을 권장 합니다.

```js
const styles = StyleSheet.create({
   textWeight: 'bold',
});

const Strong = () =>
 <Text style={styles.textWeight}>{this.props.children}</Text>;

 <Text>Hello
   <Strong>My Friend</Strong>
 </Text>
```

### Image

이미지 컴포넌트의 사용법은 매우 간단 합니다.

다만 크로스 플랫폼 이기 때문에 각 자원이 위치하는 경로를 이해할 필요가 있습니다.

```js
<Image source={require('image!red')} />

<Image source={{ uri: 'image location'}} />

<Image source={require('image!red')}>
  //container
</Image>
```

IOS 는 에셋폴더에 AOS 는 프로젝트 폴더내에 이미지가 들어가 있으면 됩니다.

RN 은 상대 경로로 이미지의 위치를 해석합니다.

네트워크를 통해 이미지를 호출할 수도 있는데 프로토타입 개발에서 사용하는 경우가 많습니다.

또한 Image 자체가 컨테이너로 백그라운드 이미지로 사용될수 있습니다.


### Touch

터치 이벤트는 TouchableHighlite 컴포넌트를 사용 합니다.

이책에선 onPressIn , onPressOut, onLongPress 를 설명 하는데

책과는 달리 리액트 네이티브 공식 문서에 따라 최신 내용에 대해서 설명을 하겠습니다.

1. 해당 컴포넌트의 하위 컴포넌트는 하나만 존재 해야 합니다.

여러 요소를 가지려면 View 로 래핑 합니다.

```js
// Good
<TouchableHighlite>
 <View>
    <Text>hi</Text>
    <Text>hi</Text>
 </View>
</TouchableHighlite>
// impassable
<TouchableHighlite>
    <Text>hi</Text>
    <Text>hi</Text>
</TouchableHighlite>
```

2. TouchableHighlite 가지는 고유한 속성은 다음과 같습니다.

```
activeOpacity ?: PropTypes.number
onHideUnderlay ?: PropTypes.func
onShowUnderlay ?: PropTypes.func
underlayColor ?: color
// iOS
hasTVPreferredFocus? PropTypes.bool
tvParallaxProperties ?: PropTypes.object
```
3. TouchableWithoutFeedback

예제에서 호출하는 onPressIn , onPressOut, onLongPress 이벤트가

해당 요소에 해당됩니다.

RN 에서는 해당 요소를 좋은 명분이 없는한 사용하지 말라고 합니다.

모든 요소가 각각의 피드백을 가져야 하는데 터치어블은 하나의 하위 요소만

갖기 때문인것 같습니다.

//https://facebook.github.io/react-native/docs/touchablewithoutfeedback.html#props


```js
class Touch extends Component {
  constructor(props) {
      super(props);
      this.state = {
        checked: false,
      };
  }

  render() {
    return (
      <View style={styles.container}>
        <TouchableHighlight
          activeOpacity={2}
          underlayColor={'white'}
          onPress={() => this.setState({ checked: true })}
          onShowUnderlay={() => this.setState({ checked: true })}
          onHideUnderlay={() => this.setState({ checked: false })}
        >
        <View>
          <Text style={styles.welcome}>
            {this.state.checked ? 'Hello' : 'Hi' }
          </Text>
        </View>
      </TouchableHighlight>
      </View>
    );
  }
}
```

### Gesture

터치를 뛰어넘는 자신만의 인터렉션을 만들고 싶을땐 RN 에서

GestureResponder 와 PanResponder API 를 제공 한다고 되어 있습니다.

제스처 리스폰더는 저수준 API, 팬 리스폰더는 고수준 API 라고 설명하고 있습니다.

1. GestureResponder

앞서 TouchableHighlight 를 설명하였는데 해당컴포넌트나 View 등 터치에 대한 응답을 할수 있는 컴포넌트를

터치 응답자라고 합니다. 터치 응답자는 4가지 속성이 구현되있어야 하며 다음과 같습니다.

- onStartShouldSetResponder
- onMoveShouldSetResponder
- onResponderGrant
- onResponderReject

제스처 리스폰더는 저수준API 에 해당하기 떄문에 펜 리스폰더에 대해서 조금더 구체적으로 설명하겠습니다.

2. PanResponder

예제 코드에 주석을 달아 놓았습니다.

결론적으론, 상황에 따라 TouchableHighlight, GestureResponder, PanResponder 를 사용하지만

대부분의 경우 PanResponder 를 사용한다고 합니다.

```js
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  PanResponder,
  Text,
  View
} from 'react-native';

const CIRCLE_SIZE = 40;
const CIRCLE_COLOR = 'blue';
const CIRCLE_HIGLIGHT_COLOR = 'green';

class TouchExample extends Component {
  // Set some initial values.
  _panResponder = {}
  _previousLeft = 0
  _previousTop = 0
  _circleStyles = {}
  circle = null

  constructor(props) {
      super(props);
      this.state = {
        numberActiveTouches: 0, // 현재 화면상에 존재하는 터치의 갯수
        moveX: 0, // 최근에 움직인 터치의 마지막 스크린 x 좌표
        moveY: 0, // 최근에 움직인 터치의 마지막 스크린 y 좌표
        x0: 0, // 응답자로 승인된 시점의 터치 스크린 x 좌표
        y0: 0, // 응답자로 승인된 시점의 터치 스크린 y 좌표
        dx: 0, // 터치가 시작된 이후에 x축 이동거리
        dy: 0, // 터치가 시작된 이후에 y축 이동거리
        vx: 0, // 현재 제스처의 x축 속도
        vy: 0, // 현재 제스처의 y축 속도
      };
  }

  componentWillMount(){
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: this._handleStartShouldSetPanResponder,
      onMoveShouldSetPanResponder: this._handleMoveShouldSetPanResponder,
      onPanResponderGrant: this._handlePanResponderGrant,
      onPanResponderMove: this._handlePanResponderMove,
      onPanResponderRelease: this._handlePanResponderEnd,
      onPanResponderTerminate: this._handlePanResponderEnd,
    });

    this._previousLeft = 20;
    this._previousTop = 84;
    this._circleStyles = {
      style: {
        left: this._previousLeft,
        top: this._previousTop,
      },
    };
  }

  componentDidMount() {
    this._updatePosition();
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          ref={(circle) => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers} />
        <Text>
          {this.state.numberActiveTouches} touches,
          dx: {this.state.dx},
          dy: {this.state.dy},
          vx: {this.state.vx},
          vy: {this.state.vy},
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View
          ref={(circle) => {
            this.circle = circle;
          }}
          style={styles.circle}
          {...this._panResponder.panHandlers}/>
        <Text>
          {this.state.numberActiveTouches} touches,
          dx: {this.state.dx},
          dy: {this.state.dy},
          vx: {this.state.vx},
          vy: {this.state.vy}
        </Text>
      </View>
    );
  }

  _highlight = () => {
    this.circle && this.circle.setNativeProps({
      style: {
        backgroundColor: CIRCLE_HIGLIGHT_COLOR
      }
    });
  }

  _unHighlight = () => {
    this.circle && this.circle.setNativeProps({
      style: {
        backgroundColor: CIRCLE_COLOR
      }
    });
  }

  _updatePosition = () => {
    this.circle && this.circle.setNativeProps(this._circleStyles);
  }

  _handleStartShouldSetPanResponder = (e: Object, gestureState: Object) => {
    // 원을 눌렀을때 활성화 여부
    return true;
  }

  _handleMoveShouldSetPanResponder = (e: Object, gestureState: Object) => {
    // 터치한 채로 원 위를 지나갈때 활성화
    return true;
  }

  _handlePanResponderGrant = (e: Object, gestureState: Object) => {
    this._highlight();
  }

  _handlePanResponderMove = (e: Object, gestureState: Object) => {
    this.setState({
      stateID: gestureState.stateID,
      moveX: gestureState.moveX,
      moveY: gestureState.moveY,
      x0: gestureState.x0,
      y0: gestureState.y0,
      dx: gestureState.dx,
      dy: gestureState.dy,
      vx: gestureState.vx,
      vy: gestureState.vy,
      numberActiveTouches: gestureState.numberActiveTouches
    });
    // dx , dy 를 통해 현재 위치를 계산한다.
    this._circleStyles.style.left = this._previousLeft + gestureState.dx;
    this._circleStyles.style.top = this._previousTop + gestureState.dy;
    this._updatePosition();
  }

  _handlePanResponderEnd = (e: Object, gestureState: Object) => {
    this._unHighlight();
    this._previousLeft += gestureState.dx;
    this._previousTop += gestureState.dy;
  }
}

```
