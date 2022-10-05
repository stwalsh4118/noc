import { Raycaster, Vector3 } from "three";
import { useCollisionObjects } from "../globals";

//USE THIS TO INTERCEPT COLLISIONS WHEN CALCULATING NEW POSITIONS
function checkCollision(currentPosition: Vector3) {
	const raycaster = new Raycaster();

	//cast ray stright down from object
	raycaster.set(
		new Vector3(currentPosition.x, currentPosition.y, currentPosition.z),
		new Vector3(0, -1, 0)
	);

	//get all objects that the ray intersects with
	const intersects = raycaster.intersectObjects(useCollisionObjects.getState().collisionObjects);

	if (intersects.length > 0) {
		return intersects[0];
	}
	return null;
}

export default checkCollision;
