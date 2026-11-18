import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Stars, Html } from '@react-three/drei'
import * as THREE from 'three'
import { PLANETS, SUN } from '../data/planets'
import { colors } from '../theme'

// ---------- Proceduralne tekstury (bez plików graficznych) ----------
function seeded(seed) {
  let s = seed
  return () => ((s = (s * 16807) % 2147483647) / 2147483647)
}

function makePlanetTexture(planet, seed) {
  const c = document.createElement('canvas')
  c.width = 512
  c.height = 256
  const g = c.getContext('2d')
  const rnd = seeded(seed)
  const { color, bands } = planet.scene

  if (bands) {
    // Gazowe olbrzymy: poziome pasy z delikatnym falowaniem
    let y = 0
    while (y < c.height) {
      const h = 6 + rnd() * 22
      g.fillStyle = bands[Math.floor(rnd() * bands.length)]
      g.fillRect(0, y, c.width, h + 1)
      y += h
    }
    g.globalAlpha = 0.25
    for (let i = 0; i < 40; i++) {
      g.fillStyle = bands[Math.floor(rnd() * bands.length)]
      g.beginPath()
      g.ellipse(rnd() * c.width, rnd() * c.height, 20 + rnd() * 60, 2 + rnd() * 4, 0, 0, Math.PI * 2)
      g.fill()
    }
    if (planet.id === 'jupiter') {
      g.globalAlpha = 0.9
      g.fillStyle = '#b5523a'
      g.beginPath()
      g.ellipse(340, 165, 26, 13, 0, 0, Math.PI * 2)
      g.fill()
    }
  } else {
    // Planety skaliste i lodowe: plamy i kratery
    g.fillStyle = color
    g.fillRect(0, 0, c.width, c.height)
    const base = new THREE.Color(color)
    for (let i = 0; i < 260; i++) {
      const k = 0.75 + rnd() * 0.5
      const col = base.clone().multiplyScalar(k)
      g.globalAlpha = 0.18 + rnd() * 0.25
      g.fillStyle = `#${col.getHexString()}`
      g.beginPath()
      g.arc(rnd() * c.width, rnd() * c.height, 2 + rnd() * 26, 0, Math.PI * 2)
      g.fill()
    }
    if (planet.id === 'earth') {
      g.globalAlpha = 1
      g.fillStyle = '#3f8a4f'
      for (let i = 0; i < 18; i++) {
        g.beginPath()
        g.ellipse(rnd() * c.width, 40 + rnd() * 176, 20 + rnd() * 50, 10 + rnd() * 30, rnd() * 3, 0, Math.PI * 2)
        g.fill()
      }
      g.fillStyle = '#f2f5ff'
      g.fillRect(0, 0, c.width, 14)
      g.fillRect(0, c.height - 14, c.width, 14)
    }
  }
  const tex = new THREE.CanvasTexture(c)
  tex.colorSpace = THREE.SRGBColorSpace
  return tex
}

function makeGlowTexture() {
  const c = document.createElement('canvas')
  c.width = c.height = 256
  const g = c.getContext('2d')
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128)
  grd.addColorStop(0, 'rgba(255,214,140,1)')
  grd.addColorStop(0.25, 'rgba(255,181,71,0.55)')
  grd.addColorStop(0.6, 'rgba(255,140,40,0.12)')
  grd.addColorStop(1, 'rgba(255,120,30,0)')
  g.fillStyle = grd
  g.fillRect(0, 0, 256, 256)
  return new THREE.CanvasTexture(c)
}

// ---------- Elementy sceny ----------
function Sun({ onSelect }) {
  const glow = useMemo(makeGlowTexture, [])
  const ref = useRef()
  useFrame((_, dt) => (ref.current.rotation.y += dt * 0.05))
  return (
    <group>
      <mesh
        ref={ref}
        onClick={(e) => (e.stopPropagation(), onSelect(SUN))}
        onPointerOver={() => (document.body.style.cursor = 'pointer')}
        onPointerOut={() => (document.body.style.cursor = '')}
      >
        <sphereGeometry args={[2.6, 48, 48]} />
        <meshBasicMaterial color={colors.sodium} />
      </mesh>
      <sprite scale={[14, 14, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} />
      </sprite>
      <pointLight intensity={420} distance={0} decay={1.6} color="#fff1d6" />
    </group>
  )
}

function Orbit({ radius, active }) {
  const points = useMemo(() => {
    const pts = []
    for (let i = 0; i <= 128; i++) {
      const a = (i / 128) * Math.PI * 2
      pts.push(new THREE.Vector3(Math.cos(a) * radius, 0, Math.sin(a) * radius))
    }
    return new THREE.BufferGeometry().setFromPoints(pts)
  }, [radius])
  return (
    <line geometry={points}>
      <lineBasicMaterial color={active ? colors.sodium : colors.chart} transparent opacity={active ? 0.9 : 0.55} />
    </line>
  )
}

function Ring({ size }) {
  const tex = useMemo(() => {
    const c = document.createElement('canvas')
    c.width = 256
    c.height = 1
    const g = c.getContext('2d')
    const grd = g.createLinearGradient(0, 0, 256, 0)
    grd.addColorStop(0, 'rgba(228,207,156,0)')
    grd.addColorStop(0.2, 'rgba(228,207,156,0.7)')
    grd.addColorStop(0.45, 'rgba(200,175,120,0.25)')
    grd.addColorStop(0.55, 'rgba(240,222,180,0.8)')
    grd.addColorStop(1, 'rgba(228,207,156,0)')
    g.fillStyle = grd
    g.fillRect(0, 0, 256, 1)
    return new THREE.CanvasTexture(c)
  }, [])
  const geo = useMemo(() => {
    const inner = size * 1.3
    const outer = size * 2.3
    const geometry = new THREE.RingGeometry(inner, outer, 96)
    const pos = geometry.attributes.position
    const uv = geometry.attributes.uv
    const v = new THREE.Vector3()
    for (let i = 0; i < pos.count; i++) {
      v.fromBufferAttribute(pos, i)
      uv.setXY(i, (v.length() - inner) / (outer - inner), 0.5)
    }
    return geometry
  }, [size])
  return (
    <mesh geometry={geo} rotation={[-Math.PI / 2 + 0.45, 0, 0]}>
      <meshBasicMaterial map={tex} transparent side={THREE.DoubleSide} depthWrite={false} />
    </mesh>
  )
}

function Planet({ planet, index, timeRef, selected, onSelect }) {
  const group = useRef()
  const body = useRef()
  const [hovered, setHovered] = useState(false)
  const texture = useMemo(() => makePlanetTexture(planet, 97 + index * 131), [planet, index])
  const phase = useMemo(() => index * 1.7, [index])
  const { size, orbit, speed, ring } = planet.scene

  useFrame((_, dt) => {
    const t = timeRef.current.elapsed
    const a = phase + t * speed * 0.35
    group.current.position.set(Math.cos(a) * orbit, 0, Math.sin(a) * orbit)
    body.current.rotation.y += dt * 0.4 * timeRef.current.speed
  })

  const isSelected = selected?.id === planet.id
  return (
    <>
      <Orbit radius={orbit} active={isSelected || hovered} />
      <group ref={group}>
        <mesh
          ref={body}
          rotation={[0, 0, planet.id === 'uranus' ? 1.7 : 0.4]}
          onClick={(e) => (e.stopPropagation(), onSelect(planet))}
          onPointerOver={(e) => (e.stopPropagation(), setHovered(true), (document.body.style.cursor = 'pointer'))}
          onPointerOut={() => (setHovered(false), (document.body.style.cursor = ''))}
        >
          <sphereGeometry args={[size, 48, 48]} />
          <meshStandardMaterial map={texture} roughness={0.9} metalness={0} />
        </mesh>
        {/* niewidoczna większa sfera ułatwia trafienie w małe planety */}
        <mesh onClick={(e) => (e.stopPropagation(), onSelect(planet))} visible={false}>
          <sphereGeometry args={[Math.max(size * 1.8, 0.9), 12, 12]} />
        </mesh>
        {ring && <Ring size={size} />}
        {(hovered || isSelected) && (
          <Html center distanceFactor={22} position={[0, size + 1.1, 0]} style={{ pointerEvents: 'none' }}>
            <div className="planet-label">{planet.name}</div>
          </Html>
        )}
      </group>
    </>
  )
}

// Jednorazowy „przylot” kamery przy starcie — jedyna nieproszona animacja na stronie
function IntroCamera({ reduced }) {
  const { camera } = useThree()
  const t = useRef(reduced ? 1 : 0)
  const from = useMemo(() => new THREE.Vector3(0, 70, 120), [])
  const to = useMemo(() => new THREE.Vector3(0, 22, 44), [])
  useFrame((_, dt) => {
    if (t.current >= 1) return
    t.current = Math.min(1, t.current + dt / 3.2)
    const k = 1 - Math.pow(1 - t.current, 3)
    camera.position.lerpVectors(from, to, k)
    camera.lookAt(0, 0, 0)
  })
  return null
}

// Na szerokich ekranach przesuwamy obraz sceny w prawo, robiąc miejsce na nagłówek
function ViewOffset() {
  const { camera, size } = useThree()
  useEffect(() => {
    if (size.width > 900) camera.setViewOffset(size.width, size.height, -size.width * 0.2, 0, size.width, size.height)
    else camera.setViewOffset(size.width, size.height, 0, size.height * 0.2, size.width, size.height)
  }, [camera, size])
  return null
}

function Clock({ timeRef }) {
  useFrame((_, dt) => {
    timeRef.current.elapsed += Math.min(dt, 0.1) * timeRef.current.speed
  })
  return null
}

export default function SolarSystem({ speed, paused, selected, onSelect, reducedMotion }) {
  const timeRef = useRef({ elapsed: 0, speed })
  timeRef.current.speed = paused ? 0 : speed

  return (
    <Canvas
      camera={{ position: reducedMotion ? [0, 22, 44] : [0, 70, 120], fov: 45, near: 0.1, far: 2000 }}
      dpr={[1, 2]}
      onPointerMissed={() => onSelect(null)}
      aria-label="Interaktywny model 3D Układu Słonecznego"
    >
      <color attach="background" args={[colors.lapis]} />
      <fog attach="fog" args={[colors.lapis, 90, 220]} />
      <ambientLight intensity={0.12} />
      <Stars radius={260} depth={80} count={6000} factor={5} saturation={0} fade speed={reducedMotion ? 0 : 0.4} />
      <ViewOffset />
      <Clock timeRef={timeRef} />
      <IntroCamera reduced={reducedMotion} />
      <Sun onSelect={onSelect} />
      {PLANETS.map((p, i) => (
        <Planet key={p.id} planet={p} index={i} timeRef={timeRef} selected={selected} onSelect={onSelect} />
      ))}
      <OrbitControls enablePan={false} minDistance={10} maxDistance={140} enableDamping dampingFactor={0.08} zoomSpeed={0.6} />
    </Canvas>
  )
}
