import { useTheme } from "../hooks/useTheme";

const Home = () => {
  const { color } = useTheme();

  return (
    <div className="flex flex-col justify-center items-center min-h-[40vh]">
      <div
        className="flex flex-col justify-center items-center animate-fade-in"
        style={{ animationDelay: "150ms" }}
      >
        <h1 className={`text-4xl md:text-5xl font-extrabold ${color.header}`}>
          WYDATKONATOR
        </h1>
        <p
          className={`text-center font-semibold mt-2 ${color.text}`}
          style={{ animationDelay: "150ms" }}
        >
          Totalne wydatki sigiemek
        </p>
      </div>
    </div>
  );
};

export default Home;
