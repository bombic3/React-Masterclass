const BASE_URL = `https://api.coinpaprika.com/v1`

// API를 fetch하고 json을 return하는 함수
export function fetchCoins () {
  return fetch(`${BASE_URL}/coins`).then((response) =>
    response.json()
  );
}

export function fetchCoinInfo (coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`).then((response) =>
    response.json()
  );
}
 
export function fetchCoinTickers (coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`).then((response) =>
    response.json()
  );
}

export function fetchCoinHistory (coinId: string) {
  const endDate = Math.floor(Date.now() / 1000)
  // (floor=>1.9=1 ceil=>1.9=2)내림차순(밀리세컨즈 / 1000 = 세컨즈)
  const startDate = endDate - 60 * 60 * 24 * 7;
  // 현재 - 초*분*시*일 = 일주일 전(초)
  return fetch(`${ BASE_URL }/coins/${ coinId }/ohlcv/historical?start=${startDate}&end=${endDate}`).then((response) =>
    response.json()
  );
}
