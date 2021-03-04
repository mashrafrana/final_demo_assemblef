// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const StyledLayout = styled.main`
  display: block;
  min-height: 100%;
  margin: auto;

  @media (min-width: 600px) and (min-height: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 2rem;
    padding-top: 0rem;
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 355px;
  width: 100%;
  .wrap {
    width: 300px;
    margin: auto;
    text-align: center;
    position: relative;
  }
`;
