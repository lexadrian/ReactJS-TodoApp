import classes from "./task.module.scss";
import Tasklist from "./Tasklist";
import { useState, useEffect } from "react";
const Task = (props) => {
  const [getTask, setTask] = useState([""]);
  const [filter, setFilter] = useState("All");
  const [isSelect, setSelect] = useState(false);
  const [isActive, setActive] = useState(0);
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
  const filterHanlder = (res, index) => {
    setFilter(res);
    setSelect(true);
    setActive(index);
  };
  return (
    <>
      <section className={classes.tasklistSection}>
        <h2>Task List : {filter}</h2>
        <div className="btn-group">
          {buttonArr.map((res, index) => (
            <button
              key={index}
              className={
                index == isActive
                  ? classes.filter + " " + classes.active
                  : classes.filter
              }
              onClick={() => filterHanlder(res, index)}
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
