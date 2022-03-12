import React, { useState } from "react";
import Logger from "./Logger";
import LogPersonData from "./LogPersonData";
import RecentlyLoggedPerson from "./RecentlyLoggedPerson";
export default function LoggerProfile() {
  const [personData, setPersonData] = useState([]);
  console.log(personData);

  return (
    <div className=" flex justify-between p-10 ">
      <Logger />
      <LogPersonData setPersonData={setPersonData} personData={personData} />
      <RecentlyLoggedPerson personData={personData} />
    </div>
  );
}
