// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState } from 'react';
import { UserActivityProvider } from 'amazon-chime-sdk-component-library-react';
import { useNavigation } from '../../providers/NavigationProvider';
import MeetingControls from '../../containers/MeetingControls';
import useMeetingEndRedirect from '../../hooks/useMeetingEndRedirect';

import { DashboardMainContent } from './VideoStyled';
import Sidebar from '../../components/Common/Sidebar';
import MeetingStart from '../../components/MeetingStart';
import ChatBox from '../../components/ChatBox';
import RightSideBar from '../../components/Common/RightSidebar';

const MeetingView = () => {
  useMeetingEndRedirect();
  const { showRoster } = useNavigation();
  const [isSetting, setSetting] = useState(false);
  return (
    <UserActivityProvider>
      <DashboardMainContent>
        <Sidebar />
        <MeetingStart />
        <ChatBox
          showRoster={showRoster}
          isSetting={isSetting}
          setSetting={setSetting}
        />
        <RightSideBar setSetting={setSetting} isSetting={isSetting} />
      </DashboardMainContent>
      <MeetingControls />
    </UserActivityProvider>
  );
};

export default MeetingView;
