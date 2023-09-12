import { useRef } from 'react'
import { Canvas, useFrame, useLoader } from '@react-three/fiber'
import {
	useGLTF,
	Caustics,
	MeshRefractionMaterial,
	Stats,
} from '@react-three/drei'
import { RGBELoader } from 'three-stdlib'
import { Bloom, EffectComposer } from '@react-three/postprocessing'

function Diamond(props) {
	const ref = useRef()
	const { nodes } = useGLTF(
		'https://uploads-ssl.webflow.com/64fb0433305262197cecd66e/650096b511e91a1b23d770c2_diamond.glb.txt'
	)
	const texture = useLoader(
		RGBELoader,
		'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/aerodynamics_workshop_1k.hdr'
	)

	useFrame(() => {
		ref.current.rotation.y += 0.001;
	})
	return (
		<Caustics
			backfaces
			color={'white'}
			position={[0, 0, 0]}
			lightSource={[0, 0, 0]}
			worldRadius={0.1}
			ior={2.8}
			backfaceIor={1.1}
			intensity={0.1}
		>
			<mesh ref={ref} geometry={nodes.Diamond_1_0.geometry} {...props}>
				<MeshRefractionMaterial
					envMap={texture}
					bounces={3}
					aberrationStrength={0.01}
					ior={2.4}
					fresnel={1}
					toneMapped={false}
				/>
			</mesh>
		</Caustics>
	)
}

export default function App() {
	const isDev = import.meta.env.DEV
	return (
		<Canvas flat camera={{ position: [0, -3, 0], fov: 45 }}>
			{isDev ? <Stats /> : ''}
			<ambientLight intensity={1} />
			<Diamond rotation={[2, 0, -0.2]} position={[0, 0, 0.2]} />
			<EffectComposer>
				<Bloom luminanceThreshold={1} intensity={2} levels={9} mipmapBlur />
			</EffectComposer>
		</Canvas>
	)
}