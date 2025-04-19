import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  const navItems = [
    { name: "Home", path: "/", icon: "🏠" },
    { name: "Works", path: "/works", icon: "✨" },
    { name: "About", path: "/about", icon: "👤" },
    { name: "Contact", path: "/contact", icon: "✉️" },
  ];

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
      rotateZ: [0, -3, 3, 0],
      transition: { type: "spring", stiffness: 400 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", damping: 10 }}
      className={`fixed top-0 w-full z-50 ${
        isScrolled
          ? "bg-gray-900/90 backdrop-blur-md shadow-xl"
          : "bg-transparent"
      } transition-all duration-300`}
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-600/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.6, 0.8, 0.6],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-72 h-72 rounded-full bg-cyan-600/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.5, 0.7, 0.5],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            delay: 2,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo Section - Updated with Name */}
          <motion.div
            whileHover={{
              rotateY: 180,
              scale: 1.05,
              transition: { duration: 0.6 },
            }}
            className="flex-shrink-0 relative z-10 flex items-center gap-2"
          >
            <NavLink
              to="/"
              className="text-3xl font-bold bg-gradient-to-r from-cyan-300 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            >
              Rafim Khan
            </NavLink>
            <motion.span
              className="text-sm font-medium text-gray-300 hidden md:block"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
            >
              Portfolio
            </motion.span>
            <motion.span
              className="absolute -top-1 -right-2 w-2 h-2 bg-pink-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.8, 1, 0.8],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hidden md:flex space-x-1"
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
                      <motion.span
                        className="text-xl mb-1"
                        whileHover={{ scale: 1.3 }}
                        transition={{ type: "spring", stiffness: 400 }}
                      >
                        {item.icon}
                      </motion.span>
                      <span className="text-sm font-medium">{item.name}</span>
                      {isActive && (
                        <motion.span
                          layoutId="navIndicator"
                          className="absolute bottom-0 left-1/2 w-4/5 h-1 bg-gradient-to-r from-cyan-400 to-purple-600 rounded-full -translate-x-1/2"
                          transition={{ type: "spring", bounce: 0.3 }}
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
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-sm border border-cyan-300/30 shadow-lg shadow-cyan-400/10 z-10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-white"
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
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="md:hidden fixed inset-0 bg-gradient-to-b from-purple-900/95 via-indigo-900/95 to-blue-900/95 backdrop-blur-xl pt-32 z-30 overflow-y-auto"
            style={{ height: "100vh" }}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="absolute top-6 right-6 p-2 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-600/20 backdrop-blur-sm border border-cyan-300/30 shadow-lg shadow-cyan-400/10 z-40"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </motion.button>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="container mx-auto px-6 space-y-6"
            >
              {navItems.map((item, index) => (
                <motion.li
                  key={item.path}
                  variants={itemVariants}
                  custom={index}
                  className="overflow-hidden"
                >
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `flex items-center text-2xl font-medium py-5 px-6 rounded-xl ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-400/20 to-purple-600/20 text-white shadow-lg"
                          : "text-gray-400 hover:bg-gray-800/30 hover:text-white"
                      }`
                    }
                    onClick={() => setMobileOpen(false)}
                  >
                    {({ isActive }) => (
                      <>
                        <motion.span
                          className="mr-4 text-2xl"
                          animate={{
                            scale: isActive ? [1, 1.2, 1] : 1,
                          }}
                          transition={{
                            duration: 0.6,
                          }}
                        >
                          {item.icon}
                        </motion.span>
                        <span className="flex-1">{item.name}</span>
                        {isActive && (
                          <motion.span
                            className="w-3 h-3 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ type: "spring", stiffness: 500 }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                </motion.li>
              ))}
            </motion.ul>

            {/* Decorative element */}
            <div className="absolute bottom-10 left-0 right-0 flex justify-center">
              <motion.div
                className="w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent rounded-full"
                animate={{
                  scaleX: [1, 1.5, 1],
                  opacity: [0.6, 1, 0.6],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
