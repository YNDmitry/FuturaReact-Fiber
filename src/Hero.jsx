import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import gsap from 'gsap'
import Diamond from './components/Diamond'
import { Perf } from 'r3f-perf'
import { AdaptiveDpr } from '@react-three/drei'
import { useInView } from '@react-spring/web'

function CurrentDiamond() {
  const ref = useRef()
  const position = [0, 0, -0.5]
  const rotation = [2, 0, -0.2]

  if (window.innerWidth <= 991) {
    position[0] = 0
  }
  let mouse = {
    x: 0,
    y: 0
  }
  document.addEventListener('mousemove', (e) => {
    mouse.x = e.x
    mouse.y = e.y
  })
  useFrame(() => {
    if (window.innerWidth <= 991) {
      ref.current.rotation.y += 0.01
    } else {
      const x = mouse.x / window.innerWidth
      const y = mouse.y / window.innerHeight
      gsap.to(ref.current.position, {
        x: x + position[0],
        duration: 1.5
      })
      gsap.to(ref.current.rotation, {
        y: rotation[2] + x * 2,
        x: rotation[0] + y - 0.8
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
    <div ref={ref} style={{ height: '100%' }}>
      <Canvas flat linear camera={{ position: [0, -3, 0], fov: 45 }}>
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