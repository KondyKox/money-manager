import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ProtectedRoute = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="w-full h-screen fixed z-9999 flex justify-center items-center">
        <div className="flex justify-center items-center gap-2 relative">
          {Array.from("Wczytuję...").map((char, i) => (
            <span
              key={i}
              style={{ animationDelay: `${i * 0.1}s` }}
              className={`font-mono font-bold animate-letter-bounce inline-block motion-reduce:animate-none`}
            >
              {char}
            </span>
          ))}
        </div>
      </div>
    );
  }

  if (!user) return <Navigate to={"/login"} replace />;

  return <Outlet />;
};

export default ProtectedRoute;
