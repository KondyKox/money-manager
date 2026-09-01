import { Menu, Palette, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

interface NavbarProps {
  onOpenColors: () => void;
  bgColor: string;
  textColor: string;
}

const links = [
  { to: "/", label: "Strona główna" },
  { to: "/profile", label: "Profile & Statystyki" },
  { to: "/dashboard", label: "Dashboard" },
];

const Navbar = ({ onOpenColors, bgColor, textColor }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav
      className={`w-full px-4 py-3 flex items-center justify-between fixed z-50 ${bgColor} ${textColor}`}
    >
      <span className="text-center font-bold text-lg">Wydatkonator</span>

      {/* Desktop links */}
      <div className="hidden md:flex gap-6 items-center">
        {links.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            className={({ isActive }) =>
              isActive ? "nav-link__current" : "nav-link"
            }
          >
            {link.label}
          </NavLink>
        ))}
        <button
          onClick={onOpenColors}
          className="nav-link flex gap-2 justify-center items-center"
        >
          <Palette size={20} className="iconBtn hover:text-pink-400" />
          Zmiana koloru
        </button>
      </div>

      {/* Hamburger btn */}
      <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <X /> : <Menu />}
      </button>

      {/* Mobile dropdown */}
      {isOpen && (
        <div
          className={`fixed inset-0 top-10 flex flex-col items-center justify-center gap-3 md:hidden ${bgColor} ${textColor}`}
        >
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                isActive ? "nav-link__current" : "nav-link"
              }
            >
              {link.label}
            </NavLink>
          ))}
          <button
            onClick={() => {
              onOpenColors();
              setIsOpen(false);
            }}
            className="nav-link flex gap-2 justify-center items-center"
          >
            <Palette size={20} className="iconBtn hover:text-pink-400" />
            Zmiana koloru
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
