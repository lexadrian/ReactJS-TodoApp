import classes from "./tasklist.module.scss";
import { useRef } from "react";
const Tasklist = ({ index, id, title, status }) => {
  const statusValue = useRef();
  // Change status
  const statusHandler = (id) => {
    console.log(statusValue.current.value);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusValue.current.value }),
    };
    fetch(process.env.REACT_APP_API_KEY + "/" + id, requestOptions).then(
      (response) => {
        response.json();
        statusValue.current.value = status;
      }
    );
  };
  // Delete Task
  const deleteHanlder = (id) => {
    const requestOptions = {
      method: "Delete",
      headers: { "Content-Type": "application/json" },
    };
    fetch(process.env.REACT_APP_API_KEY + "/" + id, requestOptions).then(
      (response) => {
        response.json();
        alert("deleted");
      }
    );
  };

  return (
    <>
      <div className={classes.card}>
        <div
          className={
            status == "Open"
              ? classes.open + " " + classes.cardContent
              : status == "In Progress"
              ? classes.progress + " " + classes.cardContent
              : classes.done + " " + classes.cardContent
          }
          key={index}
        >
          <h4>{title}</h4>
          <hr className="m-0" />
          <label className="text-muted">Status: </label>
          <select
            className={
              status == "Open"
                ? classes.openStatus + " " + classes.option
                : status == "In Progress"
                ? classes.progressStatus + " " + classes.option
                : classes.doneStatus + " " + classes.option
            }
            ref={statusValue}
            onChange={(e) => statusHandler(id)}
            aria-label="Default select example"
          >
            <option defaultValue>{status}</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
          <div className="">
            <button onClick={(e) => deleteHanlder(id)}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Tasklist;
