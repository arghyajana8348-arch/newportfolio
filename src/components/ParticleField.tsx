import { useRef, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

interface ParticlesProps {
  count?: number
}

function Particles({ count = 2000 }: ParticlesProps) {
  const meshRef = useRef<THREE.Points>(null)

  const { viewport } = useThree()

  const [positions, velocities] = useMemo(() => {
    const pos = new Float32Array(count * 3)
    const vel = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15
      vel[i * 3] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 1] = (Math.random() - 0.5) * 0.002
      vel[i * 3 + 2] = (Math.random() - 0.5) * 0.002
    }
    return [pos, vel]
  }, [count])

  const sizes = useMemo(() => {
    const s = new Float32Array(count)
    for (let i = 0; i < count; i++) {
      s[i] = Math.random() * 2 + 0.5
    }
    return s
  }, [count])

  useFrame((state) => {
    if (!meshRef.current) return
    const positionsArray = meshRef.current.geometry.attributes.position.array as Float32Array
    const time = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positionsArray[i3] += velocities[i3] + Math.sin(time * 0.3 + i * 0.01) * 0.001
      positionsArray[i3 + 1] += velocities[i3 + 1] + Math.cos(time * 0.2 + i * 0.01) * 0.001
      positionsArray[i3 + 2] += velocities[i3 + 2]

      // Boundary wrap
      if (Math.abs(positionsArray[i3]) > 10) positionsArray[i3] *= -0.9
      if (Math.abs(positionsArray[i3 + 1]) > 10) positionsArray[i3 + 1] *= -0.9
      if (Math.abs(positionsArray[i3 + 2]) > 8) positionsArray[i3 + 2] *= -0.9
    }

    meshRef.current.geometry.attributes.position.needsUpdate = true
    meshRef.current.rotation.y = time * 0.02
  })

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          args={[sizes, 1]}
          count={count}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#6dd3ff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

function FloatingGeometry() {
  const meshRef = useRef<THREE.Mesh>(null)
  const wireRef = useRef<THREE.Mesh>(null)

  useFrame((state) => {
    const t = state.clock.elapsedTime
    if (meshRef.current) {
      meshRef.current.rotation.x = t * 0.15
      meshRef.current.rotation.y = t * 0.2
      meshRef.current.position.y = Math.sin(t * 0.5) * 0.3
    }
    if (wireRef.current) {
      wireRef.current.rotation.x = -t * 0.1
      wireRef.current.rotation.z = t * 0.12
      wireRef.current.position.y = Math.cos(t * 0.4) * 0.2
    }
  })

  return (
    <>
      <mesh ref={meshRef} position={[3.5, 0, -2]}>
        <icosahedronGeometry args={[1.2, 1]} />
        <meshBasicMaterial
          color="#6dd3ff"
          wireframe
          transparent
          opacity={0.15}
        />
      </mesh>
      <mesh ref={wireRef} position={[-3, 1, -3]}>
        <octahedronGeometry args={[0.8, 0]} />
        <meshBasicMaterial
          color="#8b82ff"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </>
  )
}

function GridFloor() {
  return (
    <gridHelper
      args={[40, 40, '#0a2a3a', '#0a1520']}
      position={[0, -4, 0]}
      rotation={[0, 0, 0]}
    />
  )
}

export function ParticleField() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 65 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
      gl={{ antialias: false, alpha: true }}
      dpr={[1, 1.5]}
    >
      <Particles count={1500} />
      <FloatingGeometry />
      <GridFloor />
    </Canvas>
  )
}
