// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const VideoSection = styled.div`
  background: #1e1e1e;
  padding: 50px;
  border-radius: 20px;
`;

export const MainVideoWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  text-align: center;
  grid-gap: 20px;
`;

export const MainVideoFourPerson = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 20px;
`;

export const VideoMembersBottom = styled.div`
  display: grid;
  grid-template-columns: 100px 100px 100px 100px;
  grid-gap: 10px;
  padding-top: 20px;
`;

export const Video = styled.div`
  border-radius: 20px;
  img {
    max-width: 100%;
    height: auto;
  }
`;
