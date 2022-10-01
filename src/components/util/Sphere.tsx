import { Vector3 } from "three";
import React from "react";

export interface SphereProps {
	radius: number;
	position: Vector3;
	color: string;
	velocity?: Vector3;
}

function Sphere({ radius, position, color }: SphereProps) {
	return (
		<>
			<mesh position={[position.x, position.y, position.z]}>
				<sphereGeometry args={[radius, 32, 32]}></sphereGeometry>
				<meshStandardMaterial color={color}></meshStandardMaterial>
			</mesh>
		</>
	);
}

export default Sphere;
