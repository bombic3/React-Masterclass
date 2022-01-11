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


