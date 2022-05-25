import { Alert } from 'antd';
import React from 'react';
import Header from '../components/Header';
import SystemMenu from '../components/SystemMenu';
import { useAuth } from '../context/UserContext';
import { hasRole } from '../utils/utils';

const StandardPage = ({ role, title, children }) => {
  const { user } = useAuth();
  const hasPermission = hasRole(user, role);

  return <SystemMenu title={title}>
            {hasPermission ? children : <Alert type='warning' message="Você não possui permissão para acessar essa funcionalidade" />}
         </SystemMenu>
}

export default StandardPage;