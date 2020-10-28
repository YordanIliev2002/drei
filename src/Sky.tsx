import React, { forwardRef, useMemo, useState } from 'react'
import { ReactThreeFiber } from 'react-three-fiber'
import { Sky as SkyImpl } from 'three/examples/jsm/objects/Sky'
import { Vector3 } from 'three'

type Props = {
  distance?: number
  sunPosition?: ReactThreeFiber.Vector3
  inclination?: number
  azimuth?: number
  mieCoefficient?: number
  mieDirectionalG?: number
  rayleigh?: number
  turbidity?: number
}

export function calcPosFromAngles(inclination: number, azimuth: number, vector: Vector3 = new Vector3()) {
  const theta = Math.PI * (inclination - 0.5)
  const phi = 2 * Math.PI * (azimuth - 0.5)

  vector.x = Math.cos(phi)
  vector.y = Math.sin(theta)
  vector.z = Math.sin(phi)

  return vector
}

export const Sky = forwardRef(
  (
    {
      inclination = 0,
      azimuth = 0.25,
      distance = 100,
      mieCoefficient = 0.005,
      mieDirectionalG = 0.8,
      rayleigh = 1,
      turbidity = 2,
      sunPosition = calcPosFromAngles(inclination, azimuth),
      ...props
    }: Props,
    ref
  ) => {
    const scale = useMemo(() => new Vector3().setScalar(distance), [distance])
    const [sky] = useState(() => new SkyImpl())

    return (
      <primitive
        dispose={undefined}
        object={sky}
        ref={ref}
        material-uniforms-mieCoefficient-value={mieCoefficient}
        material-uniforms-mieDirectionalG-value={mieDirectionalG}
        material-uniforms-rayleigh-value={rayleigh}
        material-uniforms-sunPosition-value={sunPosition}
        material-uniforms-turbidity-value={turbidity}
        scale={scale}
        {...props}
      />
    )
  }
)