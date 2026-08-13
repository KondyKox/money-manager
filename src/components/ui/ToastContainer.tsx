import { useToast } from "../../hooks/useToast";
import Toast from "./Toast";

const ToastContainer = () => {
  const { toasts, removeToast } = useToast();

  return (
    <div className="flex flex-col gap-2 justify-center items-end fixed bottom-4 right-4 w-full">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          message={toast.message}
          type={toast.type}
          onDismiss={removeToast}
        />
      ))}
    </div>
  );
};

export default ToastContainer;
