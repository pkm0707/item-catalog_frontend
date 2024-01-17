import React, { useState } from "react";
import loginSignupLogo from "../assest/login-animation.gif";
import { BiHide, BiShow } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { loginRedux } from "../redux/userSlice.js";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const userData = useSelector((state) => state);

  const dispatch = useDispatch();

  const handleShowPassword = () => {
    setShowPassword((pre) => !pre);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = data;

    if (email && password) {
      const fetchData = await fetch(
        `${process.env.REACT_APP_SERVER_DOMAIN}/api/user/login`,
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
      toast(dataRes.message);
      if (dataRes.alert) {
        dispatch(loginRedux(dataRes));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      }
      console.log(userData.user);
    } else {
      alert("please fill all required fields");
    }
  };

  return (
    <div className="p-3 md:p-4">
      <div className="w-full max-w-sm bg-white m-auto flex  flex-col p-4">
        <div className="w-20 overflow-hidden rounded-full drop-shadow-md shadow-md m-auto">
          <img src={loginSignupLogo} className="w-full" alt="loginSignupLogo"/>
        </div>

        <form className="w-full py-3 flex flex-col" onSubmit={handleSubmit}>
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

          <button
            type="submit"
            className="max-w-[150px] m-auto w-full bg-red-500 hover:bg-red-600 
           text-white text-xl font-medium text-center py-1 rounded-full mt-4 cursor-pointer "
          >
            Login
          </button>
        </form>

        <p className="text-left text-sm mt-3">
          Don't have account ?{" "}
          <Link className="text-red-500 underline" to={"/signup"}>
            Signup
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
