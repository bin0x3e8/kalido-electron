import React, { FC, useState, useEffect,useRef } from 'react';
import { useLoader } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { VRM, VRMUtils,VRMSchema } from '@pixiv/three-vrm';
import { Scene, Group } from 'three';
import * as Kalidokit from 'kalidokit';
import { Vector3 } from 'three'


// どっかにまとめたい
type RegData = {
  faceRig: Kalidokit.TFace | null;
  poseRig: Kalidokit.TPose | null;
  rightHandRig: Kalidokit.THand<"Left" | "Right"> | null;
  leftHandRig: Kalidokit.THand<"Left" | "Right"> | null;

}

type Props = {
  url: string;
  data: RegData;
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
      //TODO: forEachなどでKeyが一致したものを設定するようにする
      if(data.rightHandRig){
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightIndexDistal)?.rotation.set(data.rightHandRig!.RightIndexDistal.x,data.rightHandRig!.RightIndexDistal.y,data.rightHandRig!.RightIndexDistal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightIndexIntermediate)?.rotation.set(data.rightHandRig!.RightIndexIntermediate.x,data.rightHandRig!.RightIndexIntermediate.y,data.rightHandRig!.RightIndexIntermediate.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightIndexProximal)?.rotation.set(data.rightHandRig!.RightIndexProximal.x,data.rightHandRig!.RightIndexProximal.y,data.rightHandRig!.RightIndexProximal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightLittleDistal)?.rotation.set(data.rightHandRig!.RightLittleDistal.x,data.rightHandRig!.RightLittleDistal.y,data.rightHandRig!.RightLittleDistal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightLittleIntermediate)?.rotation.set(data.rightHandRig!.RightLittleIntermediate.x,data.rightHandRig!.RightLittleIntermediate.y,data.rightHandRig!.RightLittleIntermediate.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightLittleProximal)?.rotation.set(data.rightHandRig!.RightLittleProximal.x,data.rightHandRig!.RightLittleProximal.y,data.rightHandRig!.RightLittleProximal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightMiddleDistal)?.rotation.set(data.rightHandRig!.RightMiddleDistal.x,data.rightHandRig!.RightMiddleDistal.y,data.rightHandRig!.RightMiddleDistal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightMiddleIntermediate)?.rotation.set(data.rightHandRig!.RightMiddleIntermediate.x,data.rightHandRig!.RightMiddleIntermediate.y,data.rightHandRig!.RightMiddleIntermediate.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightMiddleProximal)?.rotation.set(data.rightHandRig!.RightMiddleProximal.x,data.rightHandRig!.RightMiddleProximal.y,data.rightHandRig!.RightMiddleProximal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightRingDistal)?.rotation.set(data.rightHandRig!.RightRingDistal.x,data.rightHandRig!.RightRingDistal.y,data.rightHandRig!.RightRingDistal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightRingIntermediate)?.rotation.set(data.rightHandRig!.RightRingIntermediate.x,data.rightHandRig!.RightRingIntermediate.y,data.rightHandRig!.RightRingIntermediate.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightRingProximal)?.rotation.set(data.rightHandRig!.RightRingProximal.x,data.rightHandRig!.RightRingProximal.y,data.rightHandRig!.RightRingProximal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightThumbDistal)?.rotation.set(data.rightHandRig!.RightThumbDistal.x,data.rightHandRig!.RightThumbDistal.y,data.rightHandRig!.RightThumbDistal.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightThumbIntermediate)?.rotation.set(data.rightHandRig!.RightThumbIntermediate.x,data.rightHandRig!.RightThumbIntermediate.y,data.rightHandRig!.RightThumbIntermediate.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightThumbProximal)?.rotation.set(data.rightHandRig!.RightThumbProximal.x,data.rightHandRig!.RightThumbProximal.y,data.rightHandRig!.RightThumbProximal.z);
      // vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightWrist)?.position.set(data.rightHandRig!.RightWrist.x,data.rightHandRig!.RightWrist.y,data.rightHandRig!.RightWrist.z);
      }

      if(data.poseRig){
      console.log(data.poseRig);
      // const boneNode = vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Hips);
      // boneNode?.position.set(data.poseRig!.Hips.position.x,data.poseRig!.Hips.position.y,data.poseRig!.Hips.position.z);
      // boneNode?.rotation.set(data.poseRig!.Hips.rotation!.x,data.poseRig!.Hips.rotation!.y,data.poseRig!.Hips.rotation!.z);
        
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftHand)?.rotation.set(data.poseRig!.LeftHand.x,data.poseRig!.LeftHand.y,data.poseRig!.LeftHand.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftLowerArm)?.rotation.set(data.poseRig!.LeftLowerArm.x,data.poseRig!.LeftLowerArm.y,data.poseRig!.LeftLowerArm.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperArm)?.rotation.set(data.poseRig!.LeftUpperArm.x,data.poseRig!.LeftUpperArm.y,data.poseRig!.LeftUpperArm.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftLowerLeg)?.rotation.set(data.poseRig!.LeftLowerLeg.x,data.poseRig!.LeftLowerLeg.y,data.poseRig!.LeftLowerLeg.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.LeftUpperLeg)?.rotation.set(data.poseRig!.LeftUpperLeg.x,data.poseRig!.LeftUpperLeg.y,data.poseRig!.LeftUpperLeg.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightHand)?.rotation.set(data.poseRig!.RightHand.x,data.poseRig!.RightHand.y,data.poseRig!.RightHand.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightLowerArm)?.rotation.set(data.poseRig!.RightLowerArm.x,data.poseRig!.RightLowerArm.y,data.poseRig!.RightLowerArm.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightLowerLeg)?.rotation.set(data.poseRig!.RightLowerLeg.x,data.poseRig!.RightLowerLeg.y,data.poseRig!.RightLowerLeg.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightUpperArm)?.rotation.set(data.poseRig!.RightUpperArm.x,data.poseRig!.RightUpperArm.y,data.poseRig!.RightUpperArm.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.RightUpperLeg)?.rotation.set(data.poseRig!.RightUpperLeg.x,data.poseRig!.RightUpperLeg.y,data.poseRig!.RightUpperLeg.z);
        vrm.humanoid?.getBoneNode(VRMSchema.HumanoidBoneName.Spine)?.rotation.set(data.poseRig!.Spine.x,data.poseRig!.Spine.y,data.poseRig!.Spine.z);
     } 
     if(data.faceRig){
      HeadBone?.rotation.set(data.faceRig!.head.x,data.faceRig!.head.y,data.faceRig!.head.z);
     }
      
      // console.log(data.rightHandRig);

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