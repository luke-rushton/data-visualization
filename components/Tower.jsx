import * as THREE from "three";
import { useRef, useLayoutEffect } from "react";

const sphereGeometry = new THREE.BoxGeometry(0.1, 0.1, 1);
const o = new THREE.Object3D();
const baubleMaterial = new THREE.MeshStandardMaterial({
  color: "blue",
  emissive: "blue",
  roughness: 0,
  toneMapped: false,
});

export default function Tower({ length = 100 }) {
  const ref = useRef();
  useLayoutEffect(() => {
    for (let y = 0; y < length; y++) {
      const id = y;
      o.position.set(0, y * 0.4, 0);
      o.updateMatrix();
      ref.current.setMatrixAt(id, o.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
  }, [length]);
  return (
    <>
      <instancedMesh
        ref={ref}
        castShadow
        receiveShadow
        args={[sphereGeometry, baubleMaterial, length]}
      ></instancedMesh>
    </>
  );
}
