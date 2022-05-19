import { Button, Form, Input } from 'antd';
import React from 'react';
import { UserOutlined } from '@ant-design/icons';
import { useAuth } from '../../context/UserContext';
import styles from '../../styles/Login.module.scss';
import { msgError } from '../../utils/utils';

const Login = () => {
  const [loadingLogin, setLoadingLogin] = React.useState(false);
  const { logIn } = useAuth();

  const logUserIn = React.useCallback(
    async form => {
      try {
        setLoadingLogin(true);
        await logIn({ login: form.login, password: form.password })
      } catch (e) {
        setLoadingLogin(false);
        msgError('Erro', e?.response?.data?.message)
      }
    },
    [logIn]
  )


  return <div className={styles.background}>
    <div className={styles.formBody}>
      <Form layout='vertical' onFinish={logUserIn}>
        <Form.Item
          name="login"
          label={<span>Login</span>}
          rules={[{required: true, message: 'Por favor, informe seu login'}]}
        >
          <Input size='large' prefix={<UserOutlined />} placeholder='joseantonio' />
        </Form.Item>
        <Form.Item
          name="password"
          label={<span>Senha</span>}
          rules={[{required: true, message: 'Por favor, informe sua senha'}]}
        >
          <Input.Password size='large' placeholder='********' />
        </Form.Item>
        <Form.Item>
          <Button size='large' type='primary' htmlType='submit' id='entrar' loading={loadingLogin} block>Entrar</Button>
        </Form.Item>
      </Form>
    </div>
  </div>
}

export default Login;