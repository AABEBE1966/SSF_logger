import Cookies from "universal-cookie";

export const createLogger = async (
  data,
  selectedZone,
  selectedDistrict,
  history
) => {
  await fetch("/api/v1/logger/sign_up", {
    method: "POST",
    body: JSON.stringify({
      ...data,
      zone: selectedZone,
      wereda: selectedDistrict,
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
        history.push("/LoggerSignIn");
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

export const signInLoggerWithAPI = async (data, history, setLoggerDetails) => {
  await fetch("/api/v1/logger/sign_in", {
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
        history.push("/LoggerProfile");
        setLoggerDetails(data.logger);
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

export const logUserData = async (
  data,
  setValue,
  setPersonData,
  personData
) => {
  await fetch("/api/v1/logger/log_user_data", {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      let dataFromServer = await res.json();
      if (res.status === 200) {
        if (personData === []) {
          setPersonData([data]);
        } else {
          setPersonData([...personData, data]);
        }
        console.log("user created is successfuly");
        console.log("here is the data👇🏼");
        console.log(dataFromServer);
        console.log(dataFromServer.message);
        setValue("firstName", "");
        setValue("lastName", "");
        setValue("kebele", "");
        setValue("licenseNumber", "");
        setValue("armType", "");
        setValue("bulletNumber", "");
        // showAlert(true, data.message, "succes");
      } else if (res.status === 201) {
        console.log(dataFromServer.message);
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
