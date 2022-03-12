import Cookies from "universal-cookie";

export const createAdmin = async (
  data,
  history
) => {
  await fetch("/api/v1/admin/sign_up", {
    method: "POST",
    body: JSON.stringify({
      data
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      let data = await res.json();
      if (res.status === 200) {
        console.log("user created is successfuly");
        console.log("here is the data👇🏼");
        console.log(data);
        console.log(data.message);
        history.push("/AdminSignIn");
        // showAlert(true, data.message, "succes");
      } else if (res.status === 201) {
        console.log(data.message);
        console.log("admin created is failed");
        // showAlert(true, data.message, "danger");
      } else {
        // showAlert(true, "Something went wrong. Please retry again.", "danger");
        console.log("Something went wrong. Please retry again.");
      }
    })
    .catch((err) => {
      console.log(err.message);
      console.log("Something went wrong. Please retry again.");
      //       showAlert(true, err.message, "danger");
    });
};

export const signInAdminrWithAPI = async (data, history, setLoggerDetails) => {
  await fetch("/api/v1/admin/sign_in", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      let data = await res.json();
      if (res.status === 200) {
        // const cookies = new Cookies();
        // let isAuth = cookies.get("isAuth") === "true" ? true : false;
        // isAuth ? history.push("/AdminDashboard") : console.log("not is auth");
        setLoggerDetails(data.admin);
        console.log(data.message);
        console.log(data.logger);
        // showAlert(true, "Succesfully LoggedIn as a Admin", "succes");
      } else if (res.status === 201) {
        console.log(data.message);
        // showAlert(true, data.message, "danger");
      } else {
        console.log(data.message);
        // showAlert(true, "something is wrong please try again later!", "succes");
      }
    })
    .catch((err) => {
      console.log(err.message);
      // showAlert(true, err.message, "succes");
    });
};


export const findAllMetrics = async (setAllMetricsData) => {
    await fetch("/api/v1/admin/find_all_metrics", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(async (res) => {
        let data = await res.json();
        if (res.status === 200) {
          // const cookies = new Cookies();
          // let isAuth = cookies.get("isAuth") === "true" ? true : false;
          // isAuth ? history.push("/AdminDashboard") : console.log("not is auth");
          setAllMetricsData(data);
          console.log(data);
          // showAlert(true, "Succesfully LoggedIn as a Admin", "succes");
        } else if (res.status === 201) {
          console.log(data.message);
          // showAlert(true, data.message, "danger");
        } else {
          console.log(data.message);
          // showAlert(true, "something is wrong please try again later!", "succes");
        }
      })
      .catch((err) => {
        console.log(err.message);
        // showAlert(true, err.message, "succes");
      });
  };
  


  
