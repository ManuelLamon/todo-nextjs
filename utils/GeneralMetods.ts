import { toast,Slide } from "react-toastify";

type TypeToast = "success" | "error" | "warning";

export const ToastCall = (type: TypeToast, message: string) => {

  toast[type](message, {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
    transition: Slide
  });
};
