import React, { useState } from "react";
import logo from "../assets/Pixoverse-u.png";
import { IoIosEye } from "react-icons/io";
import { IoIosEyeOff } from "react-icons/io";
import axios from "axios";
import { serverUrl } from "../App";
import { ClipLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const [inputClicked, setInputClicked] = useState({
    name: false,
    userName: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      setLoading(true);
      const result = await axios.post(
        `${serverUrl}/api/auth/signup`,
        { name, userName, email, password },
        { withCredentials: true }
      );
      console.log(result.data);
      setLoading(false);
    } catch (error) {
      console.log(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      <div className="w-[90%] lg:max-w-[60%] h-[600px] bg-zinc-400 rounded-2xl flex justify-center items-center overflow-hidden border-2 border-[#1a1f23]">
        {/*This is the Left Side of the Div i.e Sign Up Details */}
        <div className="w-full lg:w-[50%] h-full bg-zinc-400 flex flex-col items-center p-[10px] gap-[15px]">
          <div className="flex gap-[10px] items-center text-[20px] font-semibold mt-[14px]">
            <span>Sign Up To</span>
            <img
              src={logo}
              alt="Logo of PixoVerse"
              className="w-[60px]"
            />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, name: true })}>
            <label
              htmlFor="name"
              className={`bg-zinc-400 absolute left-[20px] p-[5px] text-[15px] pointer-events-none ${
                inputClicked.name ? "top-[-20px]" : ""
              }
             `}>
              Enter Your Name
            </label>
            <input
              type="text"
              id="name"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, userName: true })
            }>
            <label
              htmlFor="userName"
              className={`bg-zinc-400 absolute left-[20px] p-[5px]  text-[15px] pointer-events-none ${
                inputClicked.userName ? "top-[-20px]" : ""
              } `}>
              Enter Your Username
            </label>
            <input
              type="text"
              id="userName"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setUserName(e.target.value)}
              value={userName}
            />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, email: true })}>
            <label
              htmlFor="email"
              className={`bg-zinc-400 absolute left-[20px] p-[5px]  text-[15px] 
              pointer-events-none ${inputClicked.email ? "top-[-20px]" : ""}`}>
              Enter Your Email
            </label>
            <input
              type="email"
              id="email"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </div>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl mt-[20px] border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, password: true })
            }>
            <label
              htmlFor="password"
              className={`bg-zinc-400 absolute left-[20px] p-[5px] text-[15px] pointer-events-none ${
                inputClicked.password ? "top-[-20px]" : ""
              }
              `}>
              Enter Your Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
            {!showPassword ? (
              <IoIosEye
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(true)}
              />
            ) : (
              <IoIosEyeOff
                className="absolute cursor-pointer right-[20px] w-[25px] h-[25px]"
                onClick={() => setShowPassword(false)}
              />
            )}
          </div>
          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[30px]"
            onClick={handleSignUp}
            disabled={loading}>
            {loading ? (
              <ClipLoader
                size={30}
                color="white"
              />
            ) : (
              "Sign Up"
            )}
          </button>
          <p className="cursor-default text-gray-800">
            Already Have An Account?{" "}
            <span
              className="cursor-pointer border-b-2 border-b-black pb-[3px] text-black font-semibold"
              onClick={() => navigate("/signin")}>
              Sign In
            </span>
          </p>
        </div>
        {/*This is the Rigth Side of the Div i.e Logo */}
        <div className="md:w-[50%] h-full hidden lg:flex justify-center items-center bg-[#000000] flex-col gap-[10px] text-white text-[16px] font-semibold rounded-l-[30px] shadow-2xl shadow-black">
          <img
            src={logo}
            alt="Logo Of PixoVerse"
            className="w-[100%]"
          />
          <div></div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
