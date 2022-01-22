import React, { FC, useState, useEffect,useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM, VRMUtils,VRMSchema } from '@pixiv/three-vrm';
import { Scene, Group } from 'three';
import * as Kalidokit from 'kalidokit';
import { Vector3 } from 'three'
type Props = {
  url: string;
  data: Kalidokit.TFace;
}


const VRMAsset:FC<Props> = ({url,data}:Props) => {
  const [scene, setScene] = useState<Scene | Group | null>(null);
  const gltf = useLoader(GLTFLoader, url);


  // const video = new HTMLVideoElement();

  
  useEffect(() => {
    VRMUtils.removeUnnecessaryJoints(gltf.scene);
    VRM.from(gltf).then(vrm => {
      setScene(vrm.scene);
      // 初期描画で背中が映ってしまうので向きを変えてあげる
      const boneNode = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips);
      boneNode?.rotateY(Math.PI);
    })
  }, [gltf, setScene]);

  useEffect(() =>{
    if(!data) return;
    VRM.from(gltf).then(vrm => {
      setScene(vrm.scene);
      // 頭の動きをセットする
      const HeadBone = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Head);
      HeadBone?.rotation.set(data.head.x,data.head.y,data.head.z);
    })
  }
  
  );

  if (scene === null) {
    return null;
  }

  return (
    <>
      <primitive object={scene} dispose={null} />
    </>
  )
}

export default VRMAsset;