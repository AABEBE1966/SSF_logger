import "./App.css";
import { useEffect, useState } from "react";
import LoggerSignUp from "./Logger/LoggerSignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggerSignIn from "./Logger/LoggerSignIn";
import { LoggerProvider } from "./contexts/loggerContext";
import AdminDataViewer from "./Admin/AdminDataViewer";
import LoggerProfile from "./Logger/LoggerProfile";
function App() {
  const [user, setUser] = useState();


  // const getData = () => {
  //   fetch("/api/v1/admin/find_metrics", {
  //     method: "GET",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then(async (res) => {
  //       let data = await res.json();
  //       if (res.status === 200) {
  //         console.log("data");
  //         console.log(data);
  //         console.log(data);
  //       } else if (res.status === 201) {
  //         console.log(data);
  //       } else {
  //         console.log(data);
  //       }
  //     })
  //     .catch((err) => {
  //       console.log(err.message);
  //       console.log(err);
  //     });
  // };

  // useEffect(() => {
  //   getData();
  // }, []);

  // admin
  // admin login page
  // logger login page
  // user card

  return (
    <div className="App">
      <LoggerProvider>
        <Router>
          <Switch>
            <Route exact path="/LoggerSignUp">
              <LoggerSignUp />
            </Route>
            <Route path="/LoggerSignIn">
              <LoggerSignIn />
            </Route>
<<<<<<< HEAD
            <Route exact path="/AdminDataVisualizer">
              <AdminDataViewer />
=======
            <Route path="/LoggerProfile">
              <LoggerProfile />
>>>>>>> 659ff2e74dc665e6c1de551f001d35248bbfc069
            </Route>
          </Switch>
        </Router>
      </LoggerProvider>
    </div>
  );
}

export default App;
