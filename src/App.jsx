import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import {
	useGLTF,
	MeshRefractionMaterial,
	Stats,
} from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'

function Diamond(props) {
	const ref = useRef()
	const { nodes } = useGLTF(
		'https://uploads-ssl.webflow.com/64fb0433305262197cecd66e/650096b511e91a1b23d770c2_diamond.glb.txt'
	)
	const texture = useLoader(
		RGBELoader,
		'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr'
	)

	useFrame((state, delta) => (ref.current.rotation.y += delta * 0.1))
	return (
		<mesh ref={ref} geometry={nodes.Diamond_1_0.geometry} {...props}>
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

export default function App() {
	const isDev = import.meta.env.DEV
	return (
		<Canvas flat linear camera={{ position: [0, -4, 0], fov: 45 }}>
			{isDev ? <Stats /> : ''}
			<Diamond rotation={[2, 0, -0.2]} position={[0, 0, 0.2]} />
		</Canvas>
	)
}