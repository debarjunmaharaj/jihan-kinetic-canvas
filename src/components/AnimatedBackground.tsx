
import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { useFrame, Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import gsap from 'gsap';

function FloatingParticles({ count = 100 }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const light = useRef<THREE.DirectionalLight>(null);
  
  useEffect(() => {
    if (mesh.current) {
      // Initial animation of particles
      gsap.to(mesh.current.position, {
        y: 0.3,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
    
    if (light.current) {
      // Animate light position
      gsap.to(light.current.position, {
        x: 3,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut"
      });
    }
  }, []);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.rotation.y += 0.002;
      mesh.current.rotation.x += 0.001;
    }
  });
  
  const dummy = new THREE.Object3D();
  const particles = new Array(count).fill(null).map((_, i) => {
    const position = new THREE.Vector3(
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 15
    );
    const scale = Math.random() * 0.2 + 0.05;
    return { position, scale };
  });
  
  return (
    <>
      <directionalLight ref={light} position={[1, 2, 3]} intensity={1.5} />
      <ambientLight intensity={0.4} />
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <dodecahedronGeometry args={[0.2, 0]} />
        <meshStandardMaterial color="#20B2AA" roughness={0.5} metalness={0.2} />
        {particles.map((data, i) => {
          const { position, scale } = data;
          dummy.position.set(position.x, position.y, position.z);
          dummy.scale.set(scale, scale, scale);
          dummy.updateMatrix();
          return <primitive object={dummy} key={i} attach={`instanceMatrix[${i}]`} />;
        })}
      </instancedMesh>
    </>
  );
}

function AnimatedSphere() {
  const sphereRef = useRef<THREE.Mesh>(null);
  
  useFrame(({ clock }) => {
    if (sphereRef.current) {
      sphereRef.current.rotation.x = clock.getElapsedTime() * 0.2;
      sphereRef.current.rotation.y = clock.getElapsedTime() * 0.5;
    }
  });
  
  return (
    <mesh ref={sphereRef} position={[0, 0, 0]}>
      <sphereGeometry args={[1.5, 64, 64]} />
      <meshStandardMaterial 
        color="#008B8B" 
        roughness={0.3} 
        metalness={0.8} 
        wireframe 
      />
    </mesh>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 6], fov: 75 }}>
        <fog attach="fog" args={['#070710', 5, 20]} />
        <OrbitControls 
          enablePan={false} 
          enableZoom={false} 
          rotateSpeed={0.3} 
          autoRotate 
          autoRotateSpeed={0.5} 
        />
        <AnimatedSphere />
        <FloatingParticles count={200} />
      </Canvas>
    </div>
  );
}
