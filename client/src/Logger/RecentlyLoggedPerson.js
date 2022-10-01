import React from "react";

export default function RecentlyLoggedPerson({ personData }) {
  console.log(personData);

  return (
    <div className=" my-4 flex w-full max-w-xs flex-col gap-4">
      {personData.map((person, idx) => {
        return (
          <div key={idx} className=" w-full max-w-sm ">
            <div className="rounded border px-4 py-6">
              <div>
                <div className="  flex gap-2 text-headingFive font-bold text-gray-800 ">
                  <p> {person.firstName}</p>
                  <p> {person.lastName}</p>
                </div>
              </div>
              <div className=" my-4 flex max-w-xs flex-col gap-4 ">
                <div className=" rounded-md border px-6 py-4 shadow-md ">
                  <p className=" text-gray-400 ">kebele</p>
                  <p className=" font-semibold text-gray-800 ">
                    {" "}
                    {person.kebele}
                  </p>
                </div>
                <div className=" rounded-md border px-6 py-4 shadow-md ">
                  <p className=" text-gray-400 ">licenseNumber</p>
                  <p className=" font-semibold text-gray-800 ">
                    {" "}
                    {person.licenseNumber}
                  </p>
                </div>
                <div className=" rounded-md border px-6 py-4 shadow-md ">
                  <p className=" text-gray-400 ">armType</p>
                  <p className=" font-semibold text-gray-800 ">
                    {" "}
                    {person.armType}
                  </p>
                </div>
                <div className=" rounded-md border px-6 py-4 shadow-md ">
                  <p className=" text-gray-400 ">bulletNumber</p>
                  <p className=" font-semibold text-gray-800 ">
                    {person.bulletNumber}
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
