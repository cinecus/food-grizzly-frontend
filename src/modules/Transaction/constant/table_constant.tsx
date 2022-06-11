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
      title: 'Date Time',
      dataIndex: 'created_date',
      key: 'created_date',
      align:'center',
      render:(text)=><>{moment(text).format('YYYY-MM-DD | HH:mm')}</>
    },
    {
      title: 'Type',
      dataIndex: 'type',
      align:'center',
      key: 'type',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align:'right',
      render:(text,{type})=>type=='withdraw' || type=='transfer' ? <div style={{color:'red'}}>- {formatNumber(text)}</div> : <div style={{color:'green'}}>+ {formatNumber(text)}</div>
    },
    {
      title: 'Remaing Amount',
      key: 'current_amount',
      align:'right',
      dataIndex: 'current_amount',
      render:(text)=><>{formatNumber(text)}</>
    },
    {
      title: 'Reference Account ID',
      key: 'ref_account_id',
      align:'center',
      dataIndex: 'ref_account_id'
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      align:'center',
      render:(text,record)=><Tag color='lime'>Completed</Tag>
    },
  ];

