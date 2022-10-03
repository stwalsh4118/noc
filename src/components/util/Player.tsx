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
		Space: "up",
		ShiftLeft: "down",
	};

	const moveFieldByKey = (key) => keys[key];

	const [movement, setMovement] = useState({
		forward: false,
		backward: false,
		left: false,
		right: false,
		up: false,
		down: false,
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
	const { forward, backward, left, right, up, down } = usePersonControls();
	const ref = useRef(null);

	const SPEED = 15;

	useFrame((state, delta) => {
		camera.position.set(ref.current.position.x, ref.current.position.y, ref.current.position.z);
		ref.current.rotation.setFromQuaternion(camera.quaternion);

		const currentYPos = ref.current.position.y;

		if (forward) {
			ref.current.translateZ(-SPEED * delta);
		}
		if (backward) {
			ref.current.translateZ(SPEED * delta);
		}
		if (left) {
			ref.current.translateX(-SPEED * delta);
		}
		if (right) {
			ref.current.translateX(SPEED * delta);
		}

		ref.current.position.y = currentYPos;

		if (up) {
			ref.current.position.y += SPEED * delta;
		}
		if (down) {
			ref.current.position.y -= SPEED * delta;
		}

		usePlayerPosition.setState({
			playerPosition: new Vector3(
				ref.current.position.x,
				ref.current.position.y,
				ref.current.position.z
			),
		});
	});

	return (
		<>
			<mesh ref={ref} position={postion}>
				<sphereGeometry args={[0]}></sphereGeometry>
			</mesh>
		</>
	);
}

export default Player;
