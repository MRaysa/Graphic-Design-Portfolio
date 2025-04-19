import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Nav links data
  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Works", path: "/works" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ];

  // 3D hover animation variants
  const itemVariants = {
    hover: {
      y: -5,
      rotateX: 10,
      transition: { type: "spring", stiffness: 300 },
    },
    tap: {
      scale: 0.95,
      rotateZ: -2,
    },
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 10 }}
      className={`fixed w-full z-50 ${
        scrolled ? "backdrop-blur-md bg-black/80" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo with 3D effect */}
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              YourLogo
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {navLinks.map((link) => (
                <motion.div
                  key={link.path}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <Link
                    to={link.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? "text-white"
                        : "text-gray-300 hover:text-white"
                    }`}
                  >
                    {link.name}
                    {location.pathname === link.path && (
                      <motion.span
                        layoutId="navUnderline"
                        className="absolute left-0 bottom-0 w-full h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"
                        transition={{
                          type: "spring",
                          bounce: 0.2,
                          duration: 0.6,
                        }}
                      />
                    )}
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white focus:outline-none"
              aria-expanded="false"
            >
              <motion.div
                animate={isOpen ? "open" : "closed"}
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {isOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </motion.div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: {
            opacity: 1,
            height: "auto",
            transition: { staggerChildren: 0.1 },
          },
          closed: {
            opacity: 0,
            height: 0,
            transition: { when: "afterChildren" },
          },
        }}
        className="md:hidden overflow-hidden"
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navLinks.map((link) => (
            <motion.div
              key={link.path}
              variants={{
                open: {
                  x: 0,
                  opacity: 1,
                  transition: { type: "spring", stiffness: 100 },
                },
                closed: {
                  x: -50,
                  opacity: 0,
                  transition: { duration: 0.2 },
                },
              }}
            >
              <Link
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium w-full ${
                  location.pathname === link.path
                    ? "bg-gray-900 text-white"
                    : "text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {link.name}
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.nav>
  );
};

export default Navbar;
