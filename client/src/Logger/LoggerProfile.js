import React from "react";
import Logger from "./Logger";
import LogPersonData from "./LogPersonData";
import RecentlyLoggedPerson from "./RecentlyLoggedPerson";
export default function LoggerProfile() {
  return (
    <div className=" flex justify-between p-10 ">
      <Logger />
      <LogPersonData />
      <RecentlyLoggedPerson />
    </div>
  );
}
