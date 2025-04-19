import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";
import * as THREE from "three";

// 3D Sphere Component
const AnimatedSphere = () => {
  const meshRef = useRef();
  useFrame(({ clock }) => {
    meshRef.current.rotation.x = clock.getElapsedTime() * 0.1;
    meshRef.current.rotation.y = clock.getElapsedTime() * 0.2;
  });

  return (
    <Sphere ref={meshRef} args={[1.5, 32, 32]}>
      <meshStandardMaterial
        color="#6366f1"
        roughness={0.2}
        metalness={0.8}
        envMapIntensity={1}
      />
    </Sphere>
  );
};

const About = () => {
  const ref = useRef();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.2]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  return (
    <motion.section
      ref={ref}
      className="relative min-h-screen w-full overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 text-white"
    >
      {/* Floating background elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.1 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 overflow-hidden"
      >
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-indigo-500/20"
            initial={{
              x: Math.random() * 100 + "vw",
              y: Math.random() * 100 + "vh",
              width: Math.random() * 300 + 100 + "px",
              height: Math.random() * 300 + 100 + "px",
            }}
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, Math.random() * 100 - 50],
              transition: {
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              },
            }}
          />
        ))}
      </motion.div>

      {/* 3D Canvas */}
      <motion.div
        style={{ y }}
        className="absolute top-1/4 right-10 w-64 h-64 md:w-96 md:h-96"
      >
        <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} />
          <AnimatedSphere />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
        </Canvas>
      </motion.div>

      {/* Content */}
      <motion.div
        style={{ opacity, scale }}
        className="container mx-auto px-6 py-32 relative z-10"
      >
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-2xl"
        >
          <motion.h2
            className="text-4xl md:text-6xl font-bold mb-8 bg-gradient-to-r from-indigo-400 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            About Me
          </motion.h2>

          <motion.p
            className="text-lg md:text-xl mb-6 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            I'm a passionate designer with 5+ years of experience creating
            stunning visual experiences that blend aesthetics with
            functionality.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="grid grid-cols-2 gap-4 mt-12"
          >
            {["UI/UX Design", "Branding", "3D Modeling", "Motion Graphics"].map(
              (skill, i) => (
                <motion.div
                  key={skill}
                  whileHover={{ y: -5, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 + i * 0.1 }}
                  className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10"
                >
                  <h3 className="font-medium text-indigo-300">{skill}</h3>
                </motion.div>
              )
            )}
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05, backgroundColor: "#7c3aed" }}
            whileTap={{ scale: 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.2 }}
            className="mt-12 px-8 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium shadow-lg"
          >
            View My Work
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      <motion.div
        className="absolute bottom-20 left-10 w-20 h-20 rounded-full bg-purple-600/20 blur-xl"
        animate={{
          y: [0, -30, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </motion.section>
  );
};

export default About;
