import classes from "./task.module.scss";
import Tasklist from "./Tasklist";
import { useState, useEffect } from "react";
const Task = (props) => {
  const [getTask, setTask] = useState([""]);
  const [filter, setFilter] = useState("All");
  const buttonArr = ["All", "Open", "In Progress", "Done"];
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
  // filter
  const filterHanlder = (res) => {
    setFilter(res);
  };
  return (
    <>
      <section className={classes.tasklistSection}>
        <h2>Task List</h2>
        <div className="btn-group">
          {buttonArr.map((res) => (
            <button
              className={classes.filter}
              onClick={() => filterHanlder(res)}
            >
              {res}
            </button>
          ))}
        </div>
        {!getTask.length && (
          <h1 className={classes.noTask}>No Task Available</h1>
        )}

        {getTask
          .sort((a, b) => (a.itemM > b.itemM ? 1 : -1))
          .filter((val) => {
            if (filter == "All") {
              return val;
            } else {
              return val.status == filter;
            }
          })
          .map((task, index) => (
            <Tasklist
              key={index}
              index={index}
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
