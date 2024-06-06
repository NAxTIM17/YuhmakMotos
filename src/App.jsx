import "./App.css";
import { Canvas, addEffect, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/Addons.js";
import {
  Environment,
  PerspectiveCamera,
  OrbitControls,
  View,
  Fisheye,
} from "@react-three/drei";
import { useEffect } from "react";
import { ReactLenis, useLenis } from 'lenis/react'
import Lenis from "lenis";

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
  } 
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

  // const lenis = new Lenis({syncTouch: true})
  // addEffect((t) => lenis.raf(t))

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
        <div className="moto__container">
          <h1 className="moto__container--title">Ninja H2</h1>
          <div className="three__canvas">
            <View className="view__bike">
                <SetUp/>
                <KawasakiNinjaH2/>
            </View>
          </div>
           <div className="moto__info"></div>
          <div className="info__container"></div>
        </div>
        <div className="moto__container">
          <h1 className="moto__container--title">Z 1000</h1>
          <div className="three__canvas">
            <View className="view__bike">
              <SetUp/>
              <KawasakiZ1000/>
            </View>
          </div>
          {/* <div className="moto__info"></div>
          <div className="info__container"></div> */}
        </div>
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
