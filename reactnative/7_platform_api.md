## 플랫폼 API

앞서 간단하게 만들었던 날씨 어플리케이션을 지리적 위치 추적 api 를 통해 고도화 시키는것이 6장에 목표

입니다.

### 지리적 위치 정보 이용하기
RN 은 geolocation 을 기본적으로 제공 하는데 MDN 에 geolocation api 웹 명세서를 따르는 데이터를 리턴 합니다.

사용자의 위치정보를 추적하는 코드는 다음과 같습니다.

```js
navigator.geolocation.getCurrentPosition(
  (position) => console.log(position),
  (error) =>  console.log(error),
  { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 });
```

보이는대로 `navigator.geolocation.getCurrentPosition` 을 호출 하며, 첫번째 인자는 필수값으로

성공 콜백, 두번째는 실패(에러) 콜백, 세번째 인자는 옵션입니다.

성공 콜백에는 좌표와 타임스탬프가 들어가 있습니다.

모바일 디바이스가 아니더라도 노트북에서 크롬 개발자 도구 콘솔 모드를 통해서도 확인이 가능 합니다.

![ReactNative](/images/position.png)

### 사용자 위치 감시 하기

```js
// 감시를 시작 합니다.
const WATCHID = navigator.geolocation.watchPosition((position) => console.log(position));


//감시를 종료 합니다.
navigator.geolocation.clearWatch(WATCHID);
```

### 지리적 위치 정보 이용에 관한 팁

1. RN 에서 위치 정보는 MDN 명세에 따르기 떄문에 확장기능은 직접 이식해야 합니다. (iOS 에 geofencing)

2. iOS 시뮬레이터에서 위치 정보를 조작하여 테스트를 해볼수 있습니다.
 - debug -> location -> custom location


### 날씨 어플리케이션 고도화 하기

여기서는 모든 소스를 입력하여 불필요한 라인을 생산하지 않도록 하겠습니다.

작동이 되는 코드는 *source/smarterWeather* 에 올려놓았습니다.

해당 예제를 통해 무엇을 경험할수 있는지에 대해서만 설명 하겠습니다.

#### 카메라롤 모듈

사용자의 모바일 디바이스에서 앨범에 접근하는 방법을 보여 줍니다.

```js
import { CameraRoll } from 'react-native';

CameraRoll.getPhotos({ options...},
  (success) => console.log(success),
  (error) => console.log(error));
```

보시는바와 같이 첫번째인자로 옵션, 성공콜백, 실패콜백 순으로 인자를 받게 됩니다.

옵션으로는 first, after, groupTypes, groupName, assetType, mimeTypes 가 있습니다.

옵션에 대해서 자세히 설명하지 않겠습니다. 카메라롤의 레퍼런스 가이드를 참고 바랍니다.

https://facebook.github.io/react-native/docs/cameraroll.html

이외에도 iOS 는 ImagePickerIOS 모듈을 사용하여 구현하는 방법이 있습니다.

https://facebook.github.io/react-native/docs/imagepickerios.html

#### AsyncStorage

웹에서 사용하는 로컬 스토리지와 사용방법이 유사 합니다.

책에서 설명하는 명명규칙은 키값으로 `@앱이름:키` 형태를 사용하는것이 일반적이라고 설명 하고 있습니다.

```js
 import { AsyncStorage } from 'react-native';
   //get
 AsyncStorage
   .getItem('@weather:value')
   .then((value) => console.log(value))
   .catch(err => Error(err))
   .done();
   //set
 AsyncStorage
   .setItem('@weather:value', 'hello world!')
   .then(() => console.log('hi'))
   .catch(err => Error(err))
   .done();
```
비동기 저장소란 이름에 걸맞게 프로미스 객체를 리턴 합니다.

이외에도 스토어가 가지고 있는 키병합, 키삭제, 모든키 호출등에 함수를 제공 하고 있습니다.


## 정리

위치 정보 추적, 카메라롤 접근, 로컬 스토리지 활용 3가지를 사용해 봤습니다.
