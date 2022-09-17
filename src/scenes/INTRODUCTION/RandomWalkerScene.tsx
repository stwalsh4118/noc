import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useEffect, useRef, useState } from "react";
import { PointerLockControls, FirstPersonControls, Sky } from "@react-three/drei";
import { Physics, usePlane, useSphere } from "@react-three/cannon";
import { Vector3 } from "three";
import Player from "../../components/util/Player";
import RandomWalker from "../../components/INTRODUCTION/RandomWalker";

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

function RandomWalkerScene() {
	const [placeholders, setPlaceholders] = useState(0);

	return (
		<>
			<div className="absolute z-10">{placeholders}</div>
			<div className="w-screen h-screen">
				<Canvas className="w-full h-full bg-slate-400">
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<Player postion={new Vector3(0, 100, 0)}></Player>
					<Plane></Plane>
					<RandomWalker position={new Vector3(0, 0, 0)} stepTime={0.1} walkType="uniform"></RandomWalker>
					<Sky distance={4500000} turbidity={1} rayleigh={1} sunPosition={[1000, 100, 0]} inclination={45} azimuth={0.75} />
				</Canvas>
			</div>
		</>
	);
}

export default RandomWalkerScene;
