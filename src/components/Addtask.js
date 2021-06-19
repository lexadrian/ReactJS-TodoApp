import classes from "./addtask.module.scss";
import { useRef, useState } from "react";

const Addtask = () => {
  const task = useRef();
  const SubmitHadler = (e) => {
    e.preventDefault();
    const taskInput = task.current.value;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskInput, status: "Open" }),
    };
   if(taskInput == "") {
    alert('Required Value')
   } else {
     fetch(process.env.REACT_APP_API_KEY, requestOptions).then((res) => {
       console.log(res.status);
       task.current.value = "";
     });
   }
  };
  return (
    <>
      <section className={classes.addtaskSection}>
        <h1>Add Task</h1>
        <form onSubmit={(e) => SubmitHadler(e)}>
          <input type="text" placeholder="Add task" ref={task} />
          <button>Submit</button>
        </form>
      </section>
    </>
  );
};

export default Addtask;
