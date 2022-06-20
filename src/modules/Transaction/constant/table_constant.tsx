import type { ColumnsType } from 'antd/lib/table';
import { Table, Tag, Space } from 'antd';
import moment from 'moment'
import { formatNumber } from '../../../Function';

interface DataType {
    key: string
    created_date: string
    type: string
    amount: number
    current_amount: number
    ref_account_id:string
  }

export const columns: ColumnsType<DataType> = [
    {
      title: 'Reserve Time',
      dataIndex: 'reserve_time',
      key: 'reserve_time',
      align:'center',
      render:(text,record)=><>{moment(record.created_date).format('YYYY-MM-DD')} | {text}</>
    },
    {
      title: 'Food Store',
      dataIndex: 'store_id',
      align:'center',
      key: 'store_id',
      render:(text)=><>{text.name}</>
    },
    {
      title: 'Quantity',
      dataIndex: 'qty',
      key: 'qty',
      align:'right',
      // render:(text,{type})=>type=='withdraw' || type=='transfer' ? <div style={{color:'red'}}>- {formatNumber(text)}</div> : <div style={{color:'green'}}>+ {formatNumber(text)}</div>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align:'center',
      key: 'type',
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align:'center',
      render:(text,record)=><Tag color='lime'>Completed</Tag>
    },
  ];

