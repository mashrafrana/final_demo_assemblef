// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';

import { useHistory } from 'react-router-dom';
import MeetingFormSelector from '../../containers/MeetingFormSelector';
import { StyledLayout, ErrorMessage } from './Styled';
import { VersionLabel } from '../../utils/VersionLabel';

const Home = () => {
  const history = useHistory();
  return history.location.search.split('?meeting_id=')[1] ? (
    <StyledLayout>
      <MeetingFormSelector
        meeting_id={history.location.search.split('?meeting_id=')[1]}
      />
      <VersionLabel />
    </StyledLayout>
  ) : (
    <ErrorMessage>
      <div className="wrap">
        <h1>You don't have access to this page!</h1>
      </div>
    </ErrorMessage>
  );
};

export default Home;
