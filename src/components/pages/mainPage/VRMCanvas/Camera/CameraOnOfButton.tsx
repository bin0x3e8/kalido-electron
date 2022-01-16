import React,{FC} from 'react';
import styled from 'styled-components';
import {CameraVideoFill} from '@styled-icons/bootstrap/CameraVideoFill'
import {CameraVideoOff} from '@styled-icons/bootstrap/CameraVideoOff'


type Props = {
  muted: boolean;
  setter: any;
}

const Button = styled.button`
  &:focus {
    outline: 0;
  }
`;

export const CameraOnOfButton:FC<Props> = ({muted, setter}:Props) =>{
  let icon;
  if (muted) {
    icon = (
      //使いたいアイコン(offの時)
      CameraVideoOff
    );
  } else {
    icon = (
      //使いたいアイコン(onの時)
      CameraVideoFill
    );
  }
  const handleOnClick = () => {
    setter(!muted);
  };
  return <Button onClick={handleOnClick}>{icon}</Button>;
}