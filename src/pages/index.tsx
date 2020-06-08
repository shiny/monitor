import React, { useState } from 'react';
import styles from './index.less';
import { Grid } from 'zent';
import { useRequest, request } from 'umi';



const columns = [
  {
    title: '名称',
    name: 'title',
    width: 220,
    textAlign: 'right',
    bodyRender: ({ title }) => <strong>{title}</strong>
  },
  {
    title: '域名',
    name: 'name',
    width: 220,
    bodyRender: ({ name }) => <a 
      target="_blank"
      href={`https://${name}/`}>{name}
      </a>
  },{
    title: '过期时间',
    name: 'expired_at',
    needSort: true
  }
];

interface pageInfo {
  current: number,
  pageSize: number,
  sorter: any
}
interface paginated {
  list: any[],
  total: number
}

async function getDomains({ current, pageSize, sorter }: pageInfo) {
  return await request('https://yinxing-api.shouwang.io/ssl/domain/', {
    method: 'GET',
    params: {
      page: current,
      size: pageSize,
      order: sorter?.order
    }
  });
}

export default () => {
  const [ sortType, setSortType ] = useState('asc');
  const { data, error, loading, pagination, tableProps } = useRequest(getDomains, {
    paginated: true,
    defaultPageSize: 15,
    formatResult: ({ data, meta }): paginated => {
      return {
        list: data,
        total: meta.total
      }
    }
  });
  return (
    <div style={{width: 900, margin: '0 auto'}}>
      <h1 style={{textAlign: 'center', padding: 20}}>SSL证书过期监测</h1>
      <Grid
        loading={loading}
        columns={columns}
        className={styles.table}
        rowClassName={styles.row}
        datasets={data?.list}
        scroll={{ y: 854 }}
        sortType={sortType}
        sortBy="expired_at"
        pageInfo={{
          pageSizeOptions: [5, 15, 20],
          ...pagination
        }}
        onChange={({ current, pageSize, sortType }) => {
          // pagination.onChange(current, pageSize)
          setSortType(sortType);
          tableProps.onChange({ current, pageSize }, {}, {
            order: sortType === 'asc' ? 'ascend' : 'descend'
          })
        }}
      />
    </div>
  );
}
