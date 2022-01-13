import {useEffect} from "react";
import {useState} from "react";
import {useQuery} from "react-query";
import {Link} from "react-router-dom";
import styled from "styled-components";
import {props} from "../../../../Library/Caches/typescript/4.3/node_modules/@types/bluebird";
import {container} from "../../../../Library/Caches/typescript/4.3/node_modules/webpack/types";
import {fetchCoins} from "../api";
import { Helmet } from "react-helmet";

const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  margin-bottom: 10px;
  a {
    display: flex;
    align-items: center;
    padding: 20px;
    transition: color .2s ease-in;
  }
  &:hover {
    // Link지만 html이 읽기에는 a태그이기 때문에 a를 타겟으로 잡음
    a {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;

const Img = styled.img`
  width: 35px;
  height: 35px;
  margin-right: 10px;
`;

/*
const coins = [
  {
    id: "btc-bitcoin",
    name: "Bitcoin",
    symbol: "BTC",
    rank: 1,
    is_new: false,
    is_active: true,
    type: "coin"
  },
  {
    id: "eth-ethereum",
    name: "Ethereum",
    symbol: "ETH",
    rank: 2,
    is_new: false,
    is_active: true,
    type: "coin"
  },
  {
    id: "usdt-tether",
    name: "Tether",
    symbol: "USDT",
    rank: 3,
    is_new: false,
    is_active: true,
    type: "token"
  }
];
*/

interface ICoin {
  id: string,
  name: string,
  symbol: string,
  rank: number,
  is_new: boolean,
  is_active: boolean,
  type: string
}

function Coins () {
  // 한번 돌린 데이터는 API에 접근하고 캐시에 데이터 저장. 그 뒤로는 접근안함. loading안 뜸
  // React query 는 이 response를 캐싱(caching)하고 있어서 React query는 API로부터 response를 받고 있어서
  // 우리가 화면을 바꿨다가 돌아오더라도 React query는 우리가 원하는 data가 이미 캐시(cache)에 있다는 걸 알고 있음
  // 그래서 React query는 API에 접근하지 않음(React query를 사용하는 이유)
  const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins)
  
  return (
    <Container>
      <Helmet>
      {/* Helmet 안에 있는 게 문서의 head로 가는 것 */}
        <title>코인</title>
      </Helmet>
      <Header>
        <Title>코인</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <CoinsList>
          {data?.slice(0, 100).map((coin) => (
            <Coin key={coin.id}>
              {/* <Link to={`/${ coin.id }`}> */}
              {/* 비하인드더씬 데이터 보내기(아무것도 안 보이지만 사실 다른 화면으로 state를 보내고 있음) */}
              <Link to={{
                pathname: `/${ coin.id }`,
                state: { name: coin.name },
              }}>
                <Img src={`https://cryptoicon-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`} />
                {coin.name} &rarr;
              </Link>
              {/* a를 쓰면 페이지가 새로고침 되므로 Link를 써줌 */}
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
}

export default Coins;