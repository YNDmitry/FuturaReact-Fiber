import React, { useRef } from 'react'
import { Canvas, invalidate, useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import Diamond from './components/Diamond'
import { Perf } from 'r3f-perf'
import { AdaptiveDpr } from '@react-three/drei'

function CurrentDiamond() {
  const ref = useRef()
  const position = [1.5, 0, 0.2]
  const rotation = [2, 0, -0.2]

  const { viewport } = useThree()
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 20
    const y = (mouse.y * viewport.height) / 20
    ref.current.addEventListener('change', invalidate)
    gsap.to(ref.current.position, {
      x: x + position[0],
      y: y + position[1],
      z: position[2],
      duration: 1.5
    })
    gsap.to(ref.current.rotation, {
      y: rotation[2] + mouse.x * 2,
      x: rotation[0] + mouse.y / 2
    })
    return ref.current.removeEventListener('change', invalidate)
  })

  return (
    <>
      <ambientLight color={0x404040} intensity={4} />
      <Diamond forwardedRef={ref} rotation={rotation} position={position} />
    </>
  )
}

function HeroScreen() {
  const isDev = import.meta.env.DEV

  return (
    <div style={{ height: '100vh' }}>
      <Canvas flat linear camera={{ position: [0, -4, 0], fov: 45 }}>
        {isDev ? <Perf position="top-left" /> : ''}
        <ambientLight />
        <pointLight position={[1.5, 0, 0.2]} />
        <CurrentDiamond />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  )
}

export default function Hero() {
  return (
    <HeroScreen />
  )
}