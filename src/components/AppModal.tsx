import React, { FC } from 'react'
import { Modal, Button, Space } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

interface ConfirmModalProps{
    title:string,
    content:string,
    action?:any,
    redirect?:any
}

interface ErrorModalProps{
  title?:string
}

interface SuccessModalProps{
  title?:string
  redirect?:any
}

const ConfirmModal = ({title,content,action,redirect}:ConfirmModalProps)=> {

  Modal.confirm({
          title: title,
          icon: <ExclamationCircleOutlined />,
          content: content,
          onOk(){
           action()
          },
          onCancel() {
            console.log('Cancel');
          },
        })
}

const SuccessModal = ({redirect}:SuccessModalProps)=>{
    Modal.success({
      title:'Your transaction is completed successfully',
      onOk(){
        redirect()
      }
    });
}

const ErrorModal = ({title}:ErrorModalProps)=>{
  Modal.error({
    title:'Your transaction found issue',
    content:title
  })
}

export  {
  ConfirmModal,
  SuccessModal,
  ErrorModal
}