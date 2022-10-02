import { Vector3 } from "three";
import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

export interface SphereProps {
	radius: number;
	position: Vector3;
	color: string;
	velocity?: Vector3;
}

function Sphere({ radius, position, color }: SphereProps) {
	const mesh = useRef(null);

	useFrame((state, delta) => {
		if (!document.hasFocus()) {
			return;
		}

		mesh.current.position.x = position.x;
		mesh.current.position.y = position.y;
		mesh.current.position.z = position.z;
	});

	return (
		<>
			<mesh ref={mesh} position={[position.x, position.y, position.z]}>
				<sphereGeometry args={[radius, 32, 32]}></sphereGeometry>
				<meshStandardMaterial color={color}></meshStandardMaterial>
			</mesh>
		</>
	);
}

export default Sphere;
