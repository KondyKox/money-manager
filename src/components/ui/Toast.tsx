import { CircleX, ThumbsUp } from "lucide-react";
import { useEffect, useState } from "react";

interface ToastProps {
  id: string;
  message: string;
  type: "success" | "error";
  onDismiss: (id: string) => void;
}

const VISIBLE_DURATION = 3000;
const EXIT_ANIMATION_DURATION = 300;

const Toast = ({ id, message, type, onDismiss }: ToastProps) => {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    const enterTimer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(enterTimer);
  }, []);

  useEffect(() => {
    let removeTimer: ReturnType<typeof setTimeout>;

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      removeTimer = setTimeout(() => {
        onDismiss(id);
      }, EXIT_ANIMATION_DURATION);
    }, VISIBLE_DURATION);

    return () => {
      clearTimeout(exitTimer);
      clearTimeout(removeTimer);
    };
  }, [id, onDismiss]);

  return (
    <div
      className={`w-75 transition-transform duration-300 ${
        isVisible ? "translate-x-0" : "translate-x-full"
      } ${type === "success" ? "bg-green-400" : "bg-red-500"} px-2 py-4 rounded-xl text-white/90`}
    >
      <div className="flex items-center gap-8 flex-wrap relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2">
          {type === "success" ? <ThumbsUp size={20} /> : <CircleX size={20} />}
        </div>
        <span className="pl-12">{message}</span>
      </div>
    </div>
  );
};

export default Toast;
