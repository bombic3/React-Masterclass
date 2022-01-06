import styled from "styled-components"

// 어떻게 우리 자신과 props를 interfae를 사용하여 보호하는지


// interface는 object를 설정해주는 것. object가 어떤식으로 보일 지 설명해주는 것
// interface ContainerProps {
//   bgColor: string;
// }

interface CircleProps {
  bgColor: string;
  borderColor?: string;
}

interface ContainerProps {
  bgColor: string;
  borderColor: string;
}

// Container div가 ContainerProps의 props를 받는다
const Container = styled.div<ContainerProps>`
  width: 200px;
  height: 200px;
  background-color: ${( props ) => props.bgColor};
  border-radius: 100px;
  border: 1px solid ${(props) => props.borderColor};
`;

// bgColor가 CircleProps안의 object이다
function Circle({bgColor, borderColor}: CircleProps) {
  return (
    // <Container bgColor={props.bgColor} />
    <Container bgColor={bgColor} borderColor={borderColor ?? "yellow"} />
  );
}



// 예시
interface PlayerShape {
  name: string;
  age: number;
}

const sayHello = (playterobj: PlayerShape) => {
  `Hello ${playterobj.name} you are ${playterobj.age} years old.`;
}

sayHello({name: "bombi", age:12})

export default Circle;