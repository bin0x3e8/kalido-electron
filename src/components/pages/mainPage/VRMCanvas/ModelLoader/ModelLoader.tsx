import React, { FC,PropsWithChildren,Suspense } from 'react'
import VRMAsset from '../VRMAsset/VRMAsset'

type Props = {
  data: any;
}
const ModelLoader:FC<Props> = ({data}:Props)=> {
  return (
    <Suspense fallback={null}>
      <VRMAsset url='../public/models/three-vrm-girl.vrm' data={data}/>
    </Suspense>
  )
}

export default ModelLoader;