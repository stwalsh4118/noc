import { usePlane } from "@react-three/cannon";
import { useFrame } from "@react-three/fiber";
import React, { useEffect, useRef } from "react";
import { BufferGeometry, Mesh, Vector3 } from "three";
import { useCollisionObjects, usePlayerPosition } from "../../globals";

function Plane(props) {
	const [ref, api] = usePlane(() => ({
		position: new Vector3(0, 0, 0).toArray(),
		rotation: new Vector3(-Math.PI / 2, 0, 0).toArray(),
		type: "Static",
		onCollide(e) {
			console.log("COLLISION", e);
		},
	}));

	//TODO MAKE COLLIDABLE OBJECT HOOK OR COMPONENT IN THE FUTURE
	// useEffect(() => {
	// 	if (ref.current) {
	// 		useCollisionObjects.setState({
	// 			collisionObjects: [...useCollisionObjects.getState().collisionObjects, ref.current],
	// 		});
	// 	}

	// 	return () => {
	// 		useCollisionObjects.setState({
	// 			collisionObjects: useCollisionObjects
	// 				.getState()
	// 				.collisionObjects.filter((object) => object !== ref.current),
	// 		});
	// 	};
	// }, [ref]);

	useFrame((state) => {
		ref.current.position.y += 0.01;
	});

	return (
		<>
			<mesh ref={ref as React.RefObject<Mesh<BufferGeometry>>} receiveShadow>
				<planeGeometry args={[1, 1]}></planeGeometry>
				<meshStandardMaterial color="gray"></meshStandardMaterial>
			</mesh>
		</>
	);
}

export default Plane;
