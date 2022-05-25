import { Row } from 'antd';
import React from 'react';
import styles from '../styles/Header.module.scss';

const Header = ({ title, info }) => {
  return <div>
            <Row className={styles.head} justify='space-between' align='middle' style={{ width: '100%' }}>
              <h2 className={styles.title}>{title}</h2>
            </Row>
        </div>
}

Header.defaultProps = {
  title: '',
  info: null
}

export default Header;