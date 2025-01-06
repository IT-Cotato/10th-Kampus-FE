import { Slide, toast } from "react-toastify";

export const CustomToast = (type, message) => {
  const toastOptions = {
    position: "top-center",
    autoClose: 2000,
    hideProgressBar: true,
    closeButton: false,
    pauseOnHover: false,
    draggable: false,
    transition: Slide,
    className: `flex items-center justify-center p-4 rounded-lg 
    ${getToastClass(type)}`,
  };

  switch (type) {
    case 400:
      return toast.error(message, toastOptions);
    case 401:
      return toast.error(message, toastOptions);
    case 404:
      return toast.warning(message, toastOptions);
    default:
      return toast(message, toastOptions);
  }
};

const getToastClass = (type) => {
  switch (type) {
    case 400:
    case 401:
      return "bg-red-500 text-white"; // 에러
    case 404:
      return "bg-yellow-400 text-black"; // 경고
    default:
      return "bg-green-500 text-white"; // 기본
  }
};
