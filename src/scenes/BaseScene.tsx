import { Canvas, useFrame, useThree } from "@react-three/fiber";
import React, { useContext, useEffect, useRef, useState } from "react";
import { FirstPersonControls, PointerLockControls, Sky } from "@react-three/drei";
import { Vector3 } from "three";
import Player from "../components/util/Player";
import StatsImpl from "stats.js";
import { useMenuStatus } from "../globals";

function Stats() {
	const [stats] = useState(() => new StatsImpl());
	useEffect(() => {
		stats.showPanel(0);
		document.body.appendChild(stats.dom);
		return () => document.body.removeChild(stats.dom);
	}, []);
	return useFrame((state) => {
		stats.begin();
		state.gl.render(state.scene, state.camera);
		stats.end();
	}, 1);
}

function BaseScene({ children }) {
	const ref = useRef(null);

	return (
		<>
			<div className="w-screen h-screen">
				<Canvas className="w-full h-full bg-slate-400">
					<ambientLight />
					<pointLight position={[10, 10, 10]} />
					<PointerLockControls
						ref={ref}
						onLock={() => {
							console.log("CHECKING INMENU STATUS BEFORE ON LOCK", useMenuStatus.getState().inMenu);
							if (useMenuStatus.getState().inMenu) {
								console.log("INMENU STATUS IN ON LOCK", useMenuStatus.getState().inMenu);
								ref.current.unlock();
							}
						}}
						onUpdate={() => {
							if (useMenuStatus.getState().inMenu) {
								console.log("INMENU STATUS IN ON UPDATE", useMenuStatus.getState().inMenu);
								ref.current.unlock();
							}
						}}
						onUnlock={() => {
							console.log(
								"CHECKING INMENU STATUS BEFORE ON UNLOCK",
								useMenuStatus.getState().inMenu
							);
						}}
					/>
					<Player postion={new Vector3(0, 10, 0)}></Player>
					<Sky
						distance={4500000}
						turbidity={1}
						rayleigh={1}
						sunPosition={[1000, 100, 0]}
						inclination={45}
						azimuth={0.75}
					/>
					{children}
					<Stats />
				</Canvas>
			</div>
		</>
	);
}

export default BaseScene;
