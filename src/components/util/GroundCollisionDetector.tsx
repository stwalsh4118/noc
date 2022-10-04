import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { Raycaster, Vector3 } from "three";
import { useCollisionObjects } from "../../globals";

function GroundCollisionDetector({ objectRef, enabled = true }) {
	const raycaster = new Raycaster();

	const [mostRecentCollision, setMostRecentCollision] = useState(null);

	useFrame(() => {
		if (objectRef) {
			// console.log(raycaster);

			//cast ray stright down from object
			raycaster.set(
				new Vector3(
					objectRef.current.position.x,
					objectRef.current.position.y - 1,
					objectRef.current.position.z
				),
				new Vector3(0, -1, 0)
			);

			//get all objects that the ray intersects with
			const intersects = raycaster.intersectObjects(
				useCollisionObjects.getState().collisionObjects
			);
			if (intersects.length > 0) {
				// console.log("intersects", intersects[0]);
				setMostRecentCollision(intersects[0]);
			}

			//if the object is below the ground, set it to the ground
			if (objectRef.current.position.y < mostRecentCollision?.point.y) {
				objectRef.current.position.y = mostRecentCollision.point.y;
				console.log("collision");
			}
			// console.log(intersects);
		}
	});
	return <></>;
}

export default GroundCollisionDetector;
