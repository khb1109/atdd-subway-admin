## 1단계 - 지하철 노선 관리 기능

#### 요구 사항

- 인수 테스트(LineAcceptanceTest) 성공 시키기

- LineController를 구현하고 인수 테스트에 맞는 기능을 구현하기

- 테스트의 중복을 제거하기

> 인수 테스트를 성공시키면 지하철 노선 관리 기능을 모두 구현한 것입니다.

#### 기능 목록

1. 지하철 노선 추가 API

2. 지하철 노선 목록 조회 API

3. 지하철 노선 수정 API

4. 지하철 노선 단건 조회 API

5. 지하철 노선 제거 API

#### 시나리오
```
Feature: 지하철 노선 관리
  Scenario: 지하철 노선을 관리한다.
    When 지하철 노선 n개 추가 요청을 한다.
    Then 지하철 노선이 추가 되었다.
    
    When 지하철 노선 목록 조회 요청을 한다.
    Then 지하철 노선 목록을 응답 받는다.
    And 지하철 노선 목록은 n개이다.
    
    When 지하철 노선 수정 요청을 한다.
    Then 지하철 노선이 수정 되었다.

    When 지하철 노선 제거 요청을 한다.
    Then 지하철 노선이 제거 되었다.
    
    When 지하철 노선 목록 조회 요청을 한다.
    Then 지하철 노선 목록을 응답 받는다.
    And 지하철 노선 목록은 n-1개이다.
```

#### 프로그래밍 제약 사항

- 지하철 노선 이름은 중복될 수 없다.

#### 실습 - 지하철 노선 추가하기

#### 미션 수행 순서

- 인수 조건 파악하기 (제공)

- 인수 테스트 작성하기 (제공)

- 인수 테스트 성공 시키기

- 기능 구현

#### 진행 순서

- MOCK SERVER 생성

- CONTROLLER 구현

- 테스트 성공

---

## 2단계

#### 요구 사항

- 인수 테스트를 통해 구현한 기능을 페이지에 연동하기

#### 기능 목록

- 지하철 노선 관리 페이지

    - 페이지 호출 시 미리 저장한 지하철 노선 조회
    
    - 지하철 노선 목록 조회 API 사용

- 노선 추가
    
    - 노선 추가 버튼을 누르면 아래와 같은 팝업화면이 뜸
     
    - 노선 이름과 정보를 입력
    
    - 지하철 노선 추가 API 사용
    
- 노선 상세 정보 조회
 
    - 목록에서 노선 선택 시 상세 정보를 조회
    
    > 단건 조회 API를 사용할 수도 있고 목록 조회 API 조회 응답 결과를 활용할 수도 있습니다.

- 노선 수정
  
    - 목록에서 우측 수정 버튼을 통해 수정 팝업화면 노출

    - 수정 팝업 노출 시 기존 정보는 입력되어 있어야 함

    - 정보 수정 후 지하철 노선 수정 API 사용

- 노선 삭제

    - 목록에서 우측 삭제 버튼을 통해 삭제

    - 지하철 노선 삭제 API 사용
    
---

## 3단계 

- 인수 테스트 작성

- Mock 서버 작성 및 DTO 작성

``` java
    /**
     *     Given 지하철역이 여러 개 추가되어있다.
     *     And 지하철 노선이 추가되어있다.
     *
     *     When 지하철 노선에 지하철역을 등록하는 요청을 한다.
     *     Then 지하철역이 노선에 추가 되었다.
     *
     *     When 지하철 노선의 지하철역 목록 조회 요청을 한다.
     *     Then 지하철역 목록을 응답 받는다.
     *     And 새로 추가한 지하철역을 목록에서 찾는다.
     *
     *     When 지하철 노선에 포함된 특정 지하철역을 제외하는 요청을 한다.
     *     Then 지하철역이 노선에서 제거 되었다.
     *
     *     When 지하철 노선의 지하철역 목록 조회 요청을 한다.
     *     Then 지하철역 목록을 응답 받는다.
     *     And 제외한 지하철역이 목록에 존재하지 않는다.
     */
```

---

## 4단계

#### 기능목록

- 기능 제약조건

    - 한 노선의 출발역은 하나만 존재하고 단방향으로 관리함
    
    - 실제 운행 시 양쪽 두 종점이 출발역이 되겠지만 관리의 편의를 위해 단방향으로 관리
    
    - 추후 경로 검색이나 시간 측정 시 양방향을 고려 할 예정
    
    - 한 노선에서 두 갈래로 갈라지는 경우는 없음
    
    - 이전역이 없는 경우 출발역으로 간주
 
- 지하철 노선에 역 추가
    
    - 마지막 역이 아닌 뒷 따르는 역이 있는경우 재배치를 함
    
    - 노선에 A - B - C 역이 연결되어 있을 때 B 다음으로 D라는 역을 추가할 경우 A - B - D - C로 재배치 됨
    
- 지하철 노선에 역 제거

    - 출발역이 제거될 경우 출발역 다음으로 오던 역이 출발역으로 됨
   
    - 중간역이 제거될 경우 재배치를 함
  
    - 노선에 A - B - D - C 역이 연결되어 있을 때 B역을 제거할 경우 A - B - C로 재배치 됨