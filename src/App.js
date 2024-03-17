import React, { useEffect, useRef, useState } from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Canvas, useFrame, extend, useThree } from "react-three-fiber";
import * as THREE from "three";
import "./App.css";
extend({ OrbitControls });

const MyModel = () => {
  const [model, setModel] = useState();

  useEffect(() => {
    new GLTFLoader().load("/model/scene.gltf", setModel);
  });

  return model ? <primitive object={model.scene} /> : null;
};

const Controls = () => {
  const orbitRef = useRef();
  const { camera, gl } = useThree();

  useFrame(() => {
    orbitRef.current.update();
  });
  return (
    <orbitControls
      args={[camera, gl.domElement]}
      ref={orbitRef}
      autoRotate
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 3}
    />
  );
};

const App = () => {
  return (
    <>
      <h1 class="w3-row">
        Mathi<span>l</span>da
      </h1>
      <Canvas
        camera={{ position: [200, 200, 200] }}
        onCreated={({ gl }) => {
          gl.shadowMap.enabled = true;
          gl.shadowMap.type = THREE.PCFSoftShadowMap;
        }}
      >
        <spotLight position={[15, 20, 5]} penumbra={1} castShadow />
        <Controls />
        <MyModel />
      </Canvas>
    </>
  );
};

export default App;
