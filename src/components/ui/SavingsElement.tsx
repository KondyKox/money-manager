import type { SavingElementProps } from "../../types/Savings";

const SavingElement = ({ saving, onDelete, onEdit }: SavingElementProps) => {
  return (
    <>
      <button className="flex justify-between items-center">
        {saving.amount}
      </button>
    </>
  );
};

export default SavingElement;
