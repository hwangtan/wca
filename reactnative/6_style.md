## 스타일

스타일은 인라인스타일을 사용 합니다.

구조화 및 상속을 위해 `StyleSheet.create({})` 를 통해 스타일을 사용하는것이 좋습니다.

책에서 작성된 모든 예제 파일의 스타일은 에뮬레이터에서 정상적으로 보이지 않는 문제가 있어서

저희는 스타일을 좀더 중요하게 다룰 필요성이 있다고 느꼈습니다.

그래서 책에서 다루는 예제와 함께 공식문서도 함께 참고 하고자 합니다.

### Flexbox

플렉스 박스는 CSS3 의 레이아웃 모드 입니다.

RN 에서는 다음과 같은 flexbox prop 을 사용할수 있으며 CSS3 의 다음속성과 밀접한 연관을

가지고 있습니다.

```
flex == height
flexDirection == width
flexWrap == margin
alignSelf == border
alignItems == padding
```

flex 는 공간을 기준으로 구성 요소를 동적으로 확장 축소 하는데 사용 합니다. 1을 기준으로

랩핑되며, 값이 높을 수록 차지하는 공간이 많아 집니다.

justifyContent 는 주축을 따라 자식을 정렬 합니다.

`flex-start, center, flex-end, space-around, space-between`  값을 지정해 줄수 있습니다.

alignItems 는 보조 축을 따라 자식을 정렬 합니다.

`row, column, flex-start, center, flex-end, stretch` 값을 지정해 줄수 있습니다.

스타일의 마지막장은 몬드리안의 모자이크를 예제로 flex 와 flexDirection 에 대한 이해를 돕고 있습니다.

꼭 작성해보시길 바랍니다.

필자는, 가이드문서이 있는 웹 에디터에서 이해를 바탕으로 만들어 봤습니다.

![ReactNative](/images/style.png)
