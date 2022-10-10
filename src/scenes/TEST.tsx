import { useBox, usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { BufferGeometry, Mesh, Vector3 } from "three";

function Cube(props) {
	const [ref, api] = useBox(() => ({
		mass: 1,
		...props,
	}));

	// console.log(Object.values(props));

	useEffect(() => {
		api.position.subscribe((pos) => {
			// console.log(pos);
		});
	}, []);

	useFrame((state, delta) => {
		if (props.controlled) {
			api.velocity.set(0, -10, 0);
		}
	});

	return (
		<mesh ref={ref as React.RefObject<Mesh<BufferGeometry>>}>
			<boxGeometry args={props.args} />
			<meshStandardMaterial color={props.color} />
		</mesh>
	);
}

function TEST() {
	const [pos, setPos] = useState(new Vector3(0, 100, 0));
	useFrame((state, delta) => {
		setPos((prev) => {
			return new Vector3(prev.x, prev.y - 0.1, prev.z);
		});
	});

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
			<Cube
				position={pos.toArray()}
				args={[1, 1, 1]}
				color={"red"}
				controlled="true"
				onCollide={(e) => {
					console.log("COLLISION", e);
				}}
			></Cube>
		</>
	);
}

export default TEST;
