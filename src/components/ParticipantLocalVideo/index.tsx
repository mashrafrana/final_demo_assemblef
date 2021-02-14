// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { VideoTileState } from 'amazon-chime-sdk-js';

import {
  VideoTile,
  useLocalVideo,
  useAudioVideo,
  useApplyVideoObjectFit,
} from 'amazon-chime-sdk-component-library-react';

const StyledLocalVideo = styled<any>(VideoTile)`
  ${props => (!props.active ? 'display: none' : '')};
`;

export const ParticipantLocalVideo: React.FC = props => {
  const { tileId, isVideoEnabled } = useLocalVideo();
  const audioVideo = useAudioVideo();
  const videoEl = useRef<HTMLVideoElement>(null);
  useApplyVideoObjectFit(videoEl);
  const [active, setActive] = useState(() =>
    audioVideo?.hasStartedLocalVideoTile()
  );

  useEffect(() => {
    videoEl.current.srcObject = audioVideo?.getVideoTile(
      props.tileId
    )?.tileState.boundVideoStream;
  }, [audioVideo, props.tileId]);

  return (
    <video
      ref={videoEl}
      muted
      playsInline
      autoPlay
      className={props.className}
      style={props.style}
    />
  );
};

export default ParticipantLocalVideo;
