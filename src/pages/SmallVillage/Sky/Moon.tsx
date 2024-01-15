import { useMemo, useRef } from 'react'
import { useHelper, useScroll } from "@react-three/drei"
import * as THREE from "three";
import { useFrame } from '@react-three/fiber';

const LINE_NB_POINTS = 12000;
const Moon = () => {

    const moonCurve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                // 
                new THREE.Vector3(0, 2, -18),
                new THREE.Vector3(-5, 7, -14),
                new THREE.Vector3(-9, 11, -8),
                new THREE.Vector3(-10, 13, 0),

            ],
            false,
            "chordal",
            1
        );
    }, []);


    const moonlinePoints = useMemo(() => {
        return moonCurve.getPoints(LINE_NB_POINTS / 2);
    }, [moonCurve]);


    const moonShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);
        return shape;
    }, [moonCurve]);

    const scroll = useScroll();

    useFrame((_state, delta) => {

        const LINE_NB_POINTS_THIRD = LINE_NB_POINTS / 3
        //  return scroll.offset
        // console.log(LINE_NB_POINTS);

        // if (scroll.offset) {

        // }
        // const startOffset = 
        if (1 / 3 * 2 < scroll.offset) {

            console.log(scroll.offset);
        }
        const moonCurPointIndex = Math.min(
            Math.round(scroll.offset * moonlinePoints.length / 3),
            moonlinePoints.length - 1
        );
        const moonCurPoint = moonlinePoints[moonCurPointIndex];

        // let newMoonIntensity = 0

        // console.log();

        if (moonCurPointIndex > LINE_NB_POINTS_THIRD) {

            moonRef.current.position.lerp(moonCurPoint, delta * 24)
            // newMoonIntensity = (curPointIndexThird / LINE_NB_POINTS_THIRD) * 1
        }


        // moonRef.current.intensity = newMoonIntensity
    })
    const moonRef = useRef<THREE.SpotLight>({} as THREE.SpotLight)


    useHelper(moonRef, THREE.SpotLightHelper, "red")


    return (
        <>


            <spotLight
                ref={moonRef}
                angle={0.5}
                penumbra={1}
                decay={1}
                intensity={6}
                power={20}
                position={[-9, 16, 1]}
                target-position={[0.1, 0, 0.1]}
            />
            <group position-y={-2}>
                <mesh>
                    <extrudeGeometry
                        args={[
                            moonShape,
                            {
                                steps: LINE_NB_POINTS / 2,
                                bevelEnabled: false,
                                extrudePath: moonCurve,
                            },
                        ]}
                    />
                    <meshStandardMaterial color={"red"} opacity={0.7} transparent />
                </mesh>
            </group>


        </>
    )
}

export default Moon

