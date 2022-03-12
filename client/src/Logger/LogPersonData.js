import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "react-feather";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLoggerContext } from "../contexts/loggerContext";
import { Link, useHistory } from "react-router-dom";
import { logUserData, signInLoggerWithAPI } from "../adapters/logger";

export default function LogPersonData({ setPersonData, personData }) {
  const formSchema = Yup.object().shape({
    firstName: Yup.string().required("First Name is required!"),
    lastName: Yup.string().required("Last Name is required!"),
    kebele: Yup.string().required("Kebele is required!"),
    licenseNumber: Yup.string().required("License Number is required!"),
    armType: Yup.string().required("Arm Type is required!"),
    bulletNumber: Yup.string().required("bullet Number is required!"),
  });

  const { loggerDetails } = useLoggerContext();
  const formOptions = { resolver: yupResolver(formSchema) };
  let history = useHistory();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm(formOptions);

  return (
    <div className="flex  w-full  max-w-sm flex-col ">
      <div className="mb-4 w-full max-w-sm">
        <ChevronLeft
          onClick={() => history.goBack()}
          className=" h-7 w-7 cursor-pointer rounded-full border p-1 hover:bg-gray-100"
        />
      </div>
      <form
        className="mb-4 w-full max-w-md  "
        onSubmit={handleSubmit(async (data) => {
          await logUserData(data, setValue, setPersonData, personData);
        })}
      >
        <div className=" m-auto max-w-sm space-y-4 rounded-md bg-white p-6 shadow-md ">
          <div>
            <p className=" text-headingFour font-semibold ">SignIn</p>
          </div>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${
              errors.firstName
                ? "border-red-500 focus-within:border-red-500"
                : null
            } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="firstName"
            >
              firstName
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              {...register("firstName")}
              placeholder="firstName"
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>
          <div className="text-red-500">{errors.lastName?.message}</div>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${
              errors.lastName
                ? "border-red-500 focus-within:border-red-500"
                : null
            } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="lastName"
            >
              lastName
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              {...register("lastName")}
              placeholder="lastName"
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>
          <div className="text-red-500">{errors.lastName?.message}</div>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${
              errors.kebele
                ? "border-red-500 focus-within:border-red-500"
                : null
            } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="kebele"
            >
              kebele
            </label>
            <input
              type="text"
              id="kebele"
              name="kebele"
              {...register("kebele")}
              placeholder="kebele"
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>
          <div className="text-red-500">{errors.kebele?.message}</div>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${
              errors.licenseNumber
                ? "border-red-500 focus-within:border-red-500"
                : null
            } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="licenseNumber"
            >
              licenseNumber
            </label>
            <input
              type="text"
              id="licenseNumber"
              name="licenseNumber"
              {...register("licenseNumber")}
              placeholder="licenseNumber"
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>
          <div className="text-red-500">{errors.licenseNumber?.message}</div>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${
              errors.armType
                ? "border-red-500 focus-within:border-red-500"
                : null
            } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="armType"
            >
              armType
            </label>
            <input
              type="text"
              id="armType"
              name="armType"
              {...register("armType")}
              placeholder="armType"
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>
          <div className="text-red-500">{errors.armType?.message}</div>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${
              errors.bulletNumber
                ? "border-red-500 focus-within:border-red-500"
                : null
            } `}
          >
            <label
              className=" block select-none px-2 pt-1.5 text-bodyTwo  font-semibold "
              htmlFor="bulletNumber"
            >
              bulletNumber
            </label>
            <input
              type="text"
              id="bulletNumber"
              name="bulletNumber"
              {...register("bulletNumber")}
              placeholder="bulletNumber"
              className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
            />
          </div>
          <div className="text-red-500">{errors.bulletNumber?.message}</div>

          <div className=" flex justify-center ">
            <Button>Submit</Button>
          </div>
        </div>
      </form>
    </div>
  );
}
