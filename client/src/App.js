import "./App.css";
import { useEffect, useState } from "react";
import LoggerSignUp from "./Logger/LoggerSignUp";
function App() {
  const [user, setUser] = useState();

  const getData = () => {
    fetch("/api/v1/logger/generate_data", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        let data = await res.json();
        if (res.status === 200) {
          console.log("data")
          console.log(data);
          console.log(data);
        } else if (res.status === 201) {
          console.log(data);
        } else {
          console.log(data);
        }
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  // admin
  // admin login page
  // logger login page
  // user card

  return (
    <div className="App">
      <LoggerSignUp />{" "}
    </div>
  );
}

export default App;
