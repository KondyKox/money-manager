const Home = ({
  headerColor,
  textColor,
}: {
  headerColor: string;
  textColor: string;
}) => {
  return (
    <div className="flex flex-col justify-center items-center min-h-[40vh]">
      <div
        className="flex flex-col justify-center items-center animate-fade-in"
        style={{ animationDelay: "150ms" }}
      >
        <h1 className={`text-4xl md:text-5xl font-extrabold ${headerColor}`}>
          WYDATKONATOR
        </h1>
        <p
          className={`text-center font-semibold mt-2 ${textColor}`}
          style={{ animationDelay: "150ms" }}
        >
          Totalne wydatki sigiemek
        </p>
      </div>
    </div>
  );
};

export default Home;
