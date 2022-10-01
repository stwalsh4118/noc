import {} from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import alea from "alea";

function Plane(props) {
	const ref = useRef(null);

	useEffect(() => {
		ref.current.rotation.x = -Math.PI / 2;
		ref.current.position.y = 0;
		const prng = alea("seed");
		const noise = createNoise2D(prng);
		console.log(noise(1, 1));
	}, []);

	return (
		<>
			<mesh ref={ref} receiveShadow>
				<planeGeometry args={[100, 100]}></planeGeometry>
				<meshStandardMaterial color="gray"></meshStandardMaterial>
			</mesh>
		</>
	);
}

export default Plane;
