import { useSignals } from "@preact/signals-react/runtime";
import { toasts, removeToast } from "../modules/store";

const TYPE_DATA = {
  info: { style: "", icon: "" },
  success: { style: "", icon: "" },
  warning: { style: "", icon: "" },
  error: { style: "", icon: "" },
};

export default function ToastList() {
  useSignals();

  return (
    <div className="fixed bottom-4 right-4 z-1000 flex flex-col gap-2 items-end">
      {toasts.value.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-2 px-4 py-2 rounded-md shadow-lg 
            text-sm font-medium cursor-pointer select-none transition-all 
            duration-300 ease-bounce 
            ${TYPE_DATA[toast.type].style ?? TYPE_DATA.info.style} 
            ${toast.visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
          onClick={() => removeToast(toast.id)}
        >
          <span>{TYPE_DATA[toast.type].icon}</span>
          <span>{toast.message}</span>
        </div>
      ))}
    </div>
  );
}
