import { useLayoutEffect, useRef, useState } from "react";
import { BG_PALETTE } from "../../constants/bgPalette";
import type { EditModalProps } from "../../types/Modal";
import Modal from "./Modal";
import type { Color, Profile } from "../../types/Profile";
import { saveProfile } from "../../utils/saveProfile";

const ColorPicker = ({
  isOpen,
  onClose,
  editedProfile,
  setEditedProfile,
}: EditModalProps) => {
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [maxWidth, setMaxWidth] = useState<number | null>(null);

  useLayoutEffect(() => {
    const widths = itemRefs.current.map((el) => el?.offsetWidth ?? 0);
    setMaxWidth(Math.max(...widths));
  }, []);

  const handleChangeColor = (color: Color) => {
    const updatedProfile: Profile = {
      ...editedProfile,
      color: color,
    };

    setEditedProfile(updatedProfile);
    saveProfile(updatedProfile);
  };

  if (!isOpen) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-center font-bold text-xl border-b-2 pb-4">
        Jaki kolor wariacie?
      </h2>

      <div className="flex justify-center items-stretch gap-2 flex-wrap py-4 overflow-y-auto max-h-75 md:max-h-50">
        {BG_PALETTE.map((color, index) => (
          <div
            key={color.name}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            style={maxWidth ? { width: maxWidth } : undefined}
            className={`${color.bg} ${color.text} p-4 text-center border uppercase cursor-pointer relative after:content-[''] after:absolute 
                        after:inset-0 after:bg-pink-500/80 after:opacity-0 after:transition-opacity after:duration-200 hover:after:opacity-100`}
            onClick={() => handleChangeColor(color)}
          >
            {color.name}
          </div>
        ))}
      </div>
    </Modal>
  );
};

export default ColorPicker;
