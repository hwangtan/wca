## iOS 네이티브 모듈

`react-native-video` 를 통해 iOS 네이티브 모듈 사용에 대해서 알아 보겠습니다.

`npm install react-native-video --save` 명령어를 통해서 설치를 해줍니다.

import 로 호출하여 사용하기전에 xCode 에서 추가 작업이 필요 합니다.

저는 이 작업을 자바에서 JAR 를 추가하는일에 비유하고 싶습니다.

xCode 를 오픈하고 프로젝트를 호출하여 마우스를 우클릭하면 *Add Files to '프로젝트명'* 을 선택 합니다.

앞서 npm install 로 설치 했던 react-native-video 경로에서 *RCTVideo.xcodeproj* 를 추가 합니다.

`/node_modules/react-native-video/ios/RCTVideo.xcodeproj`

Libraries 에 추가된 모습을 확인해 볼수 있습니다.

이제 프로젝트에 해당 라이브러리를 사용하기 위한 링크를 추가해 줘야 합니다.

프로젝트를 선택 하고 해당경로로 이동 합니다.

Targets > 프로젝트명 > Build Phases > Link Binary With Libraries

하단에 있는 +버튼을 누르면 라이브러리를 검색할수 있습니다.

여기서 추가해준 libRCTVideo.a 파일을 추가 합니다.

Video 를 사용하기 위한 설정 과정이 완료 되었습니다.

사용방법은 매우 간단 하기 때문에 따로 설명하지 않겠습니다.

https://www.npmjs.com/package/react-native-video

책에 있는 내용과 다른점은 source 를 지정해주는데 책에 있는 대로, 확장자를 생략하니 파일을 찾지 못했습니다.

그래서 확장자를 붙이는 방식으로 해결했습니다.

### Objective-C 네이티브 모듈

RN 에서는 네이티브 모듈을 불러와 사용할수 있습니다. 이점이 매우 흥미로웠습니다.

옵씨는 .h 헤더 파일에 인터페이스를 작성하고 .m 옵씨 파일에 인터페이스를 구현하는 방식에 코드로 이루어져 있습니다.

책에서는 새로운 언어를 배울때 익숙한 헬로월드를 구현하고 있습니다.
```objective-c
// HelloWorld.h
#import <React/RCTBridgeModule.h>

@interface HelloWorld : NSObject <RCTBridgeModule>
@end


// HelloWorld.m
#import "HelloWorld.h"
#import <React/RCTLog.h>

@implementation HelloWorld

RCT_EXPORT_MODULE();

RCT_EXPORT_METHOD(greeting:(NSString *)name) {
  RCTLogInfo(@"Saluton, %@", name);
}

@end
```

해당 코드는 엑스코드에서 파일을 추가하여 작성합니다.

이제 자바스크립트로 호출 하는일만 남았습니다.

```js
import { NativeModules } from 'react-native';
const HelloWorld = NativeModules.HelloWorld;
HelloWorld.greeting('hi');
```
## Android 모듈
