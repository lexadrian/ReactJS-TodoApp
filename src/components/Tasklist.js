import classes from "./tasklist.module.scss";
const Tasklist = ({ key, id, title, status }) => {
  return (
    <>
      <div className={classes.card}>
        <div className={classes.cardContent} key={key}>
          <h4>{title}</h4>
          <hr className="m-0" />
          <label>Status: {status}</label>
        </div>
      </div>
    </>
  );
};

export default Tasklist;
