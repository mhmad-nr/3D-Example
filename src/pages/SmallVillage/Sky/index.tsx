import { useMemo, useRef } from 'react'
import { Sky, useScroll } from "@react-three/drei"
import * as THREE from "three";
import { Sky as SkyImpl } from 'three-stdlib';
import { useFrame } from '@react-three/fiber';
import Moon from './Moon';
// import Sun from './Sun';

const LINE_NB_POINTS = 12000;
const MySky = ({ ...props }) => {

    const skyRef = useRef<SkyImpl>({} as SkyImpl)

    const sunCurve = useMemo(() => {
        return new THREE.CatmullRomCurve3(
            [
                new THREE.Vector3(0, 2, 18),
                new THREE.Vector3(5, 7, 14),
                new THREE.Vector3(9, 11, 8),
                new THREE.Vector3(10, 13, 0),
                new THREE.Vector3(9, 11, -8),
                new THREE.Vector3(5, 7, -14),
                new THREE.Vector3(0, 2, -18),

            ],
            false,
            "chordal",
            1
        );
    }, []);


    const sunlinePoints = useMemo(() => {
        return sunCurve.getPoints(LINE_NB_POINTS);
    }, [sunCurve]);

    const scroll = useScroll();

    useFrame((_state, delta) => {

        const LINE_NB_POINTS_THIRD = LINE_NB_POINTS / 3

        const sunCurPointIndex = Math.min(
            Math.round(scroll.offset * sunlinePoints.length),
            sunlinePoints.length - 1
        );
        const sunCurPoint = sunlinePoints[sunCurPointIndex];


        let newX
        let newY
        let newZ
        let newTurbidity
        let newRayleigh
        let newMieCoefficient
        let newMieDirectionalG


        if (sunCurPointIndex < LINE_NB_POINTS_THIRD) {

            newX = (sunCurPointIndex / LINE_NB_POINTS_THIRD) * 15.00
            newY = (sunCurPointIndex / LINE_NB_POINTS_THIRD) * 2.00
            newZ = 15 - (sunCurPointIndex / LINE_NB_POINTS_THIRD) * 15.00

            newTurbidity = 20 - (sunCurPointIndex / LINE_NB_POINTS_THIRD) * 7
            newRayleigh = 3 - (sunCurPointIndex / LINE_NB_POINTS_THIRD) * 2.2
            newMieCoefficient = 0.005 + (sunCurPointIndex / LINE_NB_POINTS_THIRD) * 0.005
            newMieDirectionalG = 0.9998

        } else if (LINE_NB_POINTS_THIRD < sunCurPointIndex && sunCurPointIndex < LINE_NB_POINTS_THIRD * 2) {

            const curPointIndexSecond = sunCurPointIndex - LINE_NB_POINTS_THIRD
            newX = 15 - ((curPointIndexSecond / LINE_NB_POINTS_THIRD) * 15.00)
            newY = 2 - ((curPointIndexSecond / LINE_NB_POINTS_THIRD) * 3.00)
            newZ = ((curPointIndexSecond / LINE_NB_POINTS_THIRD) * 15.00) * -1

            // newTurbidity = 13 + (curPointIndexSecond / LINE_NB_POINTS_THIRD) * 7
            newTurbidity = 13 
            newRayleigh = 0.8 + (curPointIndexSecond / LINE_NB_POINTS_THIRD) * 2.2
            newMieCoefficient = 0.01 - (curPointIndexSecond / LINE_NB_POINTS_THIRD) * 0.005
            newMieDirectionalG = 0.9998 + (curPointIndexSecond / LINE_NB_POINTS_THIRD) * 0.0001
        }
        else {

            const curPointIndexThird = sunCurPointIndex - LINE_NB_POINTS_THIRD * 2
            newX = - (curPointIndexThird / LINE_NB_POINTS_THIRD) * 15.00
            newY = -0.5 + (curPointIndexThird / LINE_NB_POINTS_THIRD) * 3.00
            newZ = -15 + ((curPointIndexThird / LINE_NB_POINTS_THIRD) * 15.00)

            newTurbidity = (curPointIndexThird / LINE_NB_POINTS_THIRD) * 0.1
            newRayleigh = 0.01
            newMieCoefficient = 0.001
            newMieDirectionalG = 0.9999 - (curPointIndexThird / LINE_NB_POINTS_THIRD) * 0.0009
        }
        // console.log();
        

        const newSunPosition = new THREE.Vector3(newX, newY, newZ).lerp(sunCurPoint, delta);
        (skyRef.current.material as THREE.ShaderMaterial).uniforms.sunPosition.value = newSunPosition;
        (skyRef.current.material as THREE.ShaderMaterial).uniforms.turbidity.value = newTurbidity;
        (skyRef.current.material as THREE.ShaderMaterial).uniforms.rayleigh.value = newRayleigh;
        (skyRef.current.material as THREE.ShaderMaterial).uniforms.mieCoefficient.value = newMieCoefficient;
        (skyRef.current.material as THREE.ShaderMaterial).uniforms.mieDirectionalG.value = newMieDirectionalG;

    })


    return (
        <>
            <Sky
                ref={skyRef}
                distance={45000}
                {...props}
            />
            {/* <Sun sunCurve={sunCurve} sunlinePoints={sunlinePoints} /> */}
            <Moon />
        </>
    )
}

export default MySky

