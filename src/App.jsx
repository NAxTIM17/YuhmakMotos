import "./App.css";
import { Canvas, addEffect, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  View,
} from "@react-three/drei";
import { useEffect } from "react";
import ModelWrapper from "./components/modelWrapper";

export default function App() {
  const KawasakiNinjaH2 = () => {
    const { scene } = useLoader(
      GLTFLoader,
      "./public/kawashaki_ninja_h2/KawasakiH2.gltf"
    );
    return (
      <>
        <primitive object={scene} scale={2} position={[0, -1.5, 0]} />
      </>
    );
  };
  const KawasakiZ1000 = () => {
    const { scene } = useLoader(
      GLTFLoader,
      "./public/Kawasaki_z1000/KawsakiZ1000_03.gltf"
    );
    return (
      <>
        <primitive object={scene} scale={2} position={[0, -1.5, 0]} />
      </>
    );
  };
  const SetUp = () => {
    return (
      <>
        <Environment
          files="./public/dresden_station_night_4k.hdr"
          background={false}
        />
        <PerspectiveCamera makeDefault fov={50} position={[0, 0, 5]} />
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          minPolarAngle={0}
          maxPolarAngle={Math.PI / 1.8}
          makeDefault
          autoRotate
        />
      </>
    );
  };


  useEffect(() => {
    console.log(document.getElementById("moto"));
  }, []);

  return (
    <>
      <div className="motos__header">
        <h1>Yuhmak</h1>
        <div className="header__line"></div>
      </div>
      <div className="moto__body" id="moto">
        <ModelWrapper bikeName={'Ninja H2'} orientation={'left'} >
          <View className="view__bike">
            <SetUp />
            <KawasakiNinjaH2 />
          </View>
        </ModelWrapper>
        <ModelWrapper bikeName={'Z1000'} orientation={'right'}>
          <View className="view__bike">
            <SetUp />
            <KawasakiZ1000 />
          </View>
        </ModelWrapper>
        <Canvas
          className="motos__canvas"
          eventSource={document.getElementById("moto")}
        >
          <View.Port />
        </Canvas>
      </div>
    </>
  );
}
