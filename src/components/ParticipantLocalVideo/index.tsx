// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { VideoTileState } from 'amazon-chime-sdk-js';

import {
    VideoTile,
    useLocalVideo,
    useAudioVideo,
    useApplyVideoObjectFit
} from 'amazon-chime-sdk-component-library-react';

const StyledLocalVideo = styled<any>(VideoTile)`
  ${props => (!props.active ? 'display: none' : '')};
`;

export const ParticipantLocalVideo: React.FC = (props) => {

  const  localStyle=`{
    object-fit: "cover", 
    transform: "rotateY(180deg)"
  }`;

  const  remoteStyle=`{
    objectFit: "cover", 
  }`;

  const { tileId, isVideoEnabled } = useLocalVideo();
  const audioVideo = useAudioVideo();
  const videoEl = useRef<HTMLVideoElement>(null);
  useApplyVideoObjectFit(videoEl);
  const [active, setActive] = useState(() =>
    audioVideo?.hasStartedLocalVideoTile()
  );

  const [current, setCurrent] = useState();
  useEffect(() => {
    if (!audioVideo || !tileId || !videoEl.current || !isVideoEnabled) {
      return;
    }

    videoEl.current.srcObject = audioVideo?.getVideoTile(props.tileId)?.tileState.boundVideoStream;
  }, [audioVideo, tileId, isVideoEnabled]);

  return (
        <video  ref={videoEl} muted playsInline autoPlay width="100" className={"img-fluid"} {props.local ? localStyle : remoteStyle} />      
      
  );}

export default ParticipantLocalVideo;
