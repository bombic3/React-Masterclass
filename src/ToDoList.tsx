import React, { useState } from "react";

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

export default ToDoList;