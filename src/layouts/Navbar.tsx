import { useState } from "react";
import { Link } from "react-router-dom";
import neemohlogo from "../assets/neemohlogo.png";
import favicon from "../assets/favicon.png";
import { navbarLinks } from "../data/navbarLinks";
import { animate, AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark");
  };

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="flex justify-between items-center p-4 shadow-md bg-white dark:bg-gray-900 relative"
    >
      {/* Logo */}
      <Link to="/">
        <motion.img
          src={neemohlogo}
          alt="desktop Logo"
          className="hidden md:blockh-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.img
          src={favicon}
          alt="mobile Logo"
          className="block md:hiddenh-18"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
      </Link>

      {/* Mobile Menu Button */}
      <button className="md:hidden" onClick={() => setMobileMenu(!mobileMenu)}>
        {mobileMenu ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Navigation Links */}
      <AnimatePresence>
        {mobileMenu && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:flex space-x-6 text-gray-900 dark:text-white absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent shadow-md md:shadow-none p-4 md:p-0"
          >
            {navbarLinks.map((link) => (
              <li
                className="relative"
                onMouseEnter={() => link.subLinks && setDropdown(link.name)}
                onMouseLeave={() => setDropdown(null)}
                key={link.name}
              >
                <Link
                  to={link.path || "#"}
                  className="block py-2 px-4 md:inline-block"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
      {/* Actions */}
      <div className="">
        <button></button>
        <button></button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
