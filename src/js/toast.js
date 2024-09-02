import { toast } from "react-toastify";

export const successToast = (message) => {
    toast.success(message, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };
  
  export const errorToast = (message) => {
    toast.error(message, {
      position: 'top-center',
      autoClose: 2500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: 'light',
    });
  };