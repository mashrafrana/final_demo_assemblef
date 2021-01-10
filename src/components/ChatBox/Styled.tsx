// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import styled from 'styled-components';

export const NavDiv = styled.nav`
  background: #ffffff;
  transition: 350ms;
  position: relative;
  text-align: center;
`;

export const NavUl = styled.ul`
  padding: 0px;
  width: 100%;
  margin-top: 30px;
  li {
    padding: 10px;
  }
  li a {
    text-decoration: none;
  }
`;

export const NavHref = styled.div`
  text-decoration: none;
  color: #090909;
  font-size: 12px;
  height: 100%;
  font-weight: 600;
`;

export const NavPara = styled.p`
  color: #414141;
  font-weight: 300;
  font-size: 13px;
  margin: 0;
`;

export const NavText = styled.div`
  padding: 10px;
  list-style: none;
  cursor: pointer;
`;

export const ChatBoxContainer = styled.div``;

export const RightSideBarContainer = styled.div`
  background: #ffffff;
  padding: 10px;
  margin: 10px;
`;

export const RightSideBarContainerSearch = styled.div`
  background: #f1f2f6;
  border: 1px solid #e5e6ea;
  width: 100%;
  border-radius: 5px;
  padding: 5px 10px;
  outline: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  input {
    background: transparent;
    border: none;
    outline: none;
    padding: 0;
    margin: 0;
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
    overflow: visible;
  }
`;

export const RightSideBarContainerInput = styled.div`
  background: transparent;
  border: none;
  outline: none;
  padding: 0;
`;

export const ChatBoxDiv = styled.div`
  display: flex;
  align-items: center;
  border-top: 1px solid #e4e5e9;
  padding: 10px 0px;
  img {
    margin-right: 0.5rem !important;
    max-width: 100%;
    height: auto;
  }
`;

export const ChatBoxPara = styled.p`
  color: #000000;
  font-weight: 400;
  padding-bottom: 10px;
`;

export const ChatBoxSpan = styled.span`
  color: #070707;
  font-weight: 200;
`;

export const ChatMessage = styled.p`
  color: #070707;
  font-weight: 300;
`;
