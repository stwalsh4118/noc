import {} from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { createNoise2D } from "simplex-noise";
import alea from "alea";
import { useCollisionObjects } from "../../globals";

function Plane(props) {
	const ref = useRef(null);

	useEffect(() => {
		ref.current.rotation.x = -Math.PI / 2;
		ref.current.position.y = 0;
	}, []);

	//TODO MAKE COLLIDABLE OBJECT HOOK OR COMPONENT IN THE FUTURE
	useEffect(() => {
		if (ref.current) {
			useCollisionObjects.setState({
				collisionObjects: [...useCollisionObjects.getState().collisionObjects, ref.current],
			});
		}

		return () => {
			useCollisionObjects.setState({
				collisionObjects: useCollisionObjects
					.getState()
					.collisionObjects.filter((object) => object !== ref.current),
			});
		};
	}, [ref]);

	return (
		<>
			<mesh ref={ref} receiveShadow>
				<planeGeometry args={[100, 100]}></planeGeometry>
				<meshStandardMaterial color="gray"></meshStandardMaterial>
			</mesh>
		</>
	);
}

export default Plane;
