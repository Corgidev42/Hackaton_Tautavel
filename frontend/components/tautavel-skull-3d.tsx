"use client"

import { useRef, useState, useEffect, Suspense } from "react"
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber"
import { Float, useGLTF, Environment } from "@react-three/drei"
import * as THREE from "three"
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader"

// Update this path to your actual skull model location
const SKULL_MODEL_PATH = "/models/tautavel-skull.glb"

function SkullModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const groupRef = useRef<THREE.Group>(null)
  const targetRotation = useRef({ x: 0, y: 0 })

  const { scene } = useGLTF(SKULL_MODEL_PATH)

  // base rotation: make upright and rotate 180° around Y (adds PI)
  const BASE_ROTATION = { x: 0, y: -Math.PI / 2 + Math.PI } // rotate 180° and keep pitch upright

  useFrame((state, delta) => {
    if (!groupRef.current) return

    // apply mouse offsets on top of the base rotation
    targetRotation.current.y = BASE_ROTATION.y + mousePosition.x * 0.5
    // reversed Y input: clicking higher on screen now moves the model up
    targetRotation.current.x = BASE_ROTATION.x + mousePosition.y * 0.3

    // Smooth lerp towards target rotation for fluid movement
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotation.current.y, delta * 2)
    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotation.current.x, delta * 2)
  })

  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef} scale={15} position={[0, 0.4, 0]} rotation={[BASE_ROTATION.x, BASE_ROTATION.y, 0]}>
        <primitive object={scene} />
      </group>
    </Float>
  )
}

// Preload the model for better performance
useGLTF.preload(SKULL_MODEL_PATH)

// Loading fallback component
function LoadingFallback() {
  return (
    <mesh>
      <sphereGeometry args={[1, 16, 16]} />
      <meshStandardMaterial color="#e8dcc8" wireframe />
    </mesh>
  )
}

// Load an HDR equirectangular and apply a Y-axis rotation (texture.rotation)
function HDREnvironment({ url, rotation = Math.PI / 2, background = true }: { url: string; rotation?: number; background?: boolean }) {
  const hdr = useLoader(RGBELoader, url)
  // Use equirectangular mapping and rotate the texture around its center
  hdr.mapping = THREE.EquirectangularReflectionMapping
  hdr.center = new THREE.Vector2(0.5, 0.5)
  hdr.rotation = rotation

  const { scene } = useThree()
  useEffect(() => {
    const prevEnv = scene.environment
    const prevBg = scene.background
    scene.environment = hdr
    if (background) scene.background = hdr
    return () => {
      scene.environment = prevEnv
      if (background) scene.background = prevBg
    }
  }, [hdr, scene, background])

  return null
}

export function TautavelSkull3D() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const HDR_URL = "/hdrs/studio_small_03_1k.hdr"
  const [hasHdr, setHasHdr] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let mounted = true
    fetch(HDR_URL, { method: "HEAD" })
      .then((res) => {
        if (!mounted) return
        setHasHdr(res.ok)
      })
      .catch(() => {
        if (!mounted) return
        setHasHdr(false)
      })
    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    // follow pointer (mouse, pen, touch) continuously
    const handlePointerMove = (event: PointerEvent) => {
      const x = (event.clientX / window.innerWidth) * 2 - 1
      const y = (event.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }
    const handleTouchMove = (event: TouchEvent) => {
      const t = event.touches?.[0]
      if (!t) return
      const x = (t.clientX / window.innerWidth) * 2 - 1
      const y = (t.clientY / window.innerHeight) * 2 - 1
      setMousePosition({ x, y })
    }
    window.addEventListener("pointermove", handlePointerMove)
    window.addEventListener("touchmove", handleTouchMove, { passive: true })
    return () => {
      window.removeEventListener("pointermove", handlePointerMove)
      window.removeEventListener("touchmove", handleTouchMove)
    }
  }, [])

  return (
    <div ref={containerRef} className="absolute inset-0 z-0 opacity-30 pointer-events-auto">
      <Canvas camera={{ position: [0, 0.6, 3.2], fov: 45 }} dpr={[1, 2]}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <directionalLight position={[-5, -5, -5]} intensity={0.3} />
        <pointLight position={[0, 2, 3]} intensity={0.5} color="#c9a227" />
        <Suspense fallback={<LoadingFallback />}>
          <SkullModel mousePosition={mousePosition} />
        </Suspense>

        {/* Use HDR if available (so it can be rotated), otherwise fall back to the built-in preset */}
        {hasHdr ? (
          <HDREnvironment url={HDR_URL} rotation={Math.PI / 2} />
        ) : (
          <Environment preset="studio" background />
        )}
      </Canvas>
    </div>
  )
}
