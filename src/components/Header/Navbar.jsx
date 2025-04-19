import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Track scroll position
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Works", path: "/works", icon: "🖼️" },
    { name: "About", path: "/about", icon: "👤" },
    { name: "Contact", path: "/contact", icon: "✉️" },
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 300 },
    },
    hover: {
      y: -5,
      rotateX: 10,
      transition: { type: "spring", stiffness: 400 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 10 }}
      className={`fixed w-full z-50 ${
        isScrolled ? "backdrop-blur-md bg-black/90" : "bg-black/50"
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-20">
          {/* Logo with 3D effect */}
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <NavLink
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-purple-600 bg-clip-text text-transparent"
            >
              DesignFolio
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hidden md:flex space-x-2"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                className="relative"
              >
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex flex-col items-center px-4 py-2 group ${
                      isActive ? "text-white" : "text-gray-300 hover:text-white"
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <span className="text-xl mb-1 group-hover:scale-125 transition-transform">
                        {item.icon}
                      </span>
                      <span className="text-sm font-medium">{item.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-1/2 w-4/5 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full -translate-x-1/2"
                          transition={{ type: "spring", bounce: 0.25 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              </motion.div>
            ))}
          </motion.nav>

          {/* Mobile Menu Button */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileOpen ? (
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
          </motion.button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 bg-black/95 backdrop-blur-lg pt-24 z-40"
          >
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="container mx-auto px-6 space-y-8"
            >
              {navItems.map((item) => (
                <motion.li
                  key={item.path}
                  variants={itemVariants}
                  className="overflow-hidden"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center text-2xl font-medium py-4 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="mr-4">{item.icon}</span>
                        {item.name}
                        {isActive && (
                          <motion.span
                            layoutId="mobileIndicator"
                            className="ml-auto w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
