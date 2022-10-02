import React, { useEffect, useRef, useState } from "react";
import { PointerLockControls, FirstPersonControls, Sky } from "@react-three/drei";
import { Vector3 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { usePlayerPosition } from "../../globals";

const usePersonControls = () => {
	const keys = {
		KeyW: "forward",
		KeyS: "backward",
		KeyA: "left",
		KeyD: "right",
		Space: "jump",
	};

	const moveFieldByKey = (key) => keys[key];

	const [movement, setMovement] = useState({
		forward: false,
		backward: false,
		left: false,
		right: false,
		jump: false,
	});

	useEffect(() => {
		const handleKeyDown = (e) => {
			setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: true }));
		};
		const handleKeyUp = (e) => {
			setMovement((m) => ({ ...m, [moveFieldByKey(e.code)]: false }));
		};
		document.addEventListener("keydown", handleKeyDown);
		document.addEventListener("keyup", handleKeyUp);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.removeEventListener("keyup", handleKeyUp);
		};
	}, []);
	return movement;
};

function Player({ postion }) {
	const { camera } = useThree();
	const { forward, backward, left, right, jump } = usePersonControls();
	const ref = useRef(null);

	const SPEED = 15;

	useFrame((state, delta) => {
		// Calculating front/side movement ...
		let frontVector = new Vector3(0, 0, 0);
		let sideVector = new Vector3(0, 0, 0);
		let direction = new Vector3(0, 0, 0);

		frontVector.set(0, 0, Number(forward) - Number(backward));
		sideVector.set(Number(right) - Number(left), 0, 0);
		direction
			.subVectors(frontVector, sideVector)
			.normalize()
			.multiplyScalar(SPEED * delta);
		// console.log(direction);

		// api.velocity.set(direction.x, 0, direction.z);

		ref.current.translateX(-direction.x);
		ref.current.translateZ(-direction.z);
		if (ref.current.position.y < 1) {
			// ref.current.position.y = 1;
		}
		// console.log(mesh.current.position);

		usePlayerPosition.setState({ playerPosition: new Vector3(ref.current.position.x, ref.current.position.y, ref.current.position.z) });

		camera.position.set(ref.current.position.x, ref.current.position.y, ref.current.position.z);
		ref.current.rotation.setFromVector3(new Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z));
	});

	return (
		<>
			<mesh ref={ref} position={postion}>
				<sphereGeometry args={[0]}></sphereGeometry>
			</mesh>
			<PointerLockControls />
		</>
	);
}

export default Player;
