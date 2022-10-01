import { useState } from "react";
// import { useHistory } from "react-router-dom";
import { ChevronLeft, Eye, EyeOff } from "react-feather";
import Button from "../components/Button";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useLoggerContext } from "../contexts/loggerContext";
import { Link, useHistory } from "react-router-dom";
import { signInLoggerWithAPI } from "../adapters/logger";
import ResponsiveNavBar from "../ResponsiveNavBar";

export default function LoggerSignIn() {
  const formSchema = Yup.object().shape({
    password: Yup.string()
      .required("Password is mandatory")
      .min(3, "Password must be at 3 char long"),
    email: Yup.string()
      .email("Please enter a valid email format !")
      .required("Email is required please !"),
  });

  const { setLoggerDetails } = useLoggerContext();
  const [showPassword, setShowPassword] = useState(false);
  const formOptions = { resolver: yupResolver(formSchema) };
  let history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm(formOptions);

  return (
    <div className="flex h-screen flex-col items-center justify-center ">
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
          await signInLoggerWithAPI(data, history, setLoggerDetails);
        })}
      >
        <div className=" m-auto max-w-sm space-y-4 rounded-md bg-white p-6 shadow-md ">
          <div>
            <p className=" text-headingFour font-semibold ">SignIn</p>
          </div>
          <div
            className={`border-gray-gray4 my-2  rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${
              errors.name ? "border-red-500 focus-within:border-red-500" : null
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
            className={`border-gray-gray4 my-2 flex items-center justify-between rounded  border-2 bg-gray-100 transition duration-150 ease-in-out focus-within:border-blue-500  ${
              errors.password
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
                type={`${showPassword ? "text" : "password"}`}
                id="password"
                name="password"
                {...register("password")}
                className="w-full rounded-md bg-gray-100 px-2 pb-1.5 font-light outline-none "
              />
            </div>

            <div
              onClick={() => {
                setShowPassword(!showPassword);
              }}
              className=" cursor-pointer "
            >
              {showPassword ? (
                <Eye className="text-dark scale-75" />
              ) : (
                <EyeOff className="text-dark scale-75" />
              )}
            </div>
          </div>
          <div className="text-red-500">{errors.password?.message}</div>
          <div className=" flex justify-center ">
            <Button>Join SSF</Button>
          </div>
          <div className="  text-xs w-full rounded-md bg-gray-50 p-3 text-center">
            Dont have Logger Account?
            <Link to="/LoggerSignUp" className="p-3 text-blue-400 ">
              Sign Up
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}
