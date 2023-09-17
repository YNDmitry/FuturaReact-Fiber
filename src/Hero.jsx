import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import gsap from 'gsap'
import Diamond from './components/Diamond'
import { Perf } from 'r3f-perf'
import { AdaptiveDpr } from '@react-three/drei'
import { useInView } from '@react-spring/web'

function CurrentDiamond() {
  const ref = useRef()
  const position = [1.5, 0, 0.2]
  const rotation = [2, 0, -0.2]

  if (window.innerWidth <= 991) {
    position[0] = 0
  }
  const { viewport } = useThree()
  useFrame(({ mouse }) => {
    if (window.innerWidth <= 991) {
      ref.current.rotation.y += 0.01
    } else {
      const x = (mouse.x * viewport.width) / 20
      const y = (mouse.y * viewport.height) / 20
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
    }
  })


  return (
    <>
      <ambientLight color={0x404040} intensity={4} />
      <Diamond forwardedRef={ref} rotation={rotation} position={position} />
    </>
  )
}

function DisableRender() {
  useFrame(() => null, 1000);
}

function HeroScreen() {
  const isDev = import.meta.env.DEV
  const [ref, inView] = useInView()

  return (
    <div ref={ref} style={{ height: '100vh' }}>
      <Canvas flat linear camera={{ position: [0, -4, 0], fov: 45 }}>
        {isDev ? <Perf position="top-left" /> : ''}
        <ambientLight />
        <pointLight position={[1.5, 0, 0.2]} />
        <CurrentDiamond />
        <AdaptiveDpr pixelated />
        {!inView && <DisableRender />}
      </Canvas>
    </div>
  )
}

export default function Hero() {
  return (
    <HeroScreen />
  )
}