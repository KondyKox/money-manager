import { Menu, Palette, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", label: "Strona główna" },
  { to: "/profile", label: "Profile & Statystyki" },
  { to: "/dashboard", label: "Dashboard" },
];

const Navbar = ({ onOpenColors }: { onOpenColors: () => void }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <nav className="">
      <div>
        <span>Wydatkonator</span>

        {/* Desktop links */}
        <div className="hidden md:flex gap-6">
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
      </div>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="sm:hidden flex flex-col gap-3 mt-3">
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
