import classes from "./tasklist.module.scss";
import { useRef } from "react";
const Tasklist = ({ index, id, title, status }) => {
  const statusValue = useRef();
  const statusHandler = (id) => {
    console.log(statusValue.current.value);
    const requestOptions = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: statusValue.current.value }),
    };
    fetch(process.env.REACT_APP_API_KEY + "/" + id, requestOptions).then(
      (response) => response.json()
    );
  };

  return (
    <>
      <div className={classes.card}>
        <div className={classes.cardContent} key={index}>
          <h4>{title}</h4>
          <hr className="m-0" />
          <label>Status: </label>
          <select
            ref={statusValue}
            onChange={(e) => statusHandler(id)}
            className="form-select"
            aria-label="Default select example"
          >
            <option defaultValue>{status}</option>
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default Tasklist;
