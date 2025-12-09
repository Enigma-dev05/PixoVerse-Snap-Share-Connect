import React, { useState } from "react";

function ForgotPassword() {
  const [step, setStep] = useState(1);
  return (
    <div className="w-full h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col justify-center items-center">
      {step === 1 && (
        <div className="w-[90%] max-w-[500px] h-[500px] bg-white rounded-2xl flex justify-center items-center flex-col border-[#1a1f23]">
          <h2 className="text-[30px] font-semibold">Forgot Password</h2>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
