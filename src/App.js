import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Addtask from "./components/Addtask";
import Task from "./components/Task";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container-fluid">
        <div className="row gx-0">
          <div className="col-lg-4">
            <Addtask />
          </div>
          <div className="col-lg-8">
            <Task />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
