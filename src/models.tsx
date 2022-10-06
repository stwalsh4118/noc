import { Vector3 } from "three";

export interface IMovementProps {
	position: Vector3;
	velocity: Vector3;
	acceleration: Vector3;
	forces?: {
		name: string;
		force: Vector3;
	}[];
}
