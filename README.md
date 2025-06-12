# Korea Crypto Exchange

## 한국 암호화폐 거래소 API 통합 라이브러리

<img src="https://github.com/user-attachments/assets/36270157-e02b-4021-807c-a9a14c1b9461" width="400" alt="맛있는업비트김치">

<img src="https://github.com/user-attachments/assets/7441b41d-b2f8-4ffc-b5e7-cae0819298e3" width="400" alt="맛있는빗썸김치">

한국의 주요 암호화폐 거래소(업비트, 빗썸) API를 쉽게 구현할 수 있도록 도와주는 TypeScript 라이브러리입니다. 거래소 API를 사용하기 위해서는 먼저 엑세스키와 비밀키를 발급받고, 스코프 조건에 따라 IP 허용 작업을 각 거래소 개발자 대시보드에서 설정해주셔야 정상 작동됩니다.

## 주요 기능

### 업비트 API 구현
- 자산 조회 API
  - 전체 계좌 조회
- 시세 조회 API
  - 종목 코드 조회
  - 분봉/일봉/주봉/월봉/년봉 캔들 조회
  - 최근 체결 내역 조회
  - 현재가 정보 조회
    - 종목 단위 현재가 정보
    - 마켓 단위 현재가 정보
  - 호가 정보 조회
    - 호가 정보 조회
    - 호가 모아보기 단위 정보 조회
- 주문 API
  - 주문 가능 정보
  - 개별 주문 조회
  - (제외됨, Deprecated) 주문 리스트 조회
  - id로 주문리스트 조회
  - 체결 대기 주문 조회
  - 종료된 주문 조회
  - 주문하기
  - 주문 취소 접수
  - 주문 일괄 취소 접수
  - id로 주문 리스트 취소 접수
  - 주문 조회
  - 취소 후 재주문
- 입금 API
  - 입금 리스트 조회
  - 개별 입금 조회
  - 입금 주소 생성 요청
  - 전체 입금 주소 조회
  - 개별 입금 주소 조회
  - 원화 입금하기
  - 해외거래소 입금 시 계정주 확인 하기(트레블룰 검증)
    - 계정주 확인 가능 거래소 리스트 조회
    - 입금 UUID로 트래블룰 검증하기
    - 입금 TxID로 트래블룰 검증하기
  - 디지털 자산 입금 정보 조회
- 서비스 정보 API
  - 입출금 현황
  - API 키 리스트 조회
- 출금 API
  - 디지털 자산 출금하기
  - 원화 출금하기
  - 출금 내역 조회
  - 개별 출금 조회
  - 출금 가능 정보
  - 출금 허용 주소 리스트 조회
  - 디지털 자산 출금 취소 접수

## 설치 방법

```bash
npm install korea-crypto-exchange
```

## 사용 예제

### 업비트 API 사용하기

```typescript
import { KoreaCryptoExchange, ExchangeType } from 'korea-crypto-exchange';

// 거래소 인스턴스 생성
const exchange = new KoreaCryptoExchange({
  type: ExchangeType.UPBIT,
  accessKey: 'YOUR_ACCESS_KEY',
  secretKey: 'YOUR_SECRET_KEY'
});

// 현재가 정보 조회
const tickers = await exchange.getTickers({
  markets: 'KRW-BTC,KRW-ETH'
});

// 호가 정보 조회
const orderbook = await exchange.getOrderbook({
  markets: 'KRW-BTC',
  level: 1
});

// 주문하기
const order = await exchange.placeOrder({
  market: 'KRW-BTC',
  side: 'bid',
  volume: '0.1',
  price: '50000000',
  ord_type: 'limit'
});

// 주문 상세 조회
const orderDetail = await exchange.getOrderDetail({
  uuid: 'order-uuid'
});

// 계좌 정보 조회
const accounts = await exchange.getAccounts();

// 분봉 데이터 조회
const minuteCandles = await exchange.getMinuteCandles(1, {
  market: 'KRW-BTC',
  count: 200
});

// 일봉 데이터 조회
const dayCandles = await exchange.getDayCandles({
  market: 'KRW-BTC',
  count: 200
});
```

## 개발 환경 설정

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 테스트 실행
npm test

# 린트 검사
npm run lint

# 코드 포맷팅
npm run format

# 빌드
npm run build
```

## 기술 스택

- TypeScript
- Jest (테스트)
- ESLint (린트)
- Prettier (코드 포맷팅)
- Husky (Git Hooks)

## 라이선스

MIT License

## 기여하기

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 이슈

버그 리포트나 기능 요청은 [이슈 트래커](https://github.com/joshephan/korea-crypto-exchange/issues)를 이용해 주세요.
