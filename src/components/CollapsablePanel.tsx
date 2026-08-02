import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

interface CollapsablePanelProps {
  header: string;
  children: ReactNode;
  colorClass?: string; // colors for bg, text, shadow, etc.
}

const CollapsablePanel = ({
  header,
  children,
  colorClass = "",
}: CollapsablePanelProps) => {
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);

  return (
    <div className={`${colorClass} rounded-lg px-4 py-6 shadow-sm`}>
      <h3
        onClick={() => setIsCollapsed(!isCollapsed)}
        className={`flex items-center justify-center gap-2 text-center font-bold mb-4 text-xl cursor-pointer hover:${colorClass} transition-colors duration-150`}
      >
        {header}
        <ChevronDown
          size={20}
          className={`transition-transform duration-200 ${isCollapsed ? "-rotate-90" : "rotate-0"}`}
        />
      </h3>
      {!isCollapsed ? children : null}
    </div>
  );
};

export default CollapsablePanel;
