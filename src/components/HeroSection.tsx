
import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text3D, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Facebook, Instagram, Linkedin, Youtube, Figma } from 'lucide-react';

const socialLinks = [
  { icon: <Facebook size={20} />, url: 'https://www.facebook.com/imrankjihan', label: 'Facebook' },
  { icon: <Instagram size={20} />, url: 'https://www.instagram.com/imran_khan_jihan', label: 'Instagram' },
  { icon: <Linkedin size={20} />, url: 'https://www.linkedin.com/in/imran-khan-48080b2b6/', label: 'LinkedIn' },
  { icon: <Youtube size={20} />, url: 'https://www.youtube.com/@ikpresenttv', label: 'YouTube' },
  { icon: <Figma size={20} />, url: 'https://www.behance.net/imrankhanjihan', label: 'Behance' },
];

function FloatingName() {
  const textRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.1;
      textRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.1;
    }
  });
  
  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <Text3D
        ref={textRef}
        font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        size={0.5}
        height={0.1}
        curveSegments={4}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={3}
      >
        Imran Khan Jihan
        <meshStandardMaterial 
          color="#20B2AA" 
          metalness={0.8}
          roughness={0.1}
        />
      </Text3D>
    </Float>
  );
}

function SpinningTitle() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <group ref={groupRef} position={[0, -1.5, 0]}>
      <Text3D
        font="https://threejs.org/examples/fonts/helvetiker_regular.typeface.json"
        size={0.3}
        height={0.05}
        curveSegments={4}
        bevelEnabled
        bevelThickness={0.01}
        bevelSize={0.01}
        bevelOffset={0}
        bevelSegments={3}
      >
        Graphic Designer
        <meshNormalMaterial />
      </Text3D>
    </group>
  );
}

const HeroSection = () => {
  const createProfileImageTexture = () => {
    const img = new Image();
    img.src = '/lovable-uploads/4e51df1a-995c-4c8b-ab4b-5b2435165250.png';
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const context = canvas.getContext('2d');
    
    if (context) {
      context.fillStyle = '#20B2AA';
      context.fillRect(0, 0, canvas.width, canvas.height);
      
      img.onload = () => {
        const size = Math.min(img.width, img.height);
        const offsetX = (img.width - size) / 2;
        const offsetY = (img.height - size) / 2;
        
        context.save();
        context.beginPath();
        context.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, Math.PI * 2, true);
        context.closePath();
        context.clip();
        
        context.drawImage(
          img,
          offsetX, offsetY, size, size,
          0, 0, canvas.width, canvas.height
        );
        
        context.restore();
      };
    }
    
    return canvas;
  };

  const canvasTexture = useRef<HTMLCanvasElement | null>(null);
  
  useEffect(() => {
    canvasTexture.current = createProfileImageTexture();
  }, []);

  return (
    <section 
      id="hero" 
      className="min-h-screen relative flex items-center justify-center overflow-hidden pt-20 md:pt-16"
    >
      <div className="absolute inset-0 bg-black/50 z-10"></div>
      
      <div className="container mx-auto px-4 z-20 relative">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="flex flex-col items-center md:items-end space-y-4"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="w-56 h-56 md:w-80 md:h-80 rounded-full border-4 border-teal-light overflow-hidden shadow-xl relative animate-float">
              <img 
                src="/lovable-uploads/75904980-b8dc-49c3-82aa-102cc396ae74.png" 
                alt="Imran Khan Jihan" 
                className="w-full h-full object-cover object-top"  // Added object-top to show more head/hair
              />
            </div>
            
            <motion.div
              className="mt-6 flex gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full bg-teal-dark/80 flex items-center justify-center text-white hover:bg-teal-light transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </motion.div>
          </motion.div>
          
          <motion.div
            className="text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="h-40 mb-6">
              <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
                <pointLight position={[-10, -10, -10]} />
                <FloatingName />
                <SpinningTitle />
              </Canvas>
            </div>
            
            <motion.h2
              className="text-xl md:text-2xl text-white mb-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
            >
              <span className="text-teal-light font-bold">Graphic Designer</span> | <span className="text-teal-light font-bold">Web Designer</span>
            </motion.h2>
            
            <motion.p
              className="text-gray-300 max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 0.8 }}
            >
              "To pursue a challenging career in any sector providing flexible opportunity to
              learn, grow and take responsibility."
            </motion.p>
            
            <motion.div
              className="mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.5 }}
            >
              <a
                href="#contact"
                className="bg-teal-light text-white px-6 py-3 rounded-full font-bold hover:bg-teal-dark transition-all duration-300 hover:scale-105 inline-block"
              >
                Contact Me
              </a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

