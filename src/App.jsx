import './App.css'
import { Canvas, useFrame, useThree, useLoader,  } from '@react-three/fiber'
//import { OrbitControls } from 'three/examples/jsm/Addons.js'
import { GLTFLoader } from 'three/examples/jsm/Addons.js'
import { Environment, ContactShadows, Fisheye,  PerspectiveCamera, OrbitControls  } from '@react-three/drei'
import { Suspense, useEffect, useRef } from 'react'


export default function App() {

  const CameraController = () => {
    //desestructura de useThree la camara y el gl
    const {camera, gl} = useThree();

    useEffect(()=>{
      // crea el contructor de la orbita el contructor recibe dos parametros, la camara y el elemento
      const controls = new OrbitControls(camera, gl.domElement)
      // se fijan las distancias de zoom
      controls.minDistance = 3;
      controls.maxDistance = 15;
      controls.minPolarAngle = 0;
      controls.maxPolarAngle = Math.PI / 1.90
      controls.enablePan= false
      //lo que entindo aqui es que limpa los controles
      return () => {
        controls.dispose()
      }

    },[camera, gl])

    return null
  }
  const RotateMyBox = () => {
    const myRef = useRef();
    useFrame(({clock}) => {
      myRef.current.rotation.y = clock.getElapsedTime()
    })
    return(
      <mesh ref={myRef}>
        <boxGeometry args={[2,2,2]} />
        <meshStandardMaterial color={'white'} emissive={"red"} />
      </mesh>
    )
  }
  const BikeModel = () => {
    const gltf = useLoader(GLTFLoader, './public/kawashaki_ninja_h2/scene.gltf')
    return(
      <>
        <primitive object={gltf.scene} scale={2.5} position={[0,-1.50,0]}/>
      </>
    )
  }

  return (
    <>
    <div className='motos__header'>
      <h1>Yuhmak</h1>
      <div className='header__line'>
      </div>
    </div>
        <div className='moto__container'>
          <div className='three__canvas'>
              <Canvas>
                <Suspense fallback={null}>  
                <Fisheye resolution={4086} zoom={3}>
                  <Environment files="./public/dresden_station_night_4k.hdr" background={false} />  
                  <color attach={'background'} args={['black']}/>       
                  <BikeModel/>
                  <OrbitControls enableZoom={true} enablePan={false} minPolarAngle={0} maxPolarAngle={Math.PI / 1.80} makeDefault autoRotate />
                  <PerspectiveCamera makeDefault position={[0, 5, -10]} fov={100} />
                </Fisheye>   
                </Suspense>
              </Canvas>
          </div>
          <div className='moto__info'>
              <h1>Ninja H2</h1>
              <div className='info__container'>
                
              </div>
          </div>
        </div>
    </>
  )
}
