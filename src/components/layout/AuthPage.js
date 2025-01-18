"use client";

import React, { useState } from "react";
import SendOtpForm from "../template/SendOtpForm";
import CheckOtpForm from "../template/CheckOtpForm";
import { Toaster } from "react-hot-toast";

function AuthPage() {
  const [step, setStep] = useState(1);
  const [mobile, setMobile] = useState("");

  return (
    <div>
      {step === 1 && (
        <SendOtpForm setStep={setStep} mobile={mobile} setMobile={setMobile} />
      )}
      {step === 2 && <CheckOtpForm mobile={mobile} setStep={setStep} />}
      <Toaster />
    </div>
  );
}

export default AuthPage;
