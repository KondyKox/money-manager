import type { SavingElementProps } from "../../types/Savings";

const SavingElement = ({ saving, onDelete, onEdit }: SavingElementProps) => {
  const amount = saving.amount;

  return (
    <>
      <button className="flex justify-between items-center w-full p-4 rounded-xl hover:bg-cyan-400 transition-colors duration-150 cursor-pointer">
        <span className="text-md">
          {new Date(saving.date).toLocaleDateString("pl-PL", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
        <span
          className={`font-mono font-semibold text-xl ${amount > 0 ? "text-green-600" : "text-red-500"}`}
        >
          {amount > 0 ? "+" : "-"} {amount > 0 ? amount : -amount}zł
        </span>
      </button>
    </>
  );
};

export default SavingElement;
