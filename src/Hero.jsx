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
  })

  const isAnimating = useRef(false)
  function inEnter() {
    if (!isAnimating.current) {
      gsap.fromTo(ref.current.rotation, {
        y: rotation[2],
      }, {
        y: rotation[2] + 3,
        duration: 10,
        onComplete: () => {
          rotation[2] = rotation[2] + 3;
          console.log(rotation[2]);
          isAnimating.current = false
        },
      });
      isAnimating.current = true
    }
  }

  return (
    <>
      <ambientLight color={0x404040} intensity={4} />
      <Diamond forwardedRef={ref} rotation={rotation} position={position} onPointerEnter={(e) => inEnter(e)} />
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