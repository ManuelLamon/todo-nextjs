import { toast,Slide } from "react-toastify";

type TypeToast = "success" | "error" | "warning";

export const ToastCall = (type: TypeToast, message: string) => {
  const color = {
    success: "border-lime-600",
    error: "border-red-600",
    warning: "border-yellow-400",
  };
  const title = {
    success: "Listo",
    error: "Ups...",
    warning: "Alerta",
  };

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
