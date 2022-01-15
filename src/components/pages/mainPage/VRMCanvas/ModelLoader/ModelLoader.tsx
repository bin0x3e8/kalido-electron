import React, { FC,Suspense } from 'react'
import VRMAsset from '../VRMAsset/VRMAsset'

const ModelLoader:FC = ()=> {
  return (
    <Suspense fallback={null}>
      <VRMAsset url='../public/models/three-vrm-girl.vrm' />
    </Suspense>
  )
}

export default ModelLoader;