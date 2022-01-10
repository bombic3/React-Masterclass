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

// interface IInfoData {  interface인 걸 알기 위해 I를 붙임(케바케)

// 실행윈도우 콘솔창에
// Object.keys(temp1);
// Object.keys(temp1).join();
// temp1 InfoData 복붙
// cmd + d 로 , 만 지우기
// shift+option+화살표 로 : ; 써주기
// 실행윈도우 콘솔창 Object.values(temp1).map(v => typeof v).join()
// temp1 InfoData 복붙, cmd + d 로 , 만 지우기, 정리
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  // object가 아닌 object로 이뤄진 배열임. array 의 interface만들어서 타입 다 써줘야 함(지금은 필요없으니 지움)
  // tags: Itag[];
  // team: object;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  // links: object;
  // links_extended: object;
  // whitepaper: object;
  first_data_at: string;
  last_data_at: string;
}



interface PriceData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    }
  };
}

function Coin () {
  const [loading, setLoading] = useState(true);
  const {coinId} = useParams<RouteParams>();
  const {state} = useLocation<RouteState>();
  // console.log(state.name);
  // console.log(params);
  const [info, setInfo] = useState<InfoData>();
  const [priceInfo, setPriceInfo] = useState<PriceData>();
  useEffect(() => {
    (async () => {
      // const response = await fetch(`https://api.coinpaprika.com/v1/coins/${ coinId }`)
      // const json = await response.json()
      // 두 줄 캡슐화 (한 줄의 solution이 두개의 변수를 받음)
      const inforData = await (
        await fetch(`https://api.coinpaprika.com/v1/coins/${ coinId }`)
      ).json();
      /*
      data 저장
      콘솔에 data 띄우고 오른쪽마우스 => Store object as global variable
      그럼 temp1에 data 들어감. 필요할 때 temp1에 연결해주면 됨
      */
      // console.log(inforData);
      // awaite ()괄호안에 request를 써주고 .json
      const priceData = await (
        await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
      ).json();
      // console.log(priceData);
      setInfo(inforData);
      setPriceInfo(priceData);
      setLoading(false);
      // API로부터 데이터를 request한 후에 setLoading false로 바꿔주기
    })();
  }, [coinId]);
  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading"}</Title>
        {/* home에서 가는 경우(state가 있음), 바로 detail로 가는 경우(state없어서 name undefined)  */}
      </Header>
      {loading ? <Loader>Loading...</Loader> : null }
    </Container>
  );
}

export default Coin;