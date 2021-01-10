import React, { Fragment } from 'react';

// import styles
import {
  VideoSection,
  MainVideoWrapper,
  MainVideoFourPerson,
  VideoMembersBottom,
  Video,
} from './Styled';
import VideoPlaceHolder from '../../static/assets/images/video-placeholder.jpg';

const VideoContainer = () => (
  <div>
    <VideoSection>
      <MainVideoWrapper>
        <Video>
          <img src={VideoPlaceHolder} alt="img" className="img-fluid" />
        </Video>
        <MainVideoFourPerson>
          <Video>
            <img src={VideoPlaceHolder} alt="img" className="img-fluid" />
          </Video>
          <Video>
            <img src={VideoPlaceHolder} alt="img" className="img-fluid" />
          </Video>
          <Video>
            <img src={VideoPlaceHolder} alt="img" className="img-fluid" />
          </Video>
          <Video>
            <img src={VideoPlaceHolder} alt="img" className="img-fluid" />
          </Video>
        </MainVideoFourPerson>
      </MainVideoWrapper>
    </VideoSection>
    <VideoMembersBottom>
      <img src={VideoPlaceHolder} alt="img" className="img-fluid" width="100" />
      <img src={VideoPlaceHolder} alt="img" className="img-fluid" width="100" />
      <img src={VideoPlaceHolder} alt="img" className="img-fluid" width="100" />
      <img src={VideoPlaceHolder} alt="img" className="img-fluid" width="100" />
    </VideoMembersBottom>
  </div>
);

export default VideoContainer;
