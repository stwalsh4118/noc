import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";
import Sphere, { SphereProps } from "../../components/util/Sphere";
import { usePlayerPosition } from "../../globals";
import { SphereEnclosure, SphereEncloseureProps } from "./VectorBallBounce1e1";

function Followers({ numFollowers, boxSize, boxPosition }: SphereEncloseureProps & { numFollowers: number }) {
	const [spheres, setSpheres] = useState<SphereProps[]>(
		new Array(numFollowers).fill(0).map((_, i) => {
			const radius = 0.5;
			const position = new Vector3(
				boxPosition.x + Math.random() * boxSize.x - boxSize.x / 2,
				boxPosition.y + Math.random() * boxSize.y - boxSize.y / 2,
				boxPosition.z + Math.random() * boxSize.z - boxSize.z / 2
			);
			const velocity = new Vector3(0, 0, 0);
			const color = "red";
			return { radius, position, color, velocity };
		})
	);

	useFrame((state, delta) => {
		const playerPosition = usePlayerPosition.getState().playerPosition;

		const temp = spheres;

		temp.forEach((sphere, i) => {
			//calculate the acceleration vector towards the player
			const acceleration = new Vector3()
				.copy(playerPosition)
				.sub(sphere.position)
				.normalize()
				.multiplyScalar(Math.random() * 0.02);

			//modify the velocity vector by the acceleration vector
			sphere.velocity.add(acceleration);

			//get new position after applying velocity
			const newX = sphere.position.x + sphere.velocity.x * delta;
			const newY = sphere.position.y + sphere.velocity.y * delta;
			const newZ = sphere.position.z + sphere.velocity.z * delta;

			//check if new position is outside of bounds, if it is, set velocity to 0 and dont update its position
			//!!BONK!!
			if (newX >= boxPosition.x + boxSize.x / 2 || newX <= boxPosition.x - boxSize.x / 2) {
				sphere.velocity.x = 0;
			} else {
				sphere.position.x = newX;
			}

			if (newY >= boxPosition.y + boxSize.y / 2 || newY <= boxPosition.y - boxSize.y / 2) {
				sphere.velocity.y = 0;
			} else {
				sphere.position.y = newY;
			}

			if (newZ >= boxPosition.z + boxSize.z / 2 || newZ <= boxPosition.z - boxSize.z / 2) {
				sphere.velocity.z = 0;
			} else {
				sphere.position.z = newZ;
			}
		});

		setSpheres(temp);
	});

	return (
		<>
			{spheres.map((sphere, i) => (
				<Sphere key={i} {...sphere}></Sphere>
			))}
		</>
	);
}

function AccelerateBallsTowardsPlayer1e2() {
	const SphereEnclosureProps = { boxSize: new Vector3(10, 10, 10), boxPosition: new Vector3(0, 5, 0) };

	return (
		<>
			<Followers numFollowers={69} {...SphereEnclosureProps}></Followers>
			<SphereEnclosure {...SphereEnclosureProps}></SphereEnclosure>
		</>
	);
}

export default AccelerateBallsTowardsPlayer1e2;
