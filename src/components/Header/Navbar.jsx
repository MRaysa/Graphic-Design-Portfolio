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
    { name: "Works", path: "/works", icon: "🖼️" },
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
      className={`sticky top-0 w-full z-50 bg-gradient-to-b from-gray-900 to-gray-800 text-white ${
        isScrolled
          ? "bg-[conic-gradient(at_top,_var(--tw-gradient-stops))] from-purple-900 via-indigo-800 to-blue-900 backdrop-blur-md shadow-lg"
          : "bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/80 via-gray-900 to-black/90"
      } transition-all duration-500`}
    >
      {/* Animated floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-white/10"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              width: Math.random() * 10 + 5 + "px",
              height: Math.random() * 10 + 5 + "px",
            }}
            animate={{
              y: [0, -50],
              opacity: [0.2, 0.8, 0],
              transition: {
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 5,
              },
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <motion.div
            whileHover={{ rotateY: 180 }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0 z-10"
          >
            <NavLink
              to="/"
              className="text-2xl font-bold bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              DesignFolio
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.nav
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="hidden md:flex space-x-4"
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
            className="md:hidden p-2 text-gray-300 hover:text-white focus:outline-none z-10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-8 h-8"
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
            initial={{ opacity: 0, y: "-100vh" }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: "-100vh" }}
            transition={{ type: "spring", damping: 20 }}
            className="md:hidden fixed inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-purple-900/95 via-gray-900 to-black/95 backdrop-blur-xl pt-24 z-30"
          >
            <motion.ul
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="container mx-auto px-6 space-y-6"
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
                      `flex items-center text-3xl font-medium py-6 px-4 rounded-xl ${
                        isActive
                          ? "bg-gradient-to-r from-cyan-500/20 to-purple-600/20 text-white"
                          : "text-gray-400 hover:text-white hover:bg-white/5"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className="mr-6">{item.icon}</span>
                        {item.name}
                        {isActive && (
                          <motion.span
                            layoutId="mobileIndicator"
                            className="ml-auto w-4 h-4 rounded-full bg-gradient-to-r from-cyan-400 to-purple-600"
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
