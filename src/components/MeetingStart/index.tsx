import React from 'react';

// import styles
import { VideoSection, MainVideoWrapper } from './Styled';

import { CustomVideoTileGrid } from '../CustomVideoTileGrid';
import MeetingDetails from '../../containers/MeetingDetails';

const VideoContainer = () => (
  <div>
    <VideoSection>
      <MainVideoWrapper>
        <CustomVideoTileGrid
          className="videos"
          noRemoteVideoView={<MeetingDetails />}
        />
      </MainVideoWrapper>
    </VideoSection>
  </div>
);

export default VideoContainer;
