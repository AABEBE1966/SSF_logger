import "./App.css";
import { useEffect, useState } from "react";
function App() {
  const [user, setUser] = useState();

  const getData = () => {
    fetch("/api/v1/logger/find_all_persons", {
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

  return <div className="App">show user : {user}</div>;
}

export default App;
