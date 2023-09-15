import { MeshRefractionMaterial, useGLTF } from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { useLoader } from '@react-three/fiber'
import React from 'react'

export default function Diamond(props) {
  const { forwardedRef } = props
  const { nodes } = useGLTF(
    'https://uploads-ssl.webflow.com/64fb0433305262197cecd66e/650096b511e91a1b23d770c2_diamond.glb.txt'
  )
  const texture = useLoader(
    RGBELoader,
    'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/photo_studio_01_1k.hdr'
  )

  return (
    <mesh ref={forwardedRef || null} geometry={nodes.Diamond_1_0.geometry} {...props}>
      <MeshRefractionMaterial
        envMap={texture}
        bounces={1.5}
        aberrationStrength={0.01}
        ior={2.6}
        fresnel={1}
      />
    </mesh >
  )
}