import { PropsWithChildren, forwardRef } from "react"
import { Glow } from "."
import * as THREE from "three"
// import { MeshProps } from "@react-three/fiber"

type propType = {
    glowScale: number,
    size: number,
    color: string,
    emissive: string,
    glow: string,
    position: [number, number, number]

} & PropsWithChildren
export const LightMesh = forwardRef<THREE.Mesh, propType>(({ glowScale = 1, size = 1, children, color = 'white', emissive, glow, ...props }, ref) => (
    <mesh ref={ref} {...props}>
        {children}
        <meshPhysicalMaterial roughness={0} color={color} emissive={emissive || color} envMapIntensity={0.2} />
        <Glow scale={glowScale * 1.2} near={-25} color={glow || emissive || color} />
    </mesh>
))

