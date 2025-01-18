import toast from "react-hot-toast";

function validateMobileNumber(input) {
  // Regex for mobile number validation
  const mobileRegex = /^09\d{9}$/;

  // Test the input against the regex
  if (mobileRegex.test(input)) {
    return true;
  } else {
    toast.error("شماره وارد شده اشتباه است");
    return false;
  }
}

export default validateMobileNumber;
