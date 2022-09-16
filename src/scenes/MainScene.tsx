import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import Box from "../components/Box";
import { PointerLockControls, FirstPersonControls, Sky } from "@react-three/drei";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { Vector3 } from "three";

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

function Player() {
	const { camera } = useThree();
	const { forward, backward, left, right, jump } = usePersonControls();
	const ref = useRef(null);

	const SPEED = 5;

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
		ref.current.position.y = 1;
		// console.log(mesh.current.position);

		camera.position.set(ref.current.position.x, ref.current.position.y, ref.current.position.z);
		ref.current.rotation.setFromVector3(new Vector3(camera.rotation.x, camera.rotation.y, camera.rotation.z));
		// mesh.current.getWorldPosition(mesh.current.position);
		// console.log(mesh.current.rotation.x, mesh.current.rotation.y, mesh.current.rotation.z);
		// console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
	});

	return (
		<>
			<mesh ref={ref}>
				<sphereGeometry args={[0]}></sphereGeometry>
			</mesh>
		</>
	);
}

function Plane(props) {
	const ref = useRef(null);

	useEffect(() => {
		ref.current.rotation.x = -Math.PI / 2;
		ref.current.position.y = 0;
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

function MainScene() {
	return (
		<>
			<div className="w-screen h-screen">
				<Canvas className="w-full h-full bg-slate-400">
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Box position={[-1.2, 0, 0]} />
					<Box position={[1.2, 0, 0]} />
					<PointerLockControls />
					<Player></Player>
					<Plane></Plane>
					<Sky distance={4500000} turbidity={1} rayleigh={1} sunPosition={[1000, 100, 0]} inclination={45} azimuth={0.75} />
				</Canvas>
			</div>
		</>
	);
}

export default MainScene;
