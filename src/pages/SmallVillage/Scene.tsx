import { OrbitControls, StatsGl, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react"
import * as THREE from "three"
import { SmallVillageModel } from "./SmallVillageModel";
// import { Smoke } from "./Smoke";
import { Lights } from "./Lights";
import { LampOldModel } from "./LampOldModel";
import Ghost from "./Ghost";
// import { Rain } from "./Rain";
import { useStore } from "../../context";
import Bird from "./Bird";
import Sun from "./Sky";



const LINE_NB_POINTS = 12000;


export const Scene = () => {


    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0, 15, 0),
                new THREE.Vector3(-9, 4, 0),
                new THREE.Vector3(-6, 4, 6),
                new THREE.Vector3(0, 4, 8.75),
                new THREE.Vector3(6, 4, 6),
                new THREE.Vector3(9, 4, 0),
            ],
            true,
            "catmullrom",
            0.5
        );
    }, []);

    const linePoints = useMemo(() => {
        return curve.getPoints(LINE_NB_POINTS);
    }, [curve]);

    const cameraGroup = useRef<THREE.Group>(null);
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const SmallVillageModelRef = useRef<THREE.Group>(null);
    const scroll = useScroll();
    const { store } = useStore()
    console.log(store.isDark);


    useFrame((_state, delta) => {

        const curPointIndex = Math.min(
            Math.round(scroll.offset * linePoints.length),
            linePoints.length - 1
        );


        const curPoint = linePoints[curPointIndex];

        const target = new THREE.Vector3(0, 0, 0)
        cameraRef.current?.lookAt(target);

        cameraGroup.current?.position.lerp(curPoint, delta * 24);
        cameraGroup.current?.position.lerp(curPoint, delta * 24);



    });



    return (
        <>

            <group ref={cameraGroup}>

                {/* <PerspectiveCamera ref={cameraRef} position={[0, 0, 0]} fov={70} makeDefault /> */}
            </group>
            <Bird />
            <color attach="background" args={['#4c4c4c']} />
            <StatsGl />
            <OrbitControls enableZoom={true} />
            <SmallVillageModel scale={[1.5, 1.5, 1.5]} ref={SmallVillageModelRef} />

            {/* <Rain visible={store.isDark} /> */}
            <LampOldModel
                rotation={[0, 2.5, 0]}
                position={[3.9, -0.2, 3.1]} />
            {/* <Smoke /> */}
            <Ghost />
            <Lights />
            <Sun />
            {/* <Sparkles visible={store.isDark} position={[0, 0, -2]} count={150} scale={12} size={4} speed={0.4} /> */}
        </>
    )
}