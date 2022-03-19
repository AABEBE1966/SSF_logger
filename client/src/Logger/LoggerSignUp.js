import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import { ChevronDown, ChevronLeft, Eye, EyeOff } from "react-feather";
import Button from "../components/Button";
import zones from "../Data";
import { createLogger } from "../adapters/logger";
import { useLoggerContext } from "../contexts/loggerContext";
import { Link, useHistory } from "react-router-dom";
import ResponsiveNavBar from "../ResponsiveNavBar";

export default function LoggerSignUp() {
  const { setLoggerDetails } = useLoggerContext();
  let history = useHistory();

  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("firstName is mandatory"),
    lastName: Yup.string().required("lastName is mandatory"),
    password: Yup.string()
      .required("Password is mandatory")
      .min(6, "Password must be at 3 char long"),
    email: Yup.string()
      .email("Please enter a valid email format !")
      .required("Email is required please !"),
  });

  const formOptions = { resolver: yupResolver(formSchema) };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  const [showPassword, setShowPassword] = useState(false);
  console.log(Object.keys(zones));
  const [isShowingZones, setIsShowingZones] = useState(false);
  const [isShowingDistricts, setIsShowingDistricts] = useState(false);
  const [selectedZone, setSelectedZone] = useState();
  const [selectedDistrict, setSelectedDistrict] = useState();
  return (
    <div className="  flex  flex-col items-center justify-center ">
      <ResponsiveNavBar />

      <div className="mb-4 w-full max-w-sm">
        <ChevronLeft
          onClick={() => history.goBack()}
          className=" h-7 w-7 cursor-pointer rounded-full border p-1 hover:bg-gray-100"
        />
      </div>
      <form
        className="mb-4 w-full max-w-md  "
        onSubmit={handleSubmit(async (data) => {
          if (selectedZone && selectedDistrict) {
            await createLogger(data, selectedZone, selectedDistrict, history);
          } else {
            console.log("you mush did not added dis or zone");
          }
        })}
      >
        <div className=" m-auto max-w-sm space-y-4 rounded-md bg-white p-6 shadow-md ">
          <div>
            <p className=" text-headingFour font-semibold ">Sign Up</p>
          </div>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${errors.firstName
                ? "border-red-500 focus-within:border-red-500"
                : null
              } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              placeholder="saurabh"
              {...register("firstName")}
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>
          <p className=" text-red-500 ">
            {errors.firstName?.type === "required" && errors.firstName.message}
          </p>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${errors.lastName
                ? "border-red-500 focus-within:border-red-500"
                : null
              } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              placeholder="lastName"
              {...register("lastName")}
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>
          <p className=" text-red-500 ">
            {errors.lastName?.type === "required" && errors.lastName.message}
          </p>
          <div>
            <div
              onClick={() => setIsShowingZones(!isShowingZones)}
              className=" mb-2 flex cursor-pointer justify-between rounded-md  border  p-2 shadow-lg "
            >
              <p>{` ${selectedZone ? selectedZone : ""} , ${selectedDistrict ? selectedDistrict : ""
                } `}</p>
              {selectedZone ? null : <p>Zones</p>}
              <ChevronDown
                className={`transition-transform  ${isShowingZones ? " rotate-180 " : "rotate-0  "
                  }  `}
              />
            </div>
            {isShowingZones && (
              <div className=" max-h-[20rem] overflow-scroll rounded-md border px-4 shadow-2xl transition-all scrollbar-hide  ">
                {Object.keys(zones).map((zone, idx) => {
                  return (
                    <div key={idx} className={`  rounded-md  px-4 `}>
                      <div
                        className={`${selectedZone === zone &&
                          "text-headingSix font-medium "
                          } my-2 flex cursor-pointer justify-between`}
                        onClick={() => {
                          setSelectedZone(zone);
                          if (selectedZone === zone) {
                            setIsShowingDistricts(!isShowingDistricts);
                            setSelectedZone("");
                            setSelectedDistrict("");
                          } else {
                            setIsShowingDistricts(true);
                          }
                        }}
                      >
                        <p>{zone}</p>
                        <ChevronDown />
                      </div>
                      {isShowingDistricts && selectedZone === zone && (
                        <div className=" space-y-2 rounded-md border p-4  ">
                          {zones[selectedZone].map((district, idx) => {
                            return (
                              <p
                                key={idx}
                                className=" cursor-pointer "
                                onClick={() => {
                                  setSelectedDistrict(district);
                                  setIsShowingZones(false);
                                }}
                              >
                                {district}
                              </p>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div
            className={` my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500 ${errors.email ? "border-red-500 focus-within:border-red-500" : null
              } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              {...register("email")}
              placeholder="saurabhdaswant@gmail.com"
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>

          <div className="text-red-500">{errors.email?.message}</div>
          <div
            className={`border-gray-gray4 my-2 flex items-center justify-between rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${errors.password
                ? "border-red-500 focus-within:border-red-500"
                : null
              } `}
          >
            <div className=" flex-grow ">
              <label
                className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
                htmlFor="password"
              >
                Password
              </label>
              <input
                type={`${showPassword.password ? "text" : "password"}`}
                id="password"
                name="password"
                {...register("password")}
                className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
              />
            </div>

            <div
              onClick={() => {
                setShowPassword({
                  ...showPassword,
                  password: !showPassword.password,
                });
              }}
              className=" cursor-pointer "
            >
              {showPassword.password ? (
                <Eye className="text-dark scale-75" />
              ) : (
                <EyeOff className="text-dark scale-75" />
              )}
            </div>
          </div>
          <div className="text-red-500">{errors.password?.message}</div>
          <div className=" flex justify-center ">
            <Button>Join Vision</Button>
          </div>
          <div className="  text-xs w-full rounded-md bg-gray-50 p-3 text-center">
            already a member?{" "}
            <Link to="/LoggerSignIn" className="p-3 text-blue-400 ">
              Sign in
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
