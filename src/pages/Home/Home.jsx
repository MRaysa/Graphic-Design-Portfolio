import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Text, Float, Environment } from "@react-three/drei";
import { motion, useMotionValue, useSpring } from "framer-motion";
import * as THREE from "three";

// 1. Custom Cursor Component
const CustomCursor = () => {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorScale = useMotionValue(1);
  const springConfig = { damping: 20, stiffness: 300 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);
  const cursorScaleSpring = useSpring(cursorScale, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    const handleMouseDown = () => cursorScale.set(0.8);
    const handleMouseUp = () => cursorScale.set(1);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY, cursorScale]);

  return (
    <motion.div
      className="fixed w-8 h-8 rounded-full pointer-events-none mix-blend-difference z-50"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        scale: cursorScaleSpring,
        background:
          "radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(124,58,237,0.7) 70%)",
        boxShadow: "0 0 15px rgba(124,58,237,0.8)",
      }}
      animate={{
        opacity: [0.8, 1, 0.8],
      }}
      transition={{
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
};

// 2. Floating Background Elements
const FloatingBackground = () => {
  const gradients = [
    { color: "rgba(139, 92, 246, 0.1)", size: 150 },
    { color: "rgba(6, 182, 212, 0.1)", size: 200 },
    { color: "rgba(236, 72, 153, 0.1)", size: 180 },
    { color: "rgba(245, 158, 11, 0.1)", size: 220 },
  ];

  return (
    <>
      {gradients.map((gradient, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-[100px]"
          style={{
            width: gradient.size,
            height: gradient.size,
            background: gradient.color,
            left: `${10 + i * 20}%`,
            top: `${10 + i * 15}%`,
          }}
          animate={{
            x: [0, (Math.random() - 0.5) * 100, 0],
            y: [0, (Math.random() - 0.5) * 100, 0],
            rotate: [0, 360],
          }}
          transition={{
            duration: 20 + i * 5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      <motion.div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%"],
        }}
        transition={{
          duration: 120,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </>
  );
};

// 3. Enhanced Particles System
const CreativeParticles = ({ count = 200 }) => {
  const particlesRef = useRef();
  const positions = useRef(new Float32Array(count * 3));
  const colors = useRef(new Float32Array(count * 3));
  const sizes = useRef(new Float32Array(count));

  useEffect(() => {
    for (let i = 0; i < count; i++) {
      positions.current[i * 3] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 1] = (Math.random() - 0.5) * 20;
      positions.current[i * 3 + 2] = (Math.random() - 0.5) * 20;

      colors.current[i * 3] = 0.5 + Math.random() * 0.5;
      colors.current[i * 3 + 1] = 0.3 + Math.random() * 0.7;
      colors.current[i * 3 + 2] = 0.5 + Math.random() * 0.5;

      sizes.current[i] = 0.1 + Math.random() * 0.3;
    }

    return () => {
      if (particlesRef.current?.geometry) {
        particlesRef.current.geometry.dispose();
      }
    };
  }, [count]);

  useFrame(({ clock }) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.x = clock.getElapsedTime() * 0.02;
      particlesRef.current.rotation.y = clock.getElapsedTime() * 0.03;
      particlesRef.current.material.opacity =
        0.6 + Math.sin(clock.getElapsedTime() * 0.5) * 0.3;
    }
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry attach="geometry">
        <bufferAttribute
          attach="attributes-position"
          array={positions.current}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          array={colors.current}
          count={count}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          array={sizes.current}
          count={count}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        attach="material"
        size={0.2}
        sizeAttenuation
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// 4. Main 3D Text Component
const ThreeDText = () => {
  const textRef = useRef();

  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = clock.getElapsedTime() * 0.1;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.5}>
      <Text
        ref={textRef}
        font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
        fontSize={0.8}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        position={[0, 0, 0]}
      >
        Welcome
        <meshStandardMaterial
          metalness={0.7}
          roughness={0.2}
          envMapIntensity={2}
          emissive="#6366f1"
          emissiveIntensity={0.3}
        />
      </Text>
    </Float>
  );
};

// 5. Main Home Component
const Home = () => {
  const [isReady, setIsReady] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const controlsRef = useRef();

  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 1000);

    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });

      if (controlsRef.current) {
        controlsRef.current.target.x = (e.clientX / window.innerWidth) * 2 - 1;
        controlsRef.current.target.y =
          -(e.clientY / window.innerHeight) * 2 + 1;
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden bg-gray-900">
      <CustomCursor />
      <FloatingBackground />

      {/* Loading Screen */}
      {!isReady && (
        <div className="absolute inset-0 flex items-center justify-center z-50 bg-gray-900">
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-white text-xl mb-4">Loading Experience</div>
            <motion.div
              className="w-64 h-1 bg-gray-700 rounded-full overflow-hidden mx-auto"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="h-full bg-gradient-to-r from-purple-500 to-indigo-600" />
            </motion.div>
          </motion.div>
        </div>
      )}

      {/* 3D Scene */}
      <div className="absolute inset-0 h-screen w-full">
        <Canvas
          dpr={Math.min(window.devicePixelRatio, 2)}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
        >
          <ambientLight intensity={0.3} />
          <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
          <pointLight position={[-5, -5, 5]} intensity={0.5} color="#8b5cf6" />

          <Environment preset="city" />

          <Suspense fallback={null}>
            <CreativeParticles count={300} />
            <ThreeDText />
          </Suspense>

          <OrbitControls
            ref={controlsRef}
            enableZoom={true}
            enablePan={false}
            enableRotate={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 4}
            maxDistance={15}
            minDistance={5}
          />
        </Canvas>
      </div>

      {/* Mouse-responsive Light */}
      <Canvas
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 1,
          opacity: 0.2,
        }}
      >
        <pointLight
          position={[mousePosition.x * 10, mousePosition.y * 10, 5]}
          color="#8b5cf6"
          intensity={2}
          distance={15}
        />
      </Canvas>

      {/* 2D UI Content */}
      <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4">
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="max-w-3xl"
        >
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-white mb-6"
            whileHover={{ scale: 1.05 }}
          >
            Creative <span className="text-purple-400">Design</span> &{" "}
            <span className="text-cyan-400">Development</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-300 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            Crafting immersive digital experiences with cutting-edge
            technologies
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2, duration: 0.8 }}
          >
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(124, 58, 237, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg text-white font-bold text-lg shadow-lg"
            >
              View My Work
            </motion.button>

            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 20px rgba(6, 182, 212, 0.5)",
              }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-lg text-white font-bold text-lg shadow-lg"
            >
              Contact Me
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5 }}
        >
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <div className="w-8 h-14 rounded-full border-2 border-white/50 flex justify-center p-1">
              <motion.div
                className="w-2 h-2 bg-white rounded-full"
                animate={{
                  y: [0, 8, 0],
                  opacity: [1, 0.5, 1],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
