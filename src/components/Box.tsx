import { useFrame } from "@react-three/fiber";
import { useRef, useState } from "react";

function Box({ position }) {
	// This reference gives us direct access to the THREE.Mesh object
	const mesh = useRef<THREE.Mesh>(null!);
	// Hold state for hovered and clicked events
	const [hovered, hover] = useState(false);
	const [clicked, click] = useState(false);
	// Subscribe this component to the render-loop, rotate the mesh every frame
	useFrame((state, delta) => {
		mesh.current.rotation.y += 2 * delta;
		mesh.current.rotation.x += 2 * delta;
	});
	// Return the view, these are regular Threejs elements expressed in JSX
	return (
		<mesh position={position} ref={mesh} scale={clicked ? 1.5 : 1} onClick={(event) => click(!clicked)} onPointerOver={(event) => hover(true)} onPointerOut={(event) => hover(false)}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={hovered ? "hotpink" : "orange"} />
		</mesh>
	);
}

export default Box;
