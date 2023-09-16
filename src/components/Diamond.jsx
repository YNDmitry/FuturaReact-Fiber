import { TextureLoader } from 'three'
import { MeshRefractionMaterial, useGLTF } from '@react-three/drei'
import { useLoader } from '@react-three/fiber'
import React from 'react'

export default function Diamond(props) {
  const { forwardedRef } = props
  const { nodes } = useGLTF(
    'https://uploads-ssl.webflow.com/64fb0433305262197cecd66e/650096b511e91a1b23d770c2_diamond.glb.txt'
  )
  const texture = useLoader(
    TextureLoader,
    'https://uploads-ssl.webflow.com/64fb0433305262197cecd66e/6505bc0d84ac02253c7782e6_augustine-wong-li0iC0rjvvg-unsplash.jpg'
  )

  return (
    <mesh ref={forwardedRef || null} geometry={nodes.Diamond_1_0.geometry} {...props}>
      <MeshRefractionMaterial
        envMap={texture}
        bounces={1.5}
        aberrationStrength={0.05}
        ior={2}
        fresnel={3}
      />
    </mesh >
  )
}