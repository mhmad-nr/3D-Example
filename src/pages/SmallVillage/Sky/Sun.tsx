import { useMemo, useRef } from 'react'
import { useHelper, useScroll } from "@react-three/drei"
import * as THREE from "three";
import { useFrame } from '@react-three/fiber';

const LINE_NB_POINTS = 12000;

type props = {
    sunCurve: THREE.CatmullRomCurve3,
    sunlinePoints: THREE.Vector3[]
}

const Sun = ({ sunlinePoints, sunCurve }: props) => {

    const directionalLight = useRef<THREE.DirectionalLight>({} as THREE.DirectionalLight)


    const sunShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(0, -0.2);
        shape.lineTo(0, 0.2);
        return shape;
    }, [sunCurve]);

    const scroll = useScroll();

    useFrame((_state, delta) => {

        const LINE_NB_POINTS_HALF = LINE_NB_POINTS / 2
        const LINE_NB_POINTS_THIRD = LINE_NB_POINTS / 3

        const sunCurPointIndex = Math.min(
            Math.round(scroll.offset * 3 / 2 * sunlinePoints.length),
            sunlinePoints.length - 1
        );
        const sunCurPoint = sunlinePoints[sunCurPointIndex];

        let newIntensity = 0


        let green = 0
        let blue = 0
        if (sunCurPointIndex < LINE_NB_POINTS_HALF) {
            blue = (sunCurPointIndex / LINE_NB_POINTS_HALF) * 1.00
            green = (sunCurPointIndex / LINE_NB_POINTS_HALF) * 0.75 + 0.25


        } else {
            const curPointIndexSecond = sunCurPointIndex - LINE_NB_POINTS_HALF
            blue = 1 - (curPointIndexSecond / LINE_NB_POINTS_HALF) * 1.00
            green = 1 - (curPointIndexSecond / LINE_NB_POINTS_HALF) * 1.00
        }

        if (sunCurPointIndex < LINE_NB_POINTS_THIRD * 3) {

            newIntensity = (sunCurPointIndex / LINE_NB_POINTS_THIRD) * 0.5 + 0.25

        }
        const color = new THREE.Color(1, green, blue)


        console.log(color);
        // console.log(directionalLight.current.color);

        if (true) {

            directionalLight.current.position.lerp(sunCurPoint, delta * 24);
            // directionalLight.current.intensity = 
            directionalLight.current.intensity = newIntensity
            directionalLight.current.color.set(color)
        }
    })

    useHelper(directionalLight, THREE.DirectionalLightHelper, 10)


    return (
        <>
            <directionalLight
                shadow-mapSize-width={512 / 2}
                shadow-mapSize-height={512 / 2}
                castShadow
                shadow-camera-scale={[1.5, 1.5, 1.5]}
                shadow-bias={-0.001}
                ref={directionalLight} color={"0xffffff"} />
            <group position-y={-2}>
                <mesh>
                    <extrudeGeometry
                        args={[
                            sunShape,
                            {
                                steps: LINE_NB_POINTS,
                                bevelEnabled: false,
                                extrudePath: sunCurve,
                            },
                        ]}
                    />
                    <meshStandardMaterial color={"white"} opacity={0.7} transparent />
                </mesh>
            </group>
        </>
    )
}

export default Sun

