import Cookies from "universal-cookie";

export const createAdmin = async (data, history) => {
  await fetch("/api/v1/admin/sign_up", {
    method: "POST",
    body: JSON.stringify({
      data,
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

export const signInAdminWithAPI = async (data, history, setLoggerDetails) => {
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
        history.push("/AdminDataVisualizer");
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
      console.log("inside api call function");
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

export const findAllMetricsForZone = async (setAllMetricsData, zone) => {
  await fetch("/api/v1/admin/find_all_metrics_for_zone", {
    method: "POST",
    body: JSON.stringify({ zone: zone }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      let data = await res.json();
      console.log("inside api call function");
      if (res.status === 200) {
        // const cookies = new Cookies();
        // let isAuth = cookies.get("isAuth") === "true" ? true : false;
        // isAuth ? history.push("/AdminDashboard") : console.log("not is auth");
        setAllMetricsData(data);
        // console.log(data);
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

export const findAllMetricsForWereda = async (
  setAllMetricsData,
  zone,
  wereda
) => {
  await fetch("/api/v1/admin/find_all_metrics_for_wereda", {
    method: "POST",
    body: JSON.stringify({ zone: zone, wereda: wereda }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      let data = await res.json();
      console.log("inside api call function");
      if (res.status === 200) {
        // const cookies = new Cookies();
        // let isAuth = cookies.get("isAuth") === "true" ? true : false;
        // isAuth ? history.push("/AdminDashboard") : console.log("not is auth");
        setAllMetricsData(data);
        // console.log(data);
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

export const findAllPersonForWereda = async (
  setAllPersonForWereda,
  zone,
  wereda
) => {
  await fetch("/api/v1/admin/find_all_persons_by_wereda", {
    method: "POST",
    body: JSON.stringify({ zone: zone, wereda: wereda }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      let data = await res.json();
      console.log("inside findAllPersonForWereda api");
      if (res.status === 200) {
        // const cookies = new Cookies();
        // let isAuth = cookies.get("isAuth") === "true" ? true : false;
        // isAuth ? history.push("/AdminDashboard") : console.log("not is auth");
        console.log(data);
        setAllPersonForWereda(data);
        // console.log(data);
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

export const findDataForZoneGroupedByWereda = async (
  setZoneDataGroupedByWereda,
  zone
) => {
  await fetch("/api/v1/admin/find_all_metrics_for_zone_with_wereda", {
    method: "POST",
    body: JSON.stringify({ zone: zone }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      let data = await res.json();
      console.log("inside findAllPersonForWereda api");
      if (res.status === 200) {
        // const cookies = new Cookies();
        // let isAuth = cookies.get("isAuth") === "true" ? true : false;
        // isAuth ? history.push("/AdminDashboard") : console.log("not is auth");
        console.log(data);
        setZoneDataGroupedByWereda(data);
        // console.log(data);
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

export const findDataForRegionGroupedByZone = async (
  setRegionDataGroupedByZone
) => {
  await fetch("/api/v1/admin/find_all_metrics_for_region_with_zone", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then(async (res) => {
      let data = await res.json();
      console.log("inside api call function");
      if (res.status === 200) {
        // const cookies = new Cookies();
        // let isAuth = cookies.get("isAuth") === "true" ? true : false;
        // isAuth ? history.push("/AdminDashboard") : console.log("not is auth");
        setRegionDataGroupedByZone(data);
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

// findAllMetricsForWereda
