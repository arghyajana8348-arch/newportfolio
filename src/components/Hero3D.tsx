import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo, useState, useEffect } from "react";
import * as THREE from "three";
import { Settings2, X } from "lucide-react";

const DEFAULT_CORE = "#22d3ee";
const DEFAULT_RING_OUTER = "#e879f9";
const DEFAULT_RING_INNER = "#22d3ee";

type SceneConfig = {
  coreColor: string;
  ringOuterColor: string;
  ringInnerColor: string;
  glow: number;
};

function Particle({
  initialPosition,
  speed,
  color,
  glow,
}: {
  initialPosition: THREE.Vector3;
  speed: number;
  color: string;
  glow: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const axis = useMemo(() => {
    return new THREE.Vector3(
      Math.random() - 0.5,
      Math.random() - 0.5,
      Math.random() - 0.5,
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
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2 * glow} />
    </mesh>
  );
}

function Scene({ config }: { config: SceneConfig }) {
  const groupRef = useRef<THREE.Group>(null);
  const { coreColor, ringOuterColor, ringInnerColor, glow } = config;

  const particles = useMemo(() => {
    return Array.from({ length: 18 }, (_, i) => ({
      initialPosition: new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 3,
      ),
      speed: 0.15 + Math.random() * 0.35,
      isAccent: i % 3 === 0,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current) return;
    const targetX = state.pointer.y * 0.35;
    const targetY = state.pointer.x * 0.35;
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetX, 0.04);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      targetY + state.clock.elapsedTime * 0.12,
      0.04,
    );
  });

  return (
    <group ref={groupRef}>
      {/* Core wireframe */}
      <mesh>
        <icosahedronGeometry args={[1.5, 0]} />
        <meshStandardMaterial
          color={coreColor}
          emissive={coreColor}
          emissiveIntensity={0.5 * glow}
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
          color={ringOuterColor}
          emissive={ringOuterColor}
          emissiveIntensity={0.6 * glow}
        />
      </mesh>

      {/* Inner cyan ring */}
      <mesh rotation={[Math.PI / 1.8, Math.PI / 3, 0]}>
        <torusGeometry args={[1.9, 0.02, 16, 80]} />
        <meshStandardMaterial
          color={ringInnerColor}
          emissive={ringInnerColor}
          emissiveIntensity={0.4 * glow}
          transparent
          opacity={0.6}
        />
      </mesh>

      {/* Floating particles */}
      {particles.map((p, i) => (
        <Particle
          key={i}
          initialPosition={p.initialPosition}
          speed={p.speed}
          color={p.isAccent ? ringOuterColor : coreColor}
          glow={glow}
        />
      ))}
    </group>
  );
}

export function Hero3D() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [config, setConfig] = useState<SceneConfig>({
    coreColor: DEFAULT_CORE,
    ringOuterColor: DEFAULT_RING_OUTER,
    ringInnerColor: DEFAULT_RING_INNER,
    glow: 1,
  });
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-surface/40">
        <div className="h-5 w-5 rounded-full border-2 border-primary border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full">
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 50 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.3} />
        <pointLight position={[4, 4, 4]} intensity={1.2 * config.glow} color={config.coreColor} />
        <pointLight
          position={[-3, -2, 3]}
          intensity={0.6 * config.glow}
          color={config.ringOuterColor}
        />
        <Scene config={config} />
      </Canvas>

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close 3D controls" : "Open 3D controls"}
        className="absolute top-2 right-2 z-10 rounded-md border border-border/70 bg-background/60 backdrop-blur p-1.5 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
      >
        {open ? <X className="h-3.5 w-3.5" /> : <Settings2 className="h-3.5 w-3.5" />}
      </button>

      {open && (
        <div className="absolute top-11 right-2 z-10 w-56 rounded-lg border border-border/70 bg-background/85 backdrop-blur-md p-3 font-mono text-[11px] text-muted-foreground shadow-xl space-y-3">
          <ColorRow
            label="core"
            value={config.coreColor}
            onChange={(v) => setConfig((c) => ({ ...c, coreColor: v }))}
          />
          <ColorRow
            label="ring outer"
            value={config.ringOuterColor}
            onChange={(v) => setConfig((c) => ({ ...c, ringOuterColor: v }))}
          />
          <ColorRow
            label="ring inner"
            value={config.ringInnerColor}
            onChange={(v) => setConfig((c) => ({ ...c, ringInnerColor: v }))}
          />
          <div>
            <div className="flex items-center justify-between mb-1">
              <span>glow</span>
              <span className="text-primary">{config.glow.toFixed(2)}x</span>
            </div>
            <input
              type="range"
              min={0}
              max={3}
              step={0.05}
              value={config.glow}
              onChange={(e) => setConfig((c) => ({ ...c, glow: parseFloat(e.target.value) }))}
              className="w-full accent-primary"
            />
          </div>
          <button
            type="button"
            onClick={() =>
              setConfig({
                coreColor: DEFAULT_CORE,
                ringOuterColor: DEFAULT_RING_OUTER,
                ringInnerColor: DEFAULT_RING_INNER,
                glow: 1,
              })
            }
            className="w-full rounded-md border border-border/70 py-1 text-muted-foreground hover:text-primary hover:border-primary transition-colors"
          >
            reset
          </button>
        </div>
      )}
    </div>
  );
}

function ColorRow({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-2 cursor-pointer">
      <span>{label}</span>
      <span className="flex items-center gap-2">
        <span className="text-foreground/80">{value}</span>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-6 w-6 rounded border border-border/70 bg-transparent cursor-pointer"
        />
      </span>
    </label>
  );
}
