import { LogOut, Menu, Palette, X } from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "../../hooks/useToast";

interface NavbarProps {
  onOpenColors: () => void;
  bgColor: string;
  textColor: string;
}

type NavItem = {
  to: string;
  label: string;
  visibility: "always" | "guest" | "auth";
};

const links: NavItem[] = [
  { to: "/", label: "Strona główna", visibility: "always" },
  { to: "/login", label: "Logowanie", visibility: "guest" },
  { to: "/profiles", label: "Profile & Statystyki", visibility: "auth" },
  { to: "/dashboard", label: "Panel główny", visibility: "auth" },
];

const Navbar = ({ onOpenColors, bgColor, textColor }: NavbarProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { user, loading, signOut } = useAuth();
  const { showToast } = useToast();

  const visibleLinks = links.filter((link) => {
    if (link.visibility === "always") return true;
    if (loading) return false; // don't guess while the session loads
    return link.visibility === "auth" ? !!user : !user;
  });

  const handleSignOut = async () => {
    try {
      await signOut();
      showToast("Wylogowano.", "success");
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "Nie udało się wylogować.",
        "error",
      );
    }
  };

  return (
    <nav
      className={`w-full px-4 py-3 flex items-center justify-between fixed z-40 ${bgColor} ${textColor}`}
    >
      <NavLink to={"/"} className="text-center font-bold text-lg">
        Wydatkonator
      </NavLink>

      {/* Desktop links */}
      <div className="hidden md:flex gap-6 items-center">
        {visibleLinks.map((link) => (
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

        {user && (
          <button
            onClick={handleSignOut}
            className="nav-link flex gap-2 justify-center items-center"
          >
            <LogOut size={20} className="iconBtn hover:text-red-400" />
            Wyloguj
          </button>
        )}
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
          {visibleLinks.map((link) => (
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

          {user && (
            <button
              onClick={handleSignOut}
              className="nav-link flex gap-2 justify-center items-center"
            >
              <LogOut size={20} className="iconBtn hover:text-red-400" />
              Wyloguj
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
