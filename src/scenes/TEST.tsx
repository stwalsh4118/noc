import { useBox, usePlane } from "@react-three/cannon";
import { useRef } from "react";
import { BufferGeometry, Mesh, Vector3 } from "three";

function Cube(props) {
	const [ref] = useBox(() => ({
		mass: 1,
		...props,
	}));

	console.log(Object.values(props));

	return (
		<mesh ref={ref as React.RefObject<Mesh<BufferGeometry>>}>
			<boxGeometry args={props.args} />
			<meshStandardMaterial color={props.color} />
		</mesh>
	);
}

function TEST() {
	return (
		<>
			<Cube
				position={new Vector3(0, 0, 0).toArray()}
				args={[100, 1, 100]}
				type={"Static"}
				color={"green"}
				onCollide={(e) => {
					console.log("COLLISION", e);
				}}
			></Cube>
			<Cube position={new Vector3(0, 100, 0).toArray()} args={[1, 1, 1]} color={"red"}></Cube>
		</>
	);
}

export default TEST;
