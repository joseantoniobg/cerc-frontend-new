import React from 'react';
import StandardPage from '../StandardPage';
import { authorizedRequest } from '../../config/index';
import { parseCookies, msgSuccess, msgError, formatarCpf } from '../../utils/utils';
import { Form, Row, Input, Button, Divider } from 'antd';
import ColAntd from '../../components/ColAntd';
import { MaskedInput } from 'antd-mask-input';
import Container from '../../components/Container';
import Title from 'antd/lib/skeleton/Title';
import Subtitle from '../../components/Subtitle';
import List from '../../components/List';

const UserPage = ({ id, user, roles, token }) => {
  const [loadingSaveUser, setLoadingSaveUser] = React.useState(false);
  const [selectedRoles, setSelectedRoles] = React.useState(user.roles.map(r => r.id_role))

  const saveUser = async (form) => {
    setLoadingSaveUser(true);

    const newUser = user?.id_user === undefined;

    user = { ...user, ...form, document: formatarCpf(form.document), roles: selectedRoles.map(r => ({ id_role: r })) };

    try {
      const resp = await authorizedRequest(token, {
        url: '/users',
        method: newUser ? 'post' : 'put',
        data: user,
      })

      msgSuccess('Sucesso!', `Usuário ${newUser ? 'cadastrado' : 'atualizado'} com sucesso!`);
    } catch (e) {
      console.log(e);
      msgError('Algo deu errado', `Ocorreu um erro: ${e?.message}`);
    } finally {
      setLoadingSaveUser(false);
    }
  }

  return <StandardPage title={id === '0' ? 'Cadastrar Usuário' : 'Editar Usuário'} role={'alterUser'}>
      <Form layout='vertical' onFinish={saveUser} initialValues={user}>
      <Container>
      <Subtitle>Dados Básicos</Subtitle>
      <Row gutter={16}>
          <ColAntd md={6} lg={6}>
            <Form.Item
              name="login"
              label={<span>Login</span>}
              rules={[{required: true, message: 'Por favor, informe o login'}]}
            >
              <Input size='large' placeholder='joseantonio' />
            </Form.Item>
          </ColAntd>
          <ColAntd md={6} lg={6}>
            <Form.Item
              name="email"
              label={<span>E-mail</span>}
              rules={[{required: true, type: 'email', message: 'Por favor, informe um e-mail válido'}]}
            >
              <Input size='large' placeholder='jose@bolt.com.br' value={user?.email} />
            </Form.Item>
          </ColAntd>
          <ColAntd md={12} lg={12}>
            <Form.Item
              name="name"
              label={<span>Nome</span>}
              rules={[{required: true, message: 'Por favor, informe um nome'}]}
            >
              <Input size='large' placeholder='José Antônio' />
            </Form.Item>
          </ColAntd>
        </Row>
        <Row gutter={16}>
          <ColAntd md={6} lg={6}>
            <Form.Item
                name="document"
                label={<span>CPF</span>}
                rules={[{required: true, message: 'Por favor, informe um nome'}]}
              >
                <MaskedInput mask={"000.000.000-00"} size='large' placeholder='123.456.789-00' />
            </Form.Item>
          </ColAntd>
        </Row>
        <Subtitle>Permissões</Subtitle>
        <Row gutter={16}>
          <ColAntd md={12} lg={12}>
            <List
               title='Permissões'
               subtitle='Permissões Liberadas'
               data={roles.map(r => ({ key: r.id_role, title: r.description }))}
               targetKeys={selectedRoles}
               setTargetKeys={setSelectedRoles}
            />
          </ColAntd>
        </Row>
        </Container>
        <hr/>
        <Container>
          <Row gutter={16}>
            <ColAntd md={3} lg={3}>
              <Form.Item>
                <Button size='large' type='primary' htmlType='submit' id='entrar' loading={loadingSaveUser} block>Salvar</Button>
              </Form.Item>
            </ColAntd>
            <ColAntd md={6} lg={6}>
                <Button size='large' type='default' block>Enviar e-mail com nova senha</Button>
            </ColAntd>
          </Row>
        </Container>
      </Form>

  </StandardPage>
}

export const getServerSideProps = async ({ params: {id}, req }) => {
  const {token} = parseCookies(req);

  let user = {};
  let roles = [];

  if (id !== '0') {
    const us = await authorizedRequest(token, {
      url: `/users/id/${id}`,
    });

    const rol = await authorizedRequest(token, {
      url: `users/allRoles`
    });

    user = us?.data;
    roles = rol?.data;
  }

  return {
    props: { id, user, roles, token }
  }
}

export default UserPage;