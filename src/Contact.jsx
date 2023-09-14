import { Canvas, useFrame } from '@react-three/fiber'
import {
	Stats,
} from '@react-three/drei'
import Diamond from './components/Diamond'
import { useRef } from 'react'
import { useInView } from '@react-spring/web'

function CurrentDiamond() {
	const ref = useRef()

	useFrame(() => {
		ref.current.rotation.y += 0.01
	})

	return (
		<Diamond forwardedRef={ref} rotation={[2, 0, -0.2]} position={[-0.5, 0, -0.5]} />
	)
}

function ContactScreen() {
	const isDev = import.meta.env.DEV
	const { ref, inView } = useInView()

	return (
		<div ref={ref} style={{ height: '100%' }}>
			<Canvas frameloop={inView ? 'never' : 'always'} flat linear camera={{ position: [0, -4, 0], fov: 45 }}>
				{isDev ? <Stats /> : ''}
				<CurrentDiamond />
			</Canvas>
		</div>
	)
}

export default function Contact() {
	return (
		<ContactScreen />
	)
}