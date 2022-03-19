import "./App.css";
import { useEffect, useState } from "react";
import LoggerSignUp from "./Logger/LoggerSignUp";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LoggerSignIn from "./Logger/LoggerSignIn";
import { LoggerProvider } from "./contexts/loggerContext";
import AdminDataViewer from "./Admin/AdminDataViewer";
import LoggerProfile from "./Logger/LoggerProfile";
import Admin from "./Admin/Admin";
import Home from "./Home";
function App() {
  const [user, setUser] = useState();


  return (
    <div className="App">
      <LoggerProvider>
        <Router>
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/LoggerSignUp">
              <LoggerSignUp />
            </Route>
            <Route path="/LoggerSignIn">
              <LoggerSignIn />
            </Route>
            <Route exact path="/AdminDataVisualizer">
              <Admin />
            </Route>
            <Route path="/LoggerProfile">
              <LoggerProfile />
            </Route>
          </Switch>
        </Router>
      </LoggerProvider>
    </div>
  );
}

export default App;
