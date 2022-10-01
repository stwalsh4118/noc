import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PointerLockControls, Sky } from "@react-three/drei";
import { Vector3 } from "three";
import Player from "../components/util/Player";

function BaseScene({ children }) {
	return (
		<>
			<div className="w-screen h-screen">
				<Canvas className="w-full h-full bg-slate-400">
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<PointerLockControls />
					<Player postion={new Vector3(0, 10, 0)}></Player>
					<Sky distance={4500000} turbidity={1} rayleigh={1} sunPosition={[1000, 100, 0]} inclination={45} azimuth={0.75} />
					{children}
				</Canvas>
			</div>
		</>
	);
}

export default BaseScene;
