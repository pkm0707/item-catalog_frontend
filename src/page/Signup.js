import React, { useState } from "react";
import loginSignupLogo from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { ImagetoBase64 } from "../utility/ImagetoBase64";
import { toast } from "react-hot-toast";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  console.log(data);
  const handleShowPassword = () => {
    setShowPassword((pre) => !pre);
  };

  const handleShowConfirmPassword = () => {
    setShowConfirmPassword((pre) => !pre);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const handleUploadImage = async (e) => {
    //console.log(e.target.files[0]);
    const data = await ImagetoBase64(e.target.files[0]);
    console.log(data);
    setData((prev) => {
      return {
        ...prev,
        image: data,
      };
    });
  };
  console.log(process.env.REACT_APP_SERVER_DOMAIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { firstName, email, password, confirmPassword } = data;

    if (firstName && email && password && confirmPassword) {
      if (password === confirmPassword) {
        const fetchData = await fetch(
          `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/signup`,
          {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const dataRes = await fetchData.json();
        console.log(dataRes);

        // alert(dataRes.message)
        toast(dataRes.message);

        if (dataRes.alert) {
          navigate("/login");
        }
      } else {
        alert("check the password & confirmPassword");
      }
    } else {
      alert("please fill all required fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto relative ">
          <img
            src={data.image ? data.image : loginSignupLogo}
            className="w-full h-full" alt="data"
          />

          <label htmlFor="profileImage">
            <div className="absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-50 w-full text-center">
              <p className="text-sm p-1 text-white cursor-pointer"> Upload </p>
            </div>
            <input
              type="file"
              id="profileImage"
              accept="image/*"
              className="hidden"
              onChange={handleUploadImage}
            />
          </label>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="firstname">First Name</label>
          <input
            type={"text"}
            id="firstname"
            name="firstName"
            className="rounded mt-1 mb-2 w-full bg-slate-200 py-1 px-1 focus-within:outline-blue-300"
            value={data.firstName}
            onChange={handleOnChange}
          />

          <label htmlFor="lastname">Last Name</label>
          <input
            type={"text"}
            id="lastname"
            name="lastName"
            className="rounded mt-1 mb-2 w-full bg-slate-200 py-1 px-1  focus-within:outline-blue-300"
            value={data.lastName}
            onChange={handleOnChange}
          />

          <label htmlFor="email">Email</label>
          <input
            type={"email"}
            id="email"
            name="email"
            className="rounded mt-1 mb-2 w-full bg-slate-200 py-1 px-1  focus-within:outline-blue-300"
            value={data.email}
            onChange={handleOnChange}
          />

          <label htmlFor="password">Password</label>
          <div className="flex py-1 px-1 rounded mt-1 mb-2  bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              className=" w-full bg-slate-200 border-none outline-none"
              value={data.password}
              onChange={handleOnChange}
            />

            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowPassword}
            >
              {showPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <label htmlFor="confirmpassword">Confirm Password</label>
          <div className="flex py-1 px-1 rounded mt-1 mb-2  bg-slate-200 focus-within:outline focus-within:outline-blue-300">
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmpassword"
              name="confirmPassword"
              className=" w-full bg-slate-200 border-none outline-none"
              value={data.confirmPassword}
              onChange={handleOnChange}
            />

            <span
              className="flex text-xl cursor-pointer"
              onClick={handleShowConfirmPassword}
            >
              {showConfirmPassword ? <BiShow /> : <BiHide />}
            </span>
          </div>

          <button
            type="submit"
            className="max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 
           text-white text-xl font-medium text-center py-1 rounded-full mt-4 cursor-pointer "
          >
            Sign up
          </button>
        </form>

        <p className="text-left text-sm mt-3">
          Already have account ?{" "}
          <Link className="text-red-500 underline" to={"/login"}>
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
