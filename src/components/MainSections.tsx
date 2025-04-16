
import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import * as THREE from 'three';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// Animated 3D Icons for Skills section
const SkillIcon = ({ position, color, scale = 1, rotationSpeed = 0.01 }: { 
  position: [number, number, number], 
  color: string, 
  scale?: number,
  rotationSpeed?: number 
}) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += rotationSpeed;
      meshRef.current.rotation.y += rotationSpeed;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <icosahedronGeometry args={[1, 1]} />
        <meshStandardMaterial color={color} metalness={0.5} roughness={0.2} />
      </mesh>
    </Float>
  );
};

// Skills backdrop component
const SkillsBackdrop = () => {
  return (
    <div className="absolute inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[10, 10, 5]} intensity={0.8} />
        <SkillIcon position={[-4, 2, -5]} color="#00CED1" scale={0.8} />
        <SkillIcon position={[4, -2, -5]} color="#20B2AA" scale={0.7} />
        <SkillIcon position={[-5, -3, -5]} color="#48D1CC" scale={0.6} />
        <SkillIcon position={[5, 3, -5]} color="#5F9EA0" scale={0.9} />
        <SkillIcon position={[0, 0, -10]} color="#008B8B" scale={1.2} />
      </Canvas>
    </div>
  );
};

// About Section Component
export const AboutSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };
  
  return (
    <section id="about" className="py-20 relative bg-gradient-to-b from-black to-gray-900">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          >
            About <span className="text-teal-light">Me</span>
          </motion.h2>
          
          <motion.div
            variants={itemVariants}
            className="glass-effect rounded-xl p-8 text-white shadow-xl"
          >
            <p className="mb-4">
              I'm Imran Khan Jihan, a passionate graphic and web designer with expertise in Adobe Illustrator and Photoshop.
            </p>
            <p className="mb-4">
              I believe in efficiency and accuracy in accomplishing any job with effective
              communication skills, positive and helping attitude, and the ability to work under
              pressure in a team.
            </p>
            <p>
              My goal is to pursue a challenging career that provides flexible opportunities to
              learn, grow, and take responsibility.
            </p>
          </motion.div>
          
          <motion.div
            variants={itemVariants}
            className="mt-12 glass-effect rounded-xl p-8 text-white shadow-xl"
          >
            <h3 className="text-xl font-bold mb-4">Personal Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="mb-2">
                  <span className="text-teal-light font-semibold">Name:</span> Imran Khan Jihan
                </p>
                <p className="mb-2">
                  <span className="text-teal-light font-semibold">Father's Name:</span> SM. Bazlul Hoque Khan
                </p>
                <p className="mb-2">
                  <span className="text-teal-light font-semibold">Mother's Name:</span> Hasmat Jahan Rumi
                </p>
                <p className="mb-2">
                  <span className="text-teal-light font-semibold">Date of Birth:</span> 04 March 2004
                </p>
              </div>
              
              <div>
                <p className="mb-2">
                  <span className="text-teal-light font-semibold">Marital Status:</span> Unmarried
                </p>
                <p className="mb-2">
                  <span className="text-teal-light font-semibold">Gender:</span> Male
                </p>
                <p className="mb-2">
                  <span className="text-teal-light font-semibold">Religion:</span> Islam
                </p>
                <p className="mb-2">
                  <span className="text-teal-light font-semibold">Nationality:</span> Bangladeshi (by Birth)
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Skills Section Component
export const SkillsSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };
  
  const skills = [
    { name: "Adobe Illustrator", icon: "📐", level: 90 },
    { name: "Adobe Photoshop", icon: "🖌️", level: 85 },
    { name: "Web Design", icon: "🌐", level: 80 },
    { name: "MS Office", icon: "📊", level: 75 },
    { name: "Typing", icon: "⌨️", level: 70 },
    { name: "E-mail", icon: "📧", level: 85 },
    { name: "Internet Browsing", icon: "🔍", level: 95 },
  ];
  
  return (
    <section id="skills" className="py-20 relative bg-gray-900">
      <SkillsBackdrop />
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          >
            My <span className="text-teal-light">Skills</span>
          </motion.h2>
          
          <motion.div 
            variants={itemVariants}
            className="glass-effect rounded-xl p-8 shadow-xl"
          >
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="skill-item"
                >
                  <div className="flex items-center mb-2">
                    <span className="text-2xl mr-2">{skill.icon}</span>
                    <h3 className="text-lg font-semibold text-white">{skill.name}</h3>
                  </div>
                  
                  <div className="h-3 w-full bg-gray-700 rounded-full overflow-hidden">
                    <motion.div 
                      className="h-full bg-gradient-to-r from-teal-dark to-teal-light"
                      initial={{ width: 0 }}
                      animate={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: 0.2 * index }}
                    />
                  </div>
                  
                  <div className="text-right text-sm text-teal-light mt-1">
                    {skill.level}%
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

// Education Section Component
export const EducationSection = () => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.3 });
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };
  
  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };
  
  const education = [
    {
      degree: "Higher Secondary Certificate (H.S.C)",
      institute: "Cox's Bazar Commerce College",
      group: "Commerce",
      result: "4.00",
      board: "Chittagong",
      year: "2023",
    },
    {
      degree: "Secondary School Certificate (S.S.C)",
      institute: "Cox's Bazar Collegiate School",
      group: "Commerce",
      result: "3.50",
      board: "Chittagong",
      year: "2021",
    },
  ];
  
  return (
    <section id="education" className="py-20 relative bg-gradient-to-b from-gray-900 to-black">
      <div className="container mx-auto px-4">
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="max-w-4xl mx-auto"
        >
          <motion.h2 
            variants={itemVariants}
            className="text-3xl md:text-4xl font-bold text-center mb-12 text-white"
          >
            My <span className="text-teal-light">Education</span>
          </motion.h2>
          
          <div className="relative ml-4 md:ml-0">
            <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-teal-light transform -translate-x-1/2"></div>
            
            {education.map((edu, index) => (
              <motion.div 
                key={index}
                variants={itemVariants}
                className={`relative mb-12 md:w-1/2 ${
                  index % 2 === 0 ? 'md:ml-auto md:pl-10' : 'md:pr-10'
                }`}
              >
                <div className="hidden md:block absolute top-6 bg-teal-dark rounded-full h-5 w-5 border-4 border-teal-light z-10 transform md:translate-y-0.5 transition-all duration-300 hover:scale-150"
                     style={{ 
                       left: index % 2 === 0 ? '-0.65rem' : 'auto',
                       right: index % 2 === 1 ? '-0.65rem' : 'auto' 
                     }}>
                </div>
                
                <div className="glass-effect rounded-xl p-6 transition-all duration-300 hover:shadow-teal-light/20 hover:shadow-lg">
                  <h3 className="text-xl font-bold text-teal-light mb-2">
                    {edu.degree}
                  </h3>
                  
                  <div className="text-gray-300 mb-4">
                    <p><span className="text-teal-light/80">Institute:</span> {edu.institute}</p>
                    <p><span className="text-teal-light/80">Group:</span> {edu.group}</p>
                    <p><span className="text-teal-light/80">Result:</span> {edu.result}</p>
                    <p><span className="text-teal-light/80">Board:</span> {edu.board}</p>
                    <p><span className="text-teal-light/80">Passing Year:</span> {edu.year}</p>
                  </div>
                  
                  <div className="absolute right-4 bottom-4 text-2xl font-bold text-teal-light/20">
                    {edu.year}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
