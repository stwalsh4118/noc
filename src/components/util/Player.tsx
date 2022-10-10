import React, { useEffect, useRef, useState } from "react";
import { PointerLockControls, FirstPersonControls, Sky } from "@react-three/drei";
import { BufferGeometry, Euler, Mesh, Vector3 } from "three";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { usePlayerPosition } from "../../globals";
import checkCollision from "../../lib/checkCollision";
import { useSphere } from "@react-three/cannon";
import { Position } from "@react-three/drei/helpers/Position";

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

function Player({ position }, useCollisions?: boolean) {
	const { camera } = useThree();
	const { forward, backward, left, right, up, down } = usePersonControls();
	const [ref, api] = useSphere(() => ({ position: position.toArray(), args: [0] }));

	const SPEED = 15;

	useEffect(() => {
		api.position.subscribe((pos) => {
			usePlayerPosition.setState({
				playerPosition: new Vector3(pos[0], pos[1], pos[2]),
			});
		});
	}, []);

	useFrame((state, delta) => {
		camera.position.set(ref.current.position.x, ref.current.position.y, ref.current.position.z);
		ref.current.rotation.setFromQuaternion(camera.quaternion);

		const direction = new Vector3();
		camera.getWorldDirection(direction);

		const xzDirection = new Vector3(direction.x, 0, direction.z).normalize();

		const currentYPos = ref.current.position.y;

		if (forward) {
			ref.current.position.add(xzDirection.multiplyScalar(SPEED * delta));
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
		let newY = ref.current.position.y;
		if (up) {
			newY += SPEED * delta;
		}
		if (down) {
			newY -= SPEED * delta;
		}

		if (useCollisions) {
			const collision = checkCollision(ref.current.position);
			if (!collision) {
				ref.current.position.y = newY;
			} else {
				if (newY < collision.point.y + 1) {
					ref.current.position.y = collision.point.y + 1;
				} else {
					ref.current.position.y = newY;
				}
			}
		} else {
			ref.current.position.y = newY;
		}

		api.position.set(ref.current.position.x, ref.current.position.y, ref.current.position.z);
	});

	return (
		<>
			<mesh ref={ref as React.RefObject<Mesh<BufferGeometry>>}>
				<sphereGeometry args={[0.1]}></sphereGeometry>
			</mesh>
		</>
	);
}

export default Player;
