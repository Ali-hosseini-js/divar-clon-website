import toast, { Toaster } from "react-hot-toast";
import validateMobileNumber from "../module/ValidateMobileNumber";

function SendOtpForm({ mobile, setMobile, setStep }) {
  const submitHandler = async (event) => {
    event.preventDefault();

    validateMobileNumber(mobile);

    if (mobile.length !== 11) return;

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ mobile }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    console.log(data.message);

    toast.success(data.message);
    if (res.status === 200) setStep(2);
  };
  return (
    <form
      onSubmit={submitHandler}
      className="max-w-[500px] m-auto flex flex-col mt-[100px] border border-solid border-gray-600 rounded-md p-8 gap-5"
    >
      <p className="text-lg font-medium">ورود به حساب کاربری</p>
      <span className="text-gray-500 text-sm">
        برای استفاده از امکانات دیوار لطفا شماره موبایل خود را وارد کنید. کد
        تایید به این شماره پیامک خواهد شد.
      </span>
      <label htmlFor="mobile">شماره موبایل خود را وارد کنید</label>
      <input
        type="text"
        id="mobile"
        name="mobile"
        placeholder="شماره موبایل"
        value={mobile}
        onChange={(e) => setMobile(e.target.value)}
        className=" p-1 border border-solid border-gray-600"
      />
      <button
        type="submit"
        className="w-fit px-3 py-1 border-none bg-[#a62626] text-white rounded-md cursor-pointer"
      >
        ارسال کد تایید
      </button>
      <Toaster />
    </form>
  );
}

export default SendOtpForm;
