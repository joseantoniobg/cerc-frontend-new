import React from 'react';
import { Divider } from 'antd';

const Subtitle = ({ children }) => {
  return (<Divider orientation='left'><h2 style={{ fontSize: '18pt' }}>{children}</h2></Divider>)
}

export default Subtitle;