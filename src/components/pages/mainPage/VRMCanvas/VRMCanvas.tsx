import React from 'react';
import {FC} from 'react';
import {Canvas} from 'react-three-fiber';
import Controles from './Controls/Controls';
import styled from 'styled-components';
import ModelLoader from './ModelLoader/ModelLoader';
import { Vector3 } from 'three'


const VRMCanvas:FC = () => (
  <Container>
    <Canvas>
      <ModelLoader />
      <Controles defaultCameraPosition={[0, 1.25, 1]} target={new Vector3(0, 1, 0)}/>
      <directionalLight position={[1, 1, 1]} />
      <gridHelper />
    </Canvas>
  </Container>
)

const Container = styled.div`
  width: 100vw;
  height:100vh;
`

export default VRMCanvas;
