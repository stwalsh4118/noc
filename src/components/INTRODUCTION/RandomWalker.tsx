import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import React from "react";
function Placeholder({ position }) {
	return (
		<mesh position={position}>
			<boxGeometry args={[1, 1, 1]} />
			<meshStandardMaterial color={"red"} />
		</mesh>
	);
}

function RandomWalker({ position, stepTime, walkType = "uniform" }) {
	const [elapsedTime, setElapsedTime] = useState(0);
	const ref = useRef(null);
	const [placeholders, setPlaceholders] = useState([]);
	const { camera } = useThree();

	useFrame((state, delta) => {
		setElapsedTime((prev) => prev + delta);

		if (elapsedTime > stepTime) {
			// console.log("elapsedTime", elapsedTime);
			setElapsedTime(0);

			if (walkType === "uniform") {
				UniformDistributionWalk(ref);
			} else if (walkType === "nonuniform") {
				NonUniformDistributionWalk(ref);
			} else if (walkType === "montecarlo") {
				monteCarloWalk(ref);
			}

			if (placeholders.length >= 1000) {
				setPlaceholders([<Placeholder position={ref.current.position} />]);
			} else {
				setPlaceholders((prev) => [...prev, <Placeholder position={ref.current.position} />]);
			}
		}
	});

	return (
		<>
			<mesh ref={ref} position={position}>
				<boxGeometry args={[1.1, 1.1, 1.1]} />
				<meshStandardMaterial color={"blue"} />
			</mesh>
			{placeholders}
		</>
	);
}

function UniformDistributionWalk(ref) {
	const rand = Math.floor(Math.random() * 8);
	switch (rand) {
		case 0:
			ref.current.position.x += 1;
			break;
		case 1:
			ref.current.position.x -= 1;
			break;
		case 2:
			ref.current.position.z += 1;
			break;
		case 3:
			ref.current.position.z -= 1;
			break;
		case 4:
			ref.current.position.z += 1;
			ref.current.position.x += 1;
			break;
		case 5:
			ref.current.position.z += 1;
			ref.current.position.x -= 1;
			break;
		case 6:
			ref.current.position.z -= 1;
			ref.current.position.x += 1;
			break;
		case 7:
			ref.current.position.z -= 1;
			ref.current.position.x -= 1;
			break;

		default:
			break;
	}
}

//higher tendancy to move down and to the left
function NonUniformDistributionWalk(ref) {
	const rand = Math.floor(Math.random() * 11);
	switch (rand) {
		case 0:
			ref.current.position.x += 1;
			break;
		case 1:
			ref.current.position.x -= 1;
			break;
		case 2:
			ref.current.position.z += 1;
			break;
		case 3:
			ref.current.position.z -= 1;
			break;
		case 4:
			ref.current.position.z += 1;
			ref.current.position.x += 1;
			break;
		case 5:
			ref.current.position.z += 1;
			ref.current.position.x -= 1;
			break;
		case 6:
			ref.current.position.z -= 1;
			ref.current.position.x += 1;
			break;
		case 7:
			ref.current.position.z -= 1;
			ref.current.position.x -= 1;
			break;
		case 8:
			ref.current.position.x -= 1;
			break;
		case 9:
			ref.current.position.z += 1;
			break;
		case 10:
			ref.current.position.z += 1;
			ref.current.position.x -= 1;
			break;

		default:
			break;
	}
}

function monteCarloWalk(ref) {
	const rand = Math.floor(Math.random() * 4);

	let stepSize = 0;

	while (stepSize === 0) {
		const r1 = Math.random();
		const r2 = Math.random();

		if (r2 < r1) {
			stepSize = r1 * 2;
		}
	}

	switch (rand) {
		case 0:
			ref.current.position.x += stepSize;
			break;
		case 1:
			ref.current.position.x -= stepSize;
			break;
		case 2:
			ref.current.position.z += stepSize;
			break;
		case 3:
			ref.current.position.z -= stepSize;
			break;

		default:
			break;
	}
}

export default RandomWalker;
