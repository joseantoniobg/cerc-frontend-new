import React from 'react';
import { UserOutlined, MenuUnfoldOutlined,
  MenuFoldOutlined,
  DesktopOutlined } from '@ant-design/icons';
import {  Menu, Button  } from 'antd';

import styles from '../styles/SystemMenu.module.scss';
import { useAuth } from '../context/UserContext';
import { useRouter } from 'next/router';

function getItem(label, key, icon?, onClick?) {
  return {
    key,
    icon,
    label,
    onClick,
    selected: true,
  };
}

const SystemMenu = ({ children }) => {
  const [collapsed, setCollapsed] = React.useState(false);
  const { logOut, selectedMenu, setSelectedMenu } = useAuth();
  const router = useRouter();

  const items = [
    getItem('Início', '1', null, () => { setSelectedMenu('1'); router.push('/');}),
    getItem('Usuários', '2', <UserOutlined />, () => { setSelectedMenu('2'); router.push('/users'); }),
    getItem('Sair', '3', <DesktopOutlined />, logOut),
    // getItem('Option 3', '3', <ContainerOutlined />),
    // getItem('Navigation One', 'sub1', <MailOutlined />, [
    //   getItem('Option 5', '5'),
    //   getItem('Option 6', '6'),
    //   getItem('Option 7', '7'),
    //   getItem('Option 8', '8'),
    // ]),
    // getItem('Navigation Two', 'sub2', <AppstoreOutlined />, [
    //   getItem('Option 9', '9'),
    //   getItem('Option 10', '10'),
    //   getItem('Submenu', 'sub3', null, [getItem('Option 11', '11'), getItem('Option 12', '12')]),
    // ]),
  ];

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={styles.main}>
      <div className={styles.menu}>
        <Button
          type="primary"
          onClick={toggleCollapsed}
          style={{
            margin: '10px',
            marginBottom: 16,
          }}
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
        <Menu
          defaultSelectedKeys={[selectedMenu]}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          items={items}
        />
      </div>
      <div className={styles.content}>
        <div className={styles.contentInner}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default SystemMenu;