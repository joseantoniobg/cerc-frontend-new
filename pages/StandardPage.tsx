import React from 'react';
import SystemMenu from '../components/SystemMenu';

const StandardPage = ({ children }) => {
  return <SystemMenu>{children}</SystemMenu>
}

export default StandardPage;