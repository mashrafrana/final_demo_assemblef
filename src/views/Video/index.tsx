// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { DashboardMainContent } from './Styled';
import Sidebar from '../../components/Common/Sidebar';
import MeetingStart from '../../components/MeetingStart';
import ChatBox from '../../components/ChatBox';
import RightSideBar from '../../components/Common/RightSidebar';

const VideoView = () => (
  <DashboardMainContent>
    <Sidebar />
    <MeetingStart />
    <ChatBox />
    <RightSideBar />
  </DashboardMainContent>
);

export default VideoView;
