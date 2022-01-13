import {useQuery} from "react-query";
import {useParams} from "react-router-dom";
import {fetchCoinHistory} from "../api";
import ApexChart from "react-apexcharts";

// Chart component는 우리가 보고자 하는 가격의 암호화폐 또는 우리가 지금 보고있는 암호화폐가 무엇인지 알아야 함
// 1. useParams사용 react router dom에서 사용.
// 2. router로부터 parameter가져오기
// 생각해보면 coin screen은 chart를 render하는 것이고
// coin screen은 URL로부터 이미 coinId 값을 알고있음
// 그냥 props를 Coin.tsx의 <Chart />에 coinId 프롭스 넣어주고 여기에 coinId 프롭스 인터페이스 만들어줌

interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

interface ChartProps {
  coinId: string;
}
function Chart ({ coinId }: ChartProps) {
  // const params = useParams();
  // console.log(params);
  // 꼭 chart를 클릭해서 콘솔 내용 확인(coinId: 'btc-bitcoin')확인
  // 2두번째 방법 쓸거임
  const {isLoading, data} = useQuery<IHistorical[]>(["ohlcv", coinId], () => fetchCoinHistory(coinId),
    // refetch 10초마다
    {
      refetchInterval: 10000,
    }
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
            series={[
              {
                name: "sales",
                data: data?.map((price) => price.close),
              },
            ]}
          options={{
            theme: {
              mode: "dark"
            },
            chart: {
              height: 300,
              width: 500,
              toolbar: {
                show: false,
              },
              background: "transparent",
            },
            grid: { show: false },
            stroke: {
              curve: "smooth",
              width: 4,
            },
            yaxis: {
              show: false,
            },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: {show: false},
              type: "datetime",
              categories: data?.map((price) => price.time_close),
            },
            fill: {
              type: "gradient",
              gradient: {gradientToColors: ["#0be881"], stops: [0, 100] },
            },
            colors: ["blue"],
            tooltip: {
              y: {
                formatter: (value) => `$ ${ value.toFixed(3) }`,
                // 소수점 3자리까지만 보여지게 하는 것
              }
            }
          }}
        />
      )}
    </div>  
  );
}

export default Chart;