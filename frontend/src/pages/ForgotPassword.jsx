import React, { use, useState } from "react";
import { ClipLoader } from "react-spinners";
import axios from "axios";
import { serverUrl } from "../App";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [inputClicked, setInputClicked] = useState({
    email: false,
    otp: false,
    newPassword: false,
    confirmNewPassword: false,
  });
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleStep1 = async () => {
    setLoading(true);
    setErr("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/sendOtp`,
        { email },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setStep(2);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message);
      setLoading(false);
    }
  };

  const handleStep2 = async () => {
    setLoading(true);
    setErr("");
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/verifyOtp`,
        { email, otp },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setStep(3);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message);
      setLoading(false);
    }
  };

  const handleStep3 = async () => {
    if (newPassword !== confirmNewPassword) {
      return setErr("Password Does Not Match!");
    }
    setErr("");
    setLoading(true);
    try {
      const result = await axios.post(
        `${serverUrl}/api/auth/resetPassword`,
        { email, password: newPassword },
        {
          withCredentials: true,
        }
      );
      console.log(result);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setErr(error.response?.data?.message);
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {step === 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-zinc-400 rounded-2xl flex justify-start items-center flex-col border-[#1a1f23] pt-[80px]">
          <h2 className="text-[30px] font-semibold mb-[60px]">
            Forgot Password
          </h2>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
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

          {err && <p className="text-red-500">{err}</p>}

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[40px]"
            disabled={loading}
            onClick={handleStep1}>
            {loading ? (
              <ClipLoader
                size={30}
                color="white"
              />
            ) : (
              "Send OTP"
            )}
          </button>
        </div>
      )}

      {step === 2 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-zinc-400 rounded-2xl flex justify-start items-center flex-col border-[#1a1f23] pt-[80px]">
          <h2 className="text-[30px] font-semibold mb-[60px]">
            Forgot Password
          </h2>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() => setInputClicked({ ...inputClicked, otp: true })}>
            <label
              htmlFor="otp"
              className={`bg-zinc-400 absolute left-[20px] p-[5px]  text-[15px] 
              pointer-events-none ${inputClicked.otp ? "top-[-20px]" : ""}`}>
              Enter Your OTP
            </label>
            <input
              type="text"
              id="otp"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setOtp(e.target.value)}
              value={otp}
            />
          </div>

          {err && <p className="text-red-500">{err}</p>}

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[40px]"
            disabled={loading}
            onClick={handleStep2}>
            {loading ? (
              <ClipLoader
                size={30}
                color="white"
              />
            ) : (
              "Submit OTP"
            )}
          </button>
        </div>
      )}

      {step === 3 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-zinc-400 rounded-2xl flex justify-start items-center flex-col border-[#1a1f23] pt-[80px]">
          <h2 className="text-[30px] font-semibold mb-[60px]">
            Reset Password
          </h2>
          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black"
            onClick={() =>
              setInputClicked({ ...inputClicked, newPassword: true })
            }>
            <label
              htmlFor="newPassword"
              className={`bg-zinc-400 absolute left-[20px] p-[5px]  text-[15px] 
              pointer-events-none ${
                inputClicked.newPassword ? "top-[-20px]" : ""
              }`}>
              Enter Your New Password
            </label>
            <input
              type="text"
              id="newPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setNewPassword(e.target.value)}
              value={newPassword}
            />
          </div>

          <div
            className="relative flex items-center justify-start w-[90%] h-[50px] rounded-2xl border-2 border-black mt-[40px]"
            onClick={() =>
              setInputClicked({ ...inputClicked, confirmNewPassword: true })
            }>
            <label
              htmlFor="confirmNewPassword"
              className={`bg-zinc-400 absolute left-[20px] p-[5px]  text-[15px] 
              pointer-events-none ${
                inputClicked.confirmNewPassword ? "top-[-20px]" : ""
              }`}>
              Confirm Your New Password
            </label>
            <input
              type="text"
              id="confirmNewPassword"
              className="w-[100%] h-[100%] rounded-2xl px-[20px] outline-none border-0"
              required
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              value={confirmNewPassword}
            />
          </div>

          {err && <p className="text-red-500">{err}</p>}

          <button
            className="w-[70%] px-[20px] py-[10px] bg-black text-white font-semibold h-[50px] cursor-pointer rounded-2xl mt-[40px]"
            disabled={loading}
            onClick={handleStep3}>
            {loading ? (
              <ClipLoader
                size={30}
                color="white"
              />
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
