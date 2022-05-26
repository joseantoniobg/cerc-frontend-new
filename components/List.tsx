import { Transfer } from 'antd';
import React from 'react';

const List = ({ title, subtitle, data, targetKeys, setTargetKeys }) => {
  const filtro = (inputValue, option) => option.title?.toUpperCase()?.indexOf(inputValue.toUpperCase()) > -1;

  const handleChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  }

  return (<Transfer
            titles={[title, subtitle]}
            dataSource={data}
            showSearch
            filterOption={filtro}
            targetKeys={targetKeys}
            onChange={handleChange}
            render={item => item.title}
            listStyle={
              {
                width: 400,
                height: 500,
              }
            }
          />)
}

export default List;