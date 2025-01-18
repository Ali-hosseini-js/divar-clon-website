import { signIn } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "../module/Loader";

function CheckOtpForm({ mobile, setStep }) {
  const [otp, setOTP] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const submitHandler = async (event) => {
    event.preventDefault();

    setLoading(true);
    const res = await signIn("credentials", {
      mobile,
      otp,
      redirect: false,
    });
    setLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      router.push("/");
    }
  };

  // const deleteHandler = async (event) => {
  //   event.preventDefault();

  //   const res = await fetch(`/api/profile/delete/${data._id}`, {
  //     method: "DELETE",
  //   });
  //   const result = await res.json();
  //   console.log(result);
  //   if (result.error) toast.error(result.error);
  //   setStep(1);
  // };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form
          onSubmit={submitHandler}
          className="max-w-[500px] m-auto flex flex-col mt-[100px] border border-solid border-gray-600 rounded-md p-8 gap-5"
        >
          <p className="text-lg font-medium">تایید کد ارسال شده</p>
          <span className="text-gray-500 text-sm">
            کد پیامک شده به شماره ({mobile}) را وارد کنید.
          </span>
          <label htmlFor="input">کد تایید را وارد کنید</label>
          <input
            type="text"
            id="input"
            placeholder="کد تایید"
            value={otp}
            onChange={(e) => setOTP(e.target.value)}
            className=" p-1 border border-solid border-gray-600 rounded-md"
          />
          <button
            type="submit"
            className="w-fit px-3 py-1 border-none bg-[#a62626] text-white rounded-md cursor-pointer"
          >
            ورود
          </button>
          <button
            onClick={() => setStep(1)}
            className="bg-white px-3 py-1 rounded-md text-[#a62626] border border-solid border-[#a62626] w-fit mt-7"
          >
            تغییر شماره موبایل
          </button>
        </form>
      )}
    </>
  );
}

export default CheckOtpForm;
