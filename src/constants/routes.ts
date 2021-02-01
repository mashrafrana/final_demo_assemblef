// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

const awsPath = '/Prod';
export const rootPath: string = window.location.href.includes(awsPath)
  ? `${awsPath}/`
  : '/';

const routes = {
  HOME: `http://live.assemblyf.com/`,
  DEVICE: `${rootPath}devices`,
  MEETING: `${rootPath}meeting`,
  VIDEO: `${rootPath}video`,
};

export default routes;
