import classes from "./task.module.scss";
import Tasklist from "./Tasklist";
import { useState, useEffect } from "react";
const Task = (props) => {
  const [getTask, setTask] = useState([""]);
  const apiURL = process.env.REACT_APP_API_KEY;
  const data = async () => {
    await fetch(apiURL)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setTask(data);
      });
  };
  useEffect(() => {
    data();
  }, [getTask]);

  return (
    <>
      <section className={classes.tasklistSection}>
        <h2>Task List</h2>
        {getTask.length == 0 && (
          <h1 className={classes.noTask}>No Task Available</h1>
        )}
        {getTask
          .sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
          .map((task, index) => (
            <Tasklist
              key={task.index}
              id={task.id}
              title={task.title}
              status={task.status}
            />
          ))}
      </section>
    </>
  );
};

export default Task;
