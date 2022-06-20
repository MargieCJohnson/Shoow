import { toast } from "react-toastify";

export function successToast(text) {
  toast.success(text);
}

export function errorToast(text) {
  toast.error(text, {
    autoClose: 5000,
  });
}

export function infoToast(text) {
  toast.info(text);
}

export function removeToast(text) {
  toast(text, {
    className: "removeToast",
  });
}
