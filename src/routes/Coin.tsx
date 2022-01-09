// import {useParams} from "react-router-dom";
import {useEffect} from "react";
import {useState} from "react";
import {useParams} from "react-router";
import {useLocation} from "react-router-dom";
import styled from "styled-components";

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


const Title = styled.h1`
  font-size: 48px;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  display: block;
`;


interface RouteParams {
  coinId: string;
}

interface RouteState {
  name: string;
}

function Coin () {
  const [loading, setLoading] = useState(true);
  const {coinId} = useParams<RouteParams>();
  const {state} = useLocation<RouteState>();
  // console.log(state.name);
  // console.log(params);
  const [info, setInfo] = useState({});
  const [priceInfo, setPriceInfo] = useState({});
  useEffect(() => {
    (async () => {
      // const response = await fetch(`https://api.coinpaprika.com/v1/coins/${ coinId }`)
      // const json = await response.json()
      // 두 줄 캡슐화 (한 줄의 solution이 두개의 변수를 받음)
      const inforData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${ coinId }`)
      ).json();
      // console.log(inforData);
      // awaite ()괄호안에 request를 써주고 .json
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      // console.log(priceData);
      setInfo(inforData);
      setPriceInfo(priceData);
    })();
  }, []);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
        {/* home에서 가는 경우(state가 있음), 바로 detail로 가는 경우(state없어서 name undefined)  */}
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;