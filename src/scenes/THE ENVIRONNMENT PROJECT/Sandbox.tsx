import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Vector3 } from "three";
import { degToRad } from "three/src/math/MathUtils";
import Plane from "../../components/util/Plane";
import Sphere from "../../components/util/Sphere";
import checkCollision from "../../lib/checkCollision";
import { IMovementProps } from "../../models";

// Organism
// Behavior:
// - Little hops in random directions
//   - Created with 45 degree high acceleration burst
// Appearance:
// - White sphere for nwo
function Bunny({ controlled }) {
	const movementCooldown = 5;
	const movementTime = 0.5;
	const radius = 0.5;

	const [totalDelta, setTotalDelta] = useState(0);
	const [movementProps, setMovementProps] = useState<IMovementProps>({
		position: new Vector3(0, 1, 0),
		velocity: new Vector3(0, 0, 0),
		acceleration: new Vector3(0, 0, 0),
	});

	useFrame((state, delta) => {
		//TODO GENERALIZE THESE CALCULATIONS EVENTUALLY PROBABLY
		//movement calculations
		setMovementProps((prev) => {
			const { position, velocity, acceleration } = prev;

			//calculate new velocity and position with acceleration as well as gravity
			const newAcceleration = acceleration.clone().add(new Vector3(0, -9.81, 0));
			const newVelocity = velocity.clone().add(newAcceleration.clone().multiplyScalar(delta));
			const newPosition = position.clone().add(newVelocity.clone().multiplyScalar(delta));

			const collision = checkCollision(position);

			//check for collisions
			if (collision) {
				if (newPosition.y < collision.point.y + radius) {
					newPosition.y = collision.point.y + radius;
					newVelocity.set(0, 0, 0);
				}
			}

			return {
				position: newPosition,
				velocity: newVelocity,
				acceleration: acceleration,
			};
		});

		//when movement time is up reset acceleration
		if (totalDelta > movementTime) {
			setMovementProps((prev) => {
				return {
					...prev,
					acceleration: new Vector3(0, 0, 0),
				};
			});
		}

		//every time movement cooldown is up, set new acceleration
		if (totalDelta > movementCooldown) {
			const direction = new Vector3(0, 0, 0).setFromSphericalCoords(
				1,
				degToRad(25),
				Math.random() * Math.PI * 2
			);
			console.log(direction);
			setMovementProps((prev) => {
				return {
					...prev,
					acceleration: direction.clone().multiplyScalar(30),
				};
			});

			setTotalDelta(0);
			console.log("jumping");
		}

		console.log(
			"bun pos",
			movementProps.position.y + " " + movementProps.velocity.y + " " + movementProps.acceleration.y
		);

		setTotalDelta((prev) => {
			return prev + delta;
		});
	});

	return (
		<>
			<Sphere radius={radius} position={movementProps.position} color="white"></Sphere>
		</>
	);
}

// Organism
// Behavior:
// - Erratic movement followed by a pause
//   - Created with high acceleration events in random directions then 0 acceleration events
// Apperaence:
// - Green sphere for now

function Fly({ controlled }) {
	const movementCooldown = 0.5;
	const radius = 0.1;

	const [totalDelta, setTotalDelta] = useState(0);
	const [movementState, setMovementState] = useState(true);
	const [movementProps, setMovementProps] = useState<IMovementProps>({
		position: new Vector3(0, 1, 0),
		velocity: new Vector3(0, 0, 0),
		acceleration: new Vector3(0, 0, 0),
	});

	useFrame((state, delta) => {
		if (!controlled) {
			setTotalDelta((prev) => {
				return prev + delta;
			});

			//movement calculations
			setMovementProps((prev) => {
				const { position, velocity, acceleration } = prev;

				const newVelocity = velocity.clone().add(acceleration.clone().multiplyScalar(delta));
				const newPosition = position.clone().add(newVelocity.clone().multiplyScalar(delta));

				const collision = checkCollision(position);

				if (collision) {
					if (newPosition.y < collision.point.y + radius) {
						newPosition.y = collision.point.y + radius;
					}
				}

				return {
					position: newPosition,
					velocity: newVelocity,
					acceleration,
				};
			});

			//define acceleration behavior
			if (totalDelta > movementCooldown) {
				const direction = new Vector3(0, 0, 0).randomDirection();
				if (movementState) {
					setMovementProps((prev) => {
						return {
							...prev,
							acceleration: direction.clone().multiplyScalar(50),
						};
					});
				} else {
					setMovementProps((prev) => {
						return {
							...prev,
							velocity: new Vector3(0, 0, 0),
							acceleration: new Vector3(0, 0, 0),
						};
					});
				}

				setTotalDelta(0);
				setMovementState(!movementState);
			}

			setTotalDelta((prev) => {
				return prev + delta;
			});
		}
	});

	return (
		<>
			<Sphere radius={radius} position={movementProps.position} color="green"></Sphere>
		</>
	);
}

function Sandbox() {
	return (
		<>
			<Fly controlled={false}></Fly>
			<Bunny controlled={false}></Bunny>
			<Plane></Plane>
		</>
	);
}

export default Sandbox;
