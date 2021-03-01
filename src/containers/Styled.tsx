// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const ParticipantVideo = styled.div`
  border: 1px solid #c4c4c4;
  border-radius: 10px;
  padding: 10px 8px;
  background: #fff;

  .follower-list ul.follower-ul {
    list-style: none;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 15px;
  }

  li {
    display: inline-block;
    border-radius: 5px;
    width: 23%;
    padding-bottom: 23%;
    overflow: hidden;
    position: relative;
    margin-right: 2%;
    margin-bottom: 2%;
    cursor: pointer;
  }
  a {
    color: transparent;
    display: inline-block;
    height: 100%;
    width: 100%;
    filter: blur(0);
    transition: filter 0.3s, -webkit-filter 0.3s;
    position: absolute;
  }

  img {
    opacity: 1;
    transition: opacity 0.3s;
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    object-fit: cover;
    -webkit-filter: grayscale(1);
    filter: grayscale(1);
  }

  .follow-name {
    background-color: rgba(0, 0, 0, 0.6);
    color: #fff;
    position: absolute;
    bottom: 0;
    max-height: 21px;
    text-align: center;
    font-size: 12px;
    display: block;
    width: 100%;
    word-break: break-word;
    padding: 5px 0;
    transition: all 0.3s ease-in-out;
    line-height: 1.3;
    font-weight: 300;
    font-size: 0.68em;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }

  p {
    font-weight: 300;
    font-size: 14px;
    margin-bottom: 10px;
  }
`;

export const RosterDiv = styled.div`
  width: 280px;
`;
