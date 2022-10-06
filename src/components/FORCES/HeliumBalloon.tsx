import { useFrame } from "@react-three/fiber";
import { useEffect, useState } from "react";
import { Vector3 } from "three";
import { IMovementProps } from "../../models";
import Sphere from "../util/Sphere";
import { makeNoise2D } from "open-simplex-noise";

function HeliumBalloon() {
	//MAKE CUSTOM HOOK TO USE MOVEMENT PROPS
	const [movementProps, setMovementProps] = useState<IMovementProps>({
		position: new Vector3(0, 1, 0),
		velocity: new Vector3(0, 0, 0),
		acceleration: new Vector3(0, 0, 0),
		forces: [] as {
			name: string;
			force: Vector3;
		}[],
	});
	const [totalDelta, setTotalDelta] = useState(0);

	const [isWind, setIsWind] = useState(false);

	const noise2D = makeNoise2D(Date.now());

	useEffect(() => {
		setMovementProps((prev) => {
			return {
				...prev,
				forces: [
					{
						name: "gravity",
						force: new Vector3(0, -9.81, 0),
					},
					{
						name: "buoyancy",
						force: new Vector3(0, 11, 0),
					},
				],
			};
		});
	}, []);

	useFrame((state, delta) => {
		setMovementProps((prev) => {
			let { position, velocity, forces } = prev;

			//calculate new velocity and position with acceleration as well as gravity
			const newAcceleration = new Vector3(0, 0, 0);
			forces.forEach((force) => {
				newAcceleration.add(force.force);
			});
			const newVelocity = velocity.clone().add(newAcceleration.clone().multiplyScalar(delta));
			const newPosition = position.clone().add(newVelocity.clone().multiplyScalar(delta));

			//if colliding with ceiling set velocity to 0 then apply spring/bounce force
			if (newPosition.y > 25) {
				setIsWind(true);

				newPosition.y = 25;
				newVelocity.y = 0;

				//calculate net forces to get the "opposite" force
				const netYForce = forces.reduce((acc, force) => {
					return acc + force.force.y;
				}, 0);

				const springConstant = 100;

				//calculate the force to apply to the balloon to bounce it back down
				const springForce = {
					name: "spring",
					force: new Vector3(0, -netYForce - springConstant * velocity.y, 0),
				};

				//add the spring force to the forces array
				forces.push(springForce);
			} else {
				//if not colliding with ceiling remove the spring force from the forces array
				forces = forces.filter((force) => force.name !== "spring");
			}

			if (isWind) {
				const angle = noise2D(totalDelta, totalDelta) * Math.PI * 2;
				const xComponent = Math.cos(angle);
				const zComponent = Math.sin(angle);

				if (forces.find((force) => force.name === "wind")) {
					forces
						.find((force) => force.name === "wind")
						.force.set(xComponent, 0, zComponent)
						.multiplyScalar(10);
				} else {
					const windForce = {
						name: "wind",
						force: new Vector3(xComponent, 0, zComponent).multiplyScalar(10),
					};
					forces.push(windForce);
				}

				// console.log(windForce.force);
			}

			console.log("velocity", velocity);

			return {
				...prev,
				position: newPosition,
				velocity: newVelocity,
				forces: forces,
			};
		});
		setTotalDelta((prev) => prev + delta);
	});
	return (
		<>
			<Sphere radius={0.5} position={movementProps.position} color={"blue"}></Sphere>
		</>
	);
}

export default HeliumBalloon;
