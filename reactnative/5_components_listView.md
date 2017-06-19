## ListView

리스트뷰는 대표적인 구조를 잡는 컴포넌트 입니다.

속성으로 dataSource 와 renderRow 를 필수값으로 가집니다.

renderRow 는 컴포넌트를 랜더해서 리턴하는 함수를 바인딩 시켜주고

dataSource 는 여기에 사용하는 데이터를 상태값으로 설정해주면 되는데 해당 내용은

코드로 설명 드리겠습니다.

```js
'use strict';

import React, { Component } from 'react';
import { ListView, View, Text } from 'react-native';

 class LVTest extends Component {
   constructor(props) {
     super(props);
     const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
     this.state = {
       dataSource: ds.cloneWidthRows(['a', 'b', 'c']),
     };
   }

   _renderRow(rowData) {
     return <Text>{rowData}</Text>;
   }

   render() {
     return (
       <View>
        <ListView
          dataSOurce={this.state.dataSource}
          renderRow={this._renderRow}
        />
       </View>
     );
   }
 }
```

정적인 데이터를 리스트뷰의 아이템으로 채워넣었습니다. 이정도 예제만으로도 리스트 뷰 컴포넌트의 작동원리를

설명하는데 충분할것 입니다. 책에선 패치를 통해 api 를 호출하여서 리스뷰의 아이템을 채워 넣게 됩니다.

책이나 책에서 제공하는 저장소를 이용하여 코드를 보고 한번쯤은 직접 타이핑해 보실것을 추천 드립니다.

그럼 이제 책의 내용과 다른부분, 그리고 주의해야할 사항에 대해서만 짚고 넘어가도록 하겠습니다.

1. fetch 는 반드시 catch 핸들러를 통해 에러를 리턴해야 합니다.

예제코드에선 then을 채이닝 시키는것으로 제이슨 객체를 불러와서 데이터를 바인딩하는부분에서 끝나지만

이는 플랫폼에서 오류를 발생시킵니다.

그래서 다음과 같은 방식으로 사용을 해야 합니다

```js
fetch(API_TARGET)
  .then(response => response.json())
  .then(json => this.setState({ dataSource: ds.cloneWidthRows(json.books) }))
  // 추가
  .catch(err => throw new Error(err));
```

2. iOS 로컬 환경에서 요청을 처리하기 위한 네트워크 관련 설정을 해야 합니다.

표현이 정확히 맞는지 모르겠습니다.

iOS 로 해당 예제를 실행시키면 네트워크 에러가 발생되는데 엑스코드로 프로젝트를 열어서

`info.plist` 파일에 속성을 추가시켜줘야 합니다.

**Xcode 에서 수정 방법**

![XcodeSetting](/images/infolist_xcode.png)

AppTransportSecurity 에서 + 키를 누르고

allows arbitrary loads 를 추가시킨뒤 값을 boolean 값에 True 로 설정 합니다.

(참고)[https://stackoverflow.com/questions/38418998/react-native-fetch-network-request-failed]

## Switch

스위치 컴포넌트는 안드로이드와 iOS 간에 별게의 컴포넌트가 있었다가 통합된것 같습니다.

스위치는 onValueChange:func 와 `value:bool` 속성을 가집니다.
