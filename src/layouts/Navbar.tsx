import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { navbarLinks } from "../data/navbarLinks";
import LogoDesktop from "../assets/neemohlogo.png";
import LogoMobile from "../assets/favicon.png";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [dropdown, setDropdown] = useState<string | null>(null);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("theme") === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const html =  document.documentElement;
    const isDark = html.classList.toggle("dark");
    setDarkMode(isDark);
   localStorage.setItem("theme", isDark ? "dark" : "light");
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
          src={LogoDesktop}
          alt="MyCompany Logo"
          className="hidden md:block h-10"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        />
        <motion.img
          src={LogoMobile}
          alt="MyCompany Logo"
          className="block md:hidden h-8"
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
      <ul
        className={`md:flex md:space-x-6 text-gray-900 dark:text-white absolute md:static top-16 left-0 w-full md:w-auto bg-white dark:bg-gray-900 md:bg-transparent md:dark:bg-transparent shadow-md md:shadow-none p-4 md:p-0 ${
          mobileMenu ? "block" : "hidden md:flex"
        }`}
      >
        {navbarLinks.map((link) => (
          <li key={link.name} className="relative group">
            <Link
              to={link.path || "#"}
              className="block py-2 px-4 md:inline-block"
              onClick={() =>
                setDropdown(dropdown === link.name ? null : link.name)
              }
            >
              {link.name}
            </Link>
            {link.subLinks && (
              <AnimatePresence>
                {(dropdown === link.name || mobileMenu) && (
                  <motion.ul
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute left-0 md:mt-2 w-48 bg-white dark:bg-gray-800 shadow-lg rounded-lg md:block md:group-hover:flex md:flex-col md:static md:w-auto md:bg-transparent md:shadow-none"
                  >
                    {link.subLinks.map((sub) => (
                      <li
                        key={sub.name}
                        className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700"
                      >
                        <Link to={sub.path}>{sub.name}</Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            )}
          </li>
        ))}
      </ul>

      {/* Actions */}
      <div className="flex items-center space-x-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="px-4 py-2 bg-blue-600 text-white rounded-md"
        >
          Contact Us
        </motion.button>
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
        >
          {darkMode ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>
      </div>
    </motion.nav>
  );
};

export default Navbar;
