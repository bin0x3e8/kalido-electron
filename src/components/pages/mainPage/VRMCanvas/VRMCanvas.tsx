import React, { FC, useState, useEffect,useRef } from 'react';
import {Canvas} from 'react-three-fiber';
import Controles from './Controls/Controls';
import styled from 'styled-components';
import ModelLoader from './ModelLoader/ModelLoader';
import { Vector3 } from 'three'
import { CameraOnOfButton } from './Camera/CameraOnOfButton';
import WebCameraTest from './Camera/WebCameraTest';
import * as Kalidokit from 'kalidokit';
import { Face, Pose, Hand } from "kalidokit";
import {Holistic} from '@mediapipe/holistic';
import {Camera} from '@mediapipe/camera_utils';

// 後で直したい
let holistic = new Holistic({locateFile: (file) => {
  return `https://cdn.jsdelivr.net/npm/@mediapipe/holistic@0.4.1633559476/${file}`;
}});


const VRMCanvas:FC = () => {
  const [rigdata,setRigdata] = useState<Kalidokit.TFace|null>(null);
  // const holistic = new Holistic();
  const videoRef = useRef<HTMLVideoElement>(null);
  const videoSize = {
    width: 600,
    height: 400
  }

    //画面がロードされたタイミングでwebカメラに接続
    useEffect(() => {
      holistic.onResults(results => {
        let facelm = results.faceLandmarks;
        const faceRig = Kalidokit.Face.solve(facelm,{runtime:'mediapipe',video:videoRef.current})||null;
        setRigdata(faceRig);
      })  
      startCamera();
      
    }, []);

  const startCamera = ()=> {
    console.log('start')
    if(!videoRef.current) return;
    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await holistic.send({image: videoRef.current!});
      },
      width: 640,
      height: 480
      });
      camera.start().then(()=>{console.log('camera')});
  }

  return (
  <Container>
      <video
        ref={videoRef}
        id="local-video"
        autoPlay
        playsInline
        muted
        width={videoSize.width}
        height={videoSize.height}
      />
    <Canvas>
      <ModelLoader data={rigdata}/>
      <Controles defaultCameraPosition={[0, 1.25, 1]} target={new Vector3(0, 1, 0)}/>
      <directionalLight position={[1, 1, 1]} />
      <gridHelper />
    </Canvas>
  </Container>
  )
}

const Container = styled.div`
  width: 100vw;
  height:100vh;
`

export default VRMCanvas;
