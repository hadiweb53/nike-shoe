import React, { useEffect, useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, useGLTF } from '@react-three/drei';

function Model({ position, scale, rotation, color }) {
  const { scene, materials } = useGLTF('jorden.glb');

  useEffect(() => {
    // console.log(materials);
    const redMaterial = materials['red'];
    if (redMaterial) {
      redMaterial.color.set(color); 
      redMaterial.needsUpdate = true;
      
    }
  }, [materials, color]);

  return (
    <primitive object={scene} position={position} scale={scale} rotation={rotation} />
  );
}

function App() {
  const position = [-0.2, 0, 0];
  const scale = [1.3, 1.3, 1.3];
  const rotation = [-0.2, -0.6, 0.6];
  const bgRef = useRef()
  const [selectedColor, setSelectedColor] = useState('red'); 
  const [BgColor, setBgColor] = useState('linear-gradient(to right, rgb(241, 38, 41), rgb(149, 0, 4)'); 
  

  const handleColorChange = (newColor) => {
    setSelectedColor(newColor);



    console.log("Color changed to:", newColor); 
  };

  return (
    <div

      className="h-screen bg-gradient-to-r from-red-500"
      style={{
        background: BgColor,
        transition : "all ease 1.3s",
        position: 'relative',
      }}
    >
      <div className="absolute top-[180px] left-[50px] z-10">
        <h2 className="text-white text-3xl">JORDAN 1 RED</h2>
        <p className="text-white">RELEASE DATE</p>
        <p className="text-white">2016-10-06</p>
        <p className="text-white">COLOR WAY</p>
        <p className="text-white">SAIL/STARFISH-BLACK</p>
      </div>

      <div className="absolute top-[420px] left-[50px] z-10">
        <h2 className="text-white text-[18px] font-bold">Select color</h2>
        <div className=" flex space-x-3">
          <button
            onClick={() =>{ 
              handleColorChange('#b00107')
              
              console.log("Red color")

          setBgColor('linear-gradient(to right, rgb(241, 38, 41), rgb(149, 0, 4)')

            }
              
            }
            className="w-8 h-8 bg-[#b00107e1] text-white border-4 border-white rounded-full transition-transform transform cursor-pointer hover:scale-110"
          />
          <button
          onClick={()=>{
            handleColorChange('#0241d3')
            setBgColor('linear-gradient(to right, rgb(63, 38, 241), rgb(33, 0, 149))')
          }}
            className="w-8 h-8 bg-[#0241d3] text-white border-4 border-white rounded-full transition-transform transform hover:scale-110"
          />
          <button
            onClick={() =>{ handleColorChange('#3d909c')
              setBgColor('linear-gradient(to right, rgb(47, 74, 79), rgb(48, 125, 138))')
            }
            }
            className="w-8 h-8 bg-[#3d909c] text-white border-4 border-white rounded-full transition-transform transform hover:scale-110"

          />
        </div>
      </div>

      <div className="flex justify-center items-center h-screen z-10">
        <h1 className="text-center text-[300px] font-bold tracking-[-0.06em] text-white font-Futura">
          NIKE
        </h1>
      </div>

      <Canvas
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 10,
          pointerEvents : "none",
        }}
      >
        <ambientLight intensity={0.7} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight
          intensity={0.5}
          angle={0.1}
          penumbra={1}
          position={[10, 15, -5]}
          castShadow
        />
        <Environment files="HDR_112_River_Road_2_Env.hdr" background={false} />
        <Model position={position} scale={scale} rotation={rotation} color={selectedColor} />
      </Canvas>
    </div>
  );
}

export default App;
