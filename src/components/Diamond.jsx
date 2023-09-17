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
    'https://images.unsplash.com/photo-1560780552-ba54683cb263?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
  )

  return (
    <mesh ref={forwardedRef || null} geometry={nodes.Diamond_1_0.geometry} {...props}>
      <MeshRefractionMaterial
        envMap={texture}
        bounces={2}
        aberrationStrength={0.01}
        ior={2}
        fresnel={3}
      />
    </mesh >
  )
}