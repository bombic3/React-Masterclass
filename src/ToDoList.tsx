import React, {useState} from "react";
import {useForm} from "react-hook-form";

/*
function ToDoList() {
  const [toDo, setToDo] = useState("");
  const [toDoError, setToDoError] = useState("");
  // input 갯수만큼 input과 해당 inputError useState만들어야 함
  const onChange = (event: React.FormEvent<HTMLInputElement>) => {
    const {
      currentTarget: { value },
    } = event;
    setToDo(value);
  };
  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // to do list를 10자 이상 작성하시오(input의 조건에 해당하는 validation 다 작성해야 함)
    if (toDo.length < 10)
    {
      return setToDoError("To do should be longer");
    }
    setToDoError("");
    console.log("submit");
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input onChange={onChange} value={toDo} placeholder="Write a to do" />
        <button>Add</button>
        {toDoError !== "" ? toDoError : null}
      </form>
    </div>
  );
}
*/

interface IForm {
  Email: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  password1: string;
}

function ToDoList () {
  // register 가 onChange, event handler, value 등의 작업을 다 해주는 함수
  // watch는 form의 입력값들의 변화를 관찰 할 수 있게 해주는 함수
  // const {register, watch} = useForm();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm<IForm>({
    defaultValues: {
      Email: "@naver.com",
    }
  });
  // console.log(register("toDo"));
  // console에서 이 register함수가 반환하는 값(객체)들을 가져다가 input에 props로 줌
  // {...register("toDo")}
  // handleSubmit이 validation과 event.preventDefualt 담당
  const onValid = (data: any) => {
    console.log(data);
  };
  // console.log(watch());
  // console.log(errors);

  // 이 모든 걸, 어떤 자바스크립트의 복잡한 코드로 쓰지 않고 단지 우리의 킹갓 register 함수로 얻음
  return (
    <div>
      <form
        style={{ display: "flex", flexDirection: "column" }}
        onSubmit={handleSubmit(onValid)}
      >
        <input
          {...register("Email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Za-z0-9._%+-]+@naver.com$/,
              message: "Only naver.com emails allowed"
            },
          })}
          placeholder="Email"
        />
        <span>{errors?.Email?.message}</span>
        <input {...register("firstName", { required: "write here"})} placeholder="firstName" />
        <span>{errors?.firstName?.message}</span>
        <input {...register("lastName", { required: "write here"})} placeholder="lastName" />
        <span>{errors?.lastName?.message}</span>
        <input {...register("username", { required: "write here", minLength: 10})} placeholder="username" />
        <span>{errors?.username?.message}</span>
        <input {...register("password", { required: "write here", minLength: 5})} placeholder="password" />
        <span>{errors?.password?.message}</span>
        <input
          {...register("password1", {
            required: "Password is required",
            minLength: {
              value: 5,
              message: "Your password is too short.",
            },
          })}
          placeholder="password1"
          />
          <span>{errors?.password1?.message}</span>
        {/* 소문자만 가능 띄어쓰기 안 됨. 숫자가능 카멜가능 */}
        {/* 속성값에 그냥 required를 적으면 html로 적은 꼴. { required: true} 이렇게 적어야 자바스크립트로 적은 것(html의 기능을 지원해주지 않는 브라우저나 모바일 환경이 있을 수 있기 때문 */}
        {/* { required: true, minLength: 10} 만으로 조건문 줄줄이 썼던 거 한방에 해결 */}
        <button>Add</button>
      </form>
    </div>
  );
}

export default ToDoList;