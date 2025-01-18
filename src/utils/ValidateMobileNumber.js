import toast from "react-hot-toast";

function validateMobileNumber(input) {
  const mobileRegex = /^09\d{9}$/;

  if (mobileRegex.test(input)) {
    toast.success("کد ورود ارسال شد");
    return true;
  } else {
    toast.error("شماره وارد شده اشتباه است");
    return false;
  }
}

export default validateMobileNumber;
