import React, { useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Stats } from '@react-three/drei'
import gsap from 'gsap'
import Diamond from './components/Diamond'
import { useInView } from '@react-spring/web'
function CurrentDiamond() {
  const ref = useRef()
  const position = [1.5, 0, 0.2]
  const rotation = [2, 0, -0.2]

  const { viewport } = useThree()
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 20
    const y = (mouse.y * viewport.height) / 15
    gsap.to(ref.current.position, {
      x: x + position[0],
      y: y + position[1],
      z: position[2],
      duration: 1.5
    })
    gsap.to(ref.current.rotation, {
      y: rotation[2] + mouse.x,
    })
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
  const { ref, inView } = useInView()

  return (
    <div ref={ref} style={{ height: '100vh' }}>
      <Canvas performance={inView ? 'always' : 'never'} flat linear camera={{ position: [0, -4, 0], fov: 45 }}>
        {isDev ? <Stats /> : ''}
        <CurrentDiamond />
      </Canvas>
    </div>
  )
}

export default function Hero() {
  return (
    <HeroScreen />
  )
}