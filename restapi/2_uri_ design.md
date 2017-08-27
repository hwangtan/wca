## URI 형태

식별자로 할 수 있는 유일한 일은 대상을 나타내는 것이다. 역참조를 할 때가 아니라면 다른 정보를 얻기 위해서 URI의 내용을 들여다보지 말아야 한다.

URI = scheme “ :// ” authority “ / ” path [“ ? ” query] [“ # ” fragment ]

규칙: 슬래시 구분자(/)는 계층 관계를 나타내는 데 사용한다
포워드 슬래시(/)는 경로path 내에서 리소스 간의 계층 관계를 나타내는 데 사용한 다. 예를 들면 다음과 같다.
http://api.canvas.restapi.org/shapes/polygons/quadrilaterals/squares
규칙: URI 마지막 문자로 슬래시(/)를 포함하지 않는다
URI 경로 마지막에 있는 슬래시는 아무런 의미가 없지만, 혼란을 초래할 수 있다. 그러므로 REST API의 마지막 글자에 슬래시가 와서는 안 되고 클라이언트에 제공 하는 링크에도 그런 API를 포함하면 안 된다.
많은 웹 컴포넌트와 프레임워크에서는 다음 두 URI를 같은 것으로 취급한다.
http://api.canvas.restapi.org/shapes/ http://api.canvas.restapi.org/shapes

규칙: 하이픈(-)은 URI 가독성을 높이는 데 사용한다
URI를 쉽게 읽고 해석하기 위해, 긴 URI 경로에 하이픈을 사용해서 가독성을 높 인다. URI에서는 문장 내 공백을 하이픈으로 바꿀 수 있다.

규칙: 밑줄( _ )은 URI에 사용하지 않는다
텍스트 뷰어 애플리케이션은 클릭할 수 있다는 표시로 URI에 밑줄을 긋는다. 글꼴 에 따라 다르긴 하지만, 밑줄은 보기 어렵거나 밑줄 때문에 문자가 완전히 가려지 기도 한다. 이런 문제를 피하기 위해 밑줄 대신 하이픈을 사용해야 한다(“규칙: 하 이픈(-)은 URI 가독성을 높이는 데 사용한다” 참조).
규칙: URI 경로에는 소문자가 적합하다
URI 경로에 대문자를 사용하면 문제가 될 수 있으므로 소문자를 사용한다. RFC 3986은 URI 스키마와 호스트를 제외하고는 대소문자를 구별하도록 규정한다. 예 를 들면 다음과 같다.
http://api.example.restapi.org/my-folder/my-doc ➊ HTTP://API.EXAMPLE.RESTAPI.ORG/my-folder/my-doc ➋ http://api.example.restapi.org/My-Folder/my-doc ➌
1은 괜찮다.
2는 URI 포맷 스펙(RFC 3986)에서 1과 같은 것으로 간주한다.
3은 1, 2와는 다른 URI다. 대소문자를 섞어 사용하게 되면 때로 혼란을 일으킬
수 있다.

규칙: 파일 확장자는 URI에 포함시키지 않는다
웹에서 점(.) 문자는 URI에서 파일 이름과 확장자를 구분하는 데 사용한다. 하지 만 REST API에서는 메시지 바디 내용의 포맷을 나타내기 위한 파일 확장자를 URI 안에 포함하지 않아도 된다. 대신 이 확장자는 미디어 타입에 의존하는데, Content-Type 헤더를 통해 전달되고 메시지 바디의 내용을 어떻게 처리할지 결 정한다. 미디어 타입은 4장 ‘미디어 타입’에서 더 자세히 다룰 것이다.


## URI 권한 설계 

규칙: API에 있어서 서브 도메인은 일관성 있게 사용해야 한다
API 최상위 도메인과 1차 서브 도메인 이름(예, soccer.restapi.org)으로 서비스 제공자를 식별해야 한다. API의 전체 도메인 이름에 api라는 서브 도메인을 다음 과 같이 붙여야 한다.
http://api.soccer.restapi.org

규칙: 클라이언트 개발자 포탈 서브 도메인 이름은 일관성 있게 만들어야 한다
보통 REST API는 개발자 포탈Developer Portal이라는 개발자들을 위한 웹 사이트를 지원한다. 이 포탈은 웹 사이트의 문서, 포럼, 포탈 내에서 직접 제공하는 안전한 API 접근키를 이용하여 새로운 클라이언트를 만드는 데 도움을 준다. API가 이러 한 개발자 포탈을 제공하는 경우, 관습적으로 developer라는 이름의 서브 도메인 을 만든다.
http://developer.soccer.restapi.org

## 리소스 모델링


URI 경로는 REST API의 리소스 모델을 다루는데, 포워드 슬래시(/)로 경로 구문 을 나눈다. 이 경로 구문은 리소스 모델 계층에서 유일한 리소스에 해당된다. 다음 예를 보자.
http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet
이 URI 디자인은 다음과 같은 자체 리소스 주소를 가진 URI가 있다는 것을 뜻한다.
http://api.soccer.restapi.org/leagues/seattle/teams http://api.soccer.restapi.org/leagues/seattle http://api.soccer.restapi.org/leagues http://api.soccer.restapi.org
리소스 모델링은 API의 주요 개념을 확실하게 잡는 훈련과도 같다. 이 과정은 마치 관계형 데이터베이스 스키마를 정의하기 위한 데이터 모델링이나, 객체 지향 시스 템에서의 클래스 모델링과 유사하다. URI 경로 설계에 들어가기 전, REST API의 리소스 모델에 대해 생각해 보는 것이 도움될 것이다.

## 리소스 원형

API 리소스를 모델링할 때, 기본적인 리소스 원형 몇 개를 가지고 시작할 수 있다. 설계자는 리소스 원형을 이용하여 디자인 패턴에서와 같이, REST API 디자인에서 보편적으로 쓰이는 리소스의 구조와 행동을 일관된 방식으로 다룰 수 있다.
리소스 모델로 명확하고 정확하게 클라이언트와 통신하려면, REST API는 리소스 원형 중에서 리소스 하나로만 설계해야 한다. 일관성을 위해 리소스 원형 하나 이상을 이용하여 리소스를 설계하지 않 도록 주의를 기울여야 한다. 대신, 링크를 통해 계층적으로 연관될 수 있는 분리된 리소스 설계를 고민해 야 한다.
 도큐먼트
도큐먼트 리소스는 객체 인스턴스나 데이터베이스 레코드와 유사한 단일 개념이 다. 일반적으로 도큐먼트의 상태 표현은 값을 가진 필드와 다른 관련 리소스와의 링크 둘 다를 가지게 된다. 기본적인 필드와 링크 기반 구조로 인해, 도큐먼트 타입 은 다른 리소스 원형들의 기반 원형이 된다. 즉, 서로 다른 리소스 원형 세 개는 도 큐먼트 원형에서 분리된 것이라 볼 수 있다.
다음 URI는 각각 도큐먼트 리소스를 나타낸다.
http://api.soccer.restapi.org/leagues/seattle http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet/players/mike
도큐먼트 리소스는 자식 리소스를 가질 수 있는데, 이 자식 리소스는 특정한 종속 개념을 표현한다. 단일 부모 하나는 여러 가지 다른 리소스 타입을 가질 수 있어서, 논리적으로 도큐먼트는 docroot로 알려진 REST API 루트 리소스 후보에 해당한 다. 다음 예로 든 URI는 docroot를 나타내는데, Soccer REST API의 공개된 진입

점entry point을 의미한다. http://api.soccer.restapi.org
컬렉션
컬렉션 리소스는 서버에서 관리하는 디렉터리라는 리소스다. 클라이언트는 새로 운 리소스를 제안해서 컬렉션에 포함시킬 수 있다. 그러나 새로운 리소스를 생성할 지는 컬렉션에 달려 있다. 컬렉션 리소스에 포함하고 싶은 것을 선택하고, 포함된 각 리소스의 URI를 결정한다. 다음의 각 URI는 컬렉션 리소스를 나타낸다.
http://api.soccer.restapi.org/leagues http://api.soccer.restapi.org/leagues/seattle/teams http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet/players
스토어
스토어는 클라이언트에서 관리하는 리소스 저장소다. 스토어 리소스는 API 클라 이언트가 리소스를 넣거나 빼는 것, 지우는 것에 관여한다. 스토어 스스로 새로운 리소스를 생성하지 못하기 때문에, 새로운 URI를 만들지는 못한다. 대신 리소스는 스토어에 처음 저장될 때, 클라이언트가 선택한 URI를 가진다. 다음은 클라이언트 프로그램에서 ID가 1234인 사용자를 보여주고, 가상의 Soccer REST API를 사용 하여 favorites라는 스토어에 alonso라는 도큐먼트 리소스를 넣는 예다.
PUT /users/1234/favorites/alonso

컨트롤러
컨트롤러 리소스는 절차적인 개념을 모델화한 것이다. 컨트롤러 리소스는 실행 가 능한 함수와 같아서 파라미터(입력 값)와 반환 값(출력 값)이 있다.
전통적인 웹 애플리케이션이 'HTML form'을 사용하듯이, REST API는 CRUD라 고 알려진 표준적인 메서드와는 논리적으로 매핑되지 않는 애플리케이션 고유의 행동을 컨트롤러 리소스의 도움을 받아 수행한다.
일반적으로 컨트롤러 이름은 URI 경로의 제일 마지막 부분에 표시되며, 계층적으 로 뒤따르는 자식 리소스는 없다. 다음 예제는 클라이언트가 사용자에게 경고를 재 전송하게 하는 컨트롤러 리소스다.
POST /alerts/245743/resend


## URI 경로 디자인

슬래시(/)로 구분된 각 URI 경로 부분은 다양한 형태로 설계할 수 있다. URI 경로 각 부분에 의미 있는 값들을 줌으로써 REST API 리소스 모델 디자인의 계층적 구 조를 분명하게 표현할 수 있다.
그림 2-1은 WRML 표기법을 사용하여, URI 경로 설계와 이를 통해 표현하려는 리소스 모델의 관계를 나타낸 것이다.

이 부분에서는 URI 경로를 디자인할 수 있는 규칙을 설명한다.
규칙: 도큐먼트 이름으로는 단수 명사를 사용해야 한다
도큐먼트 리소스를 나타내는 URI는 단수 명사나 명사구를 포함하는 경로 부분으 로 이름을 짓는다. 예를 들면, 한 명의 선수 도큐먼트를 나타내는 URI는 단수 형태 가 되어야 한다.
http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet/players/claudio
규칙: 컬렉션 이름으로는 복수 명사를 사용해야 한다
컬렉션을 식별하는 URI는 복수 명사나 복수 명사구를 나타내는 명사로 경로의 이 름을 지어야 한다. 그리고 컬렉션 이름은 균일하게 포함되도록 선택해야 한다.
예를 들어, 선수 도큐먼트의 컬렉션 URI는 포함된 리소스의 복수 명사 형태로 나 타낸다.
http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet/players

규칙: 스토어 이름으로는 복수 명사를 사용해야 한다
리소스 스토어를 나타내는 URI는 복수 명사, 복수 명사구로 표현해야 한다. 음악 플레이리스트 스토어의 URI는 다음과 같은 복수 명사 형태를 사용할 수 있다.
http://api.music.restapi.org/artists/mikemassedotcom/playlists
규칙: 컨트롤러 이름으로는 동사나 동사구를 사용해야 한다
프로그램에 사용하는 함수처럼, 컨트롤 리소스를 나타내는 URI는 동작을 포함하는 이름으로 지어야 한다. 예를 들면 다음과 같이 짓는다.
http://api.college.restapi.org/students/morgan/register http://api.example.restapi.org/lists/4324/dedupe http://api.ognom.restapi.org/dbs/reindex http://api.build.restapi.org/qa/nightly/runTestSuite
규칙: 경로 부분 중 변하는 부분은 유일한 값으로 대체한다
URI 경로 부분은 REST API 디자이너가 정해준 이름만 사용하기도 하지만, 어떤 경로 부분은 변수처럼 변환하며 유일한 식별자로 자동적으로 채워지기도 한다. 디 자이너는 URI 템플릿 문법을 이용하여 변하지 않는 부분과 변하는 부분 모두를 명 확하게 설계할 수 있다. URI 템플릿02에 포함된 변수는 최종적으로 유일한 값으로 대체되어야 한다. 다음 템플릿 예는 변수를 세 개(leagueId, teamId, playerId) 가지고 있다.
http://api.soccer.restapi.org/leagues/{leagueId}/teams/{teamId}/players/{playerId}
REST API 자체나 클라이언트가 URI 템플릿에 있는 변수를 실제 값으로 대체한다.

대체되는 각 실제 값은 숫자나 알파벳으로 나타낸다. 다음 예를 보자.
http://api.soccer.restapi.org/leagues/seattle/teams/trebuchet/players/21 ➊ http://api.soccer.restapi.org/games/3fd65a60-cb8b-11e0-9572-0800200c9a66 ➋
1 21이라는 값이 playerId를 대체하고 있다. 2 UUID 값이 gameId를 대체하고 있다.
REST API의 클라이언트에서는 URI가 하나의 유의미한 리소스 식별자임을 고 려해야 한다. 백엔드 시스템의 식별자(이를 테면, 데이터베이스의 ID와 같은)가 URI 경로에 표시될 수 있지만, 이는 클라이언트 코드 입장에서는 별로 의미가 없 다. URI를 유일한 ID로 사용해야만 기존 클라이언트에 영향을 미치지 않고, REST API의 백엔드 시스템을 개선할 수 있다.
규칙: CRUD 기능을 나타내는 것은 URI에 사용하지 않는다
CRUD 기능을 수행하는 내용은 URI에 나타내지 않는다. URI는 리소스를 식별하 는 데만 사용해야 하고, 위에서 설명한 내용을 바탕으로 설계되어야 한다. 3장 ‘요 청 메서드’에서 언급하겠지만, HTTP 리퀘스트 메서드는 CRUD 기능을 수행하는 것을 의미할 때 사용한다. 예를 들어 다음과 같은 API 디자인 패턴이 그 아래에 있 는 패턴보다 더 좋은 디자인이다.
DELETE /users/1234
다음 예는 사용해서는 안 되는 디자인이다.
GET /deleteUser?id=1234 GET /deleteUser/1234 DELETE /deleteUser/1234 POST /users/1234/delete


## URI Query 디자인


이 부분에서는 URI 쿼리의 설계 규칙을 설명할 것이다. RFC 3986에서 URI 쿼리 는 선택사항이고 경로와 다른 선택사항인 프래그먼트fragment 사이에 온다.
URI = scheme “://” authority “/” path [ “?” query ] [ “#” fragment ]
URI 구성요소인 쿼리는 유일한 리소스를 식별하는 데 도움을 준다. 다음 예를 보자.
http://api.college.restapi.org/students/morgan/send-sms ➊ http://api.college.restapi.org/students/morgan/send-sms?text=hello ➋
1은 sms 문자를 보내는 컨트롤러 리소스 URI다.
2는 ‘hello’라는 sms 문자를 보내는 컨트롤러 리소스 URI다.
URI 쿼리 구성요소는 파라미터들로 되어 있고, 이 파라미터는 경로의 구성요소에 의해 계층적으로 식별된 리소스의 변형이나 파생으로 해석될 수 있다. 따라서 리소 스 ➊과 ➋는 정확히 같지는 않지만, 서로 매우 밀접하게 연관되어 있다.
쿼리 구성요소는 클라이언트에 검색이나 필터링 같은 추가적인 상호작용 능력을 제공한다. 그러나 URI의 다른 구성요소와는 달리, 쿼리 부분은 REST API 클라이 언트에 반드시 필요한 것은 아니다.
리소스 URI 전체는 HTTP 캐시와 같은 네트워크 기반의 중개자에게 아무런 의미 도 없어야 한다(쿼리 자체도 캐시 가능해야 한다는 의미다). URI의 쿼리 유무에 따 라 캐시의 작용이나 기능이 바뀌어서는 안 된다. 특히 요청 URI에 쿼리가 있다고 해서 응답 메시지가 캐시에서 제외되어서는 안 된다. 4장에서 자세히 다루겠지만, 쿼리가 아닌 HTTP 헤더가 캐시의 중간 역할을 결정해야 한다.
2장 URI 식별자 설계 24
 규칙: URI 쿼리 부분으로 컬렉션이나 스토어를 필터링할 수 있다
URI 쿼리는 컬렉션이나 스토어의 검색 기준으로 사용하기에 적합하다. 다음 예를 보자.
GET /users ➊
GET /users?role=admin ➋
1 응답 메시지의 상태 표현은 컬렉션에 있는 모든 사용자의 리스트다.
2 응답 메시지의 상태 표현은 컬렉션에 있는 사용자 중 'role'의 값이 'admin'인
사용자의 리스트다.
규칙: URI 쿼리는 컬렉션이나 스토어의 결과를 페이지로 구분하여 나타내는 데 사용해야 한다
REST API 클라이언트는 쿼리 구성요소를 사용하여 컬렉션이나 스토어의 결과 를 pageSize, pageStartIndex 같은 파라미터 값으로 페이지화한다. pageSize 파라미터는 응답에 반환되는 엘리먼트의 최댓값을 나타내는 데 사용된다. 그리고 pageStartIndex 파라미터는 응답에 반환되는 첫 번째 엘리먼트의 인덱스를 나타 낸다. 예를 들어 다음과 같다.
GET /users?pageSize=25&pageStartIndex=50 (50페이지부터 최대 75페이지까지만)
URI 쿼리로 클라이언트의 페이지나 필터링의 요구 사항에 대응할 수 없다면, 컬렉 션이나 스토어의 파트너가 될 수 있는 특별한 컨트롤러를 생각해봐야 한다. 예를 들어, 다음 컨트롤러는 URI 쿼리 파트 대신 리퀘스트의 바디 부분에 좀 더 복잡한 입력을 받을 수 있다.
POST /users/search
이 디자인으로 맞춤 범위 형태나 특별한 소팅 순서 등이 클라이언트 리퀘스트 메시
2장 URI 식별자 설계 25 This eBook is licensed to 김민영(cyzest@nate.com). Personal use only
지 바디에 쉽게 기술될 수 있다. 4장에서 좀 더 자세히 살펴볼 텐데, 컨트롤러의 캐 시 결과를 그에 따라 표시하는 것에 좀 더 주의를 기울여야 한다.