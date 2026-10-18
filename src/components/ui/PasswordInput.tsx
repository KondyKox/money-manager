import { useState } from "react";
import type { PasswordInputProps } from "../../types/PasswordInput";
import { Eye, EyeClosed } from "lucide-react";

const PasswordInput = ({
  id,
  label,
  value,
  onChange,
  autoComplete,
  placeholder,
}: PasswordInputProps) => {
  const [show, setShow] = useState<boolean>(false);

  return (
    <div className="input-group">
      <label htmlFor={id}>{label}</label>
      <div>
        <input
          id={id}
          name={id}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autoComplete}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          type="button"
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-900 cursor-pointer"
          onClick={() => setShow(!show)}
          aria-label={show ? "Ukryj hasło" : "Pokaż hasło"}
        >
          {show ? <EyeClosed size={16} /> : <Eye size={16} />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInput;
