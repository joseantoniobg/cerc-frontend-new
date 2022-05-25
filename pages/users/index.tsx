import React from 'react';
import StandardPage from '../StandardPage';
import { authorizedRequest } from '../../config';
import { parseCookies, normalizeParams, formatarCpf } from '../../utils/utils';
import { useAuth } from '../../context/UserContext';
import { Button, Table, Tag } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';

const Users = ({ users, token }) => {
  const { user } = useAuth();
  const [usersBd, setUsersBd] = React.useState();
  const [loadingUsers, setLoadingUsers] = React.useState(false);
  const [pager, setPager] = React.useState({});
  const history = useRouter();


  const getUsersApi = async (current = 1, size = 10) => {
    setLoadingUsers(true);

    const params = normalizeParams({
      page: current,
      size,
    })

    const resp = await authorizedRequest(token, {
      url: '/users',
      params
    });

    setUsersBd(resp?.data);

    setLoadingUsers(false);
  }

  React.useEffect(() =>  setUsersBd(users), [])

  const columns = [
    { title: 'Nome', dataIndex: 'name', key: '2'  },
    { title: 'Documento', dataIndex: 'document', key: '3', render: (text, record) => <span>{formatarCpf(record.document)}</span> },
    { title: 'E-mail', dataIndex: 'email', key: '4' },
    { title: 'Login', dataindex: 'login', key: '5' },
    { title: 'Ativo', dataindex: 'status', key: '6',
      render: (text, record) => <Tag color={record.status === 1 ? 'green' : 'red'}>{record.status === 1 ? 'SIM' : 'NÃO'}</Tag> },
    { title: 'Ações', key: '7', fixed: 'right', width: 80, render: (text) => <Button icon={<EditOutlined />} onClick={() => history.push(`/users/${text.id_user}`)} /> }
  ]

  return  <StandardPage role='users' title='Usuários'>
            <Table
             columns={columns}
             dataSource={users.content}
             scroll={{ x: 1000 }}
             loading={loadingUsers}
             pagination={{...pager,
                          showTotal: (total: number) => `Total de ${total} ${total > 1 ? 'itens' : 'item'}`,
                          showQuickJumper: true,
                          showSizeChanger: true,
                        }}
              size='small'
              onChange={pagination => {
                getUsersApi(pagination.current, pagination.pageSize)
              }}
            />
          </StandardPage>
}

export const getServerSideProps = async ({req}) => {
  const {token} = parseCookies(req);

  const resp = await authorizedRequest(token, {
    url: '/users',
  });

  return {
    props: { users: resp.data, token }
  }
}

export default Users;