import BaseScene from "../BaseScene";
import Plane from "../../components/util/Plane";
import { BoxGeometry, Vector3 } from "three";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import Sphere, { SphereProps } from "../../components/util/Sphere";

interface SphereEncloseureProps {
	boxSize: Vector3;
	boxPosition: Vector3;
}

interface BouncingSphereProps {
	radius: number;
	position: Vector3;
	velocity: Vector3;
	SphereEnclosure?: SphereEncloseureProps;
}

function SphereEnclosure({ boxSize, boxPosition }: SphereEncloseureProps) {
	return (
		<>
			<lineSegments position={[boxPosition.x, boxPosition.y, boxPosition.z]}>
				<edgesGeometry args={[new BoxGeometry(boxSize.x, boxSize.y, boxSize.z)]}></edgesGeometry>
				<lineBasicMaterial color={"red"}></lineBasicMaterial>
			</lineSegments>
		</>
	);
}

//!!! I AM TOO LAZY TO CHANGE THIS BUT THIS IS THE WRONG WAY TO DO THIS, MUTATE THE POSITION INSIDE THE SCENE ITSSELF AND JUST UPDATE THE POSITIONS ON THE SPHERE DUMBASS
function BouncingSphere({ radius, position, velocity, SphereEnclosure = { boxSize: new Vector3(10, 10, 10), boxPosition: new Vector3(0, 5, 0) } }: BouncingSphereProps) {
	const mesh = useRef<THREE.Mesh>(null!);

	const xOffSet = SphereEnclosure.boxSize.x / 2 - radius;
	const yOffSet = SphereEnclosure.boxSize.y / 2 - radius;
	const zOffSet = SphereEnclosure.boxSize.z / 2 - radius;

	useFrame((state, delta) => {
		if (!document.hasFocus()) {
			return;
		}

		mesh.current.position.x += velocity.x * delta;
		mesh.current.position.y += velocity.y * delta;
		mesh.current.position.z += velocity.z * delta;

		if (mesh.current.position.x > SphereEnclosure.boxPosition.x + xOffSet || mesh.current.position.x < SphereEnclosure.boxPosition.x - xOffSet) {
			velocity.x *= -1;
		}

		if (mesh.current.position.y > SphereEnclosure.boxPosition.y + yOffSet || mesh.current.position.y < SphereEnclosure.boxPosition.y - yOffSet) {
			velocity.y *= -1;
		}

		if (mesh.current.position.z > SphereEnclosure.boxPosition.z + zOffSet || mesh.current.position.z < SphereEnclosure.boxPosition.z - zOffSet) {
			velocity.z *= -1;
		}
	});

	return (
		<>
			<mesh ref={mesh} position={[position.x, position.y, position.z]}>
				<sphereGeometry args={[radius, 32, 32]}></sphereGeometry>
				<meshStandardMaterial color={"red"}></meshStandardMaterial>
			</mesh>
		</>
	);
}

function VectorBallBounce1e1() {
	const sphereEnclosureProps = { boxSize: new Vector3(10, 10, 10), boxPosition: new Vector3(0, 5, 0) };

	const [spheres, setSpheres] = useState<BouncingSphereProps[]>(
		new Array(10).fill(10).map((_, i) => {
			const radius = 0.5;
			const position = new Vector3(0, 5, 0);
			const velocity = new Vector3(Math.random() * 4 - 2, Math.random() * 4 - 2, Math.random() * 4 - 2);
			return { radius, position, velocity };
		})
	);

	return (
		<>
			<Plane></Plane>
			{spheres.map((sphere, i) => (
				<BouncingSphere key={i} {...sphere} SphereEnclosure={sphereEnclosureProps}></BouncingSphere>
			))}
			<SphereEnclosure {...sphereEnclosureProps}></SphereEnclosure>
			<BouncingSphere radius={0.5} position={new Vector3(0, 3, 0)} velocity={new Vector3(3, 4, 5)} SphereEnclosure={sphereEnclosureProps}></BouncingSphere>
		</>
	);
}

export default VectorBallBounce1e1;
