import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";

const CYAN = "#22d3ee";
const MAGENTA = "#e879f9";

function Particle({
  initialPosition,
  speed,
  color,
}: {
  initialPosition: THREE.Vector3;
  speed: number;
  color: string;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const axis = useMemo(() => {
    return new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5
    ).normalize();
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime * speed;
    const pos = initialPosition.clone();
    pos.applyAxisAngle(axis, t);
    ref.current.position.copy(pos);
    ref.current.rotation.x = t;
    ref.current.rotation.y = t * 0.7;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={2}
      />
    </mesh>
  );
}

function Scene() {
  const groupRef = useRef<THREE.Group>(null);

  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      initialPosition: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3
      ),
      speed: 0.15 + Math.random() * 0.35,
      color: i % 3 === 0 ? MAGENTA : CYAN,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.35;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetX,
      0.04
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + state.clock.elapsedTime * 0.12,
      0.04
    );
  });

  return (
    <group ref={groupRef}>
      {/* Core wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.5}
          wireframe
          transparent
          opacity={0.5}
        />
      </mesh>

      {/* Inner solid core */}
      <mesh>
        <icosahedronGeometry args={[1.35, 1]} />
        <meshStandardMaterial
          color="#0f172a"
          transparent
          opacity={0.9}
          roughness={0.2}
          metalness={0.9}
        />
      </mesh>

      {/* Outer magenta ring */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[2.3, 0.025, 16, 100]} />
        <meshStandardMaterial
          color={MAGENTA}
          emissive={MAGENTA}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Inner cyan ring */}
      <mesh rotation={[Math.PI / 1.8, Math.PI / 3, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 80]} />
        <meshStandardMaterial
          color={CYAN}
          emissive={CYAN}
          emissiveIntensity={0.4}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle key={i} {...p} />
      ))}
    </group>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-surface/40">
        <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} intensity={1.2} color={CYAN} />
        <pointLight position={[-3, -2, 3]} intensity={0.6} color={MAGENTA} />
        <Scene />
      </Canvas>
    </div>
  );
}
