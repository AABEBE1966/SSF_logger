import React from "react";
import { User } from "react-feather";
import { useLoggerContext } from "../contexts/loggerContext";

export default function Logger() {
  const { loggerDetails } = useLoggerContext();

  console.log(loggerDetails);

  return (
    <div className=" w-full max-w-sm ">
      <div className="rounded border   px-4 py-6">
        <div>
          <div className=" inline-block rounded-full bg-purple-300 p-6 ">
            <User />
          </div>
          <div className="  flex gap-2 text-headingFive font-bold text-gray-800 ">
            <p> {loggerDetails.firstName}</p>
            <p> {loggerDetails.lastName}</p>
          </div>
        </div>
        <div className=" my-4 flex max-w-xs flex-col gap-4 ">
          <div className=" rounded-md border px-6 py-4 shadow-md ">
            <p className=" text-gray-400 ">Zone</p>
            <p className=" font-semibold text-gray-800 ">
              {" "}
              {loggerDetails.zone}
            </p>
          </div>
          <div className=" rounded-md border px-6 py-4 shadow-md ">
            <p className=" text-gray-400 ">wereda</p>
            <p className=" font-semibold text-gray-800 ">
              {" "}
              {loggerDetails.wereda}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
