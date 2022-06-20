import React from 'react'
import styled from 'styled-components'
import AppWrapper from '../../../components/AppWrapper'
import AppGrid from '../../../components/AppGrid'
import GridItem from '../../../components/GridItem'
import CardItem from '../../../components/CardItem'
import {ConfirmModal} from '../../../components/AppModal'
import { useGetStoreByID } from '../../../hooks/StoreHook'
import { useAppSelector,useAppDispatch } from '../../../store/store'
import { useParams,useLocation ,useNavigate} from 'react-router-dom'
import {Select,Form,InputNumber, Button,Image} from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { checkSeat } from '../../../store/slices/storeSlice'
import { useReserve } from '../../../hooks/TransactionHook'

const { Option } = Select;

type Store =  {
  _id:string
  name:string,
  image:[string],
  open:string,
  close:string,
  status:boolean,
  maximum:number,
  created_date:string,
  updated_date:string
}


const SingleStorePage = () => {
  const [form] = useForm()
  const location:any = useLocation();
  let navigate:any = useNavigate();
  const dispatch = useAppDispatch()
  const queryGetStore = useGetStoreByID(location.state.id)
  const requestReserve = useReserve()
  const {store_by_id,seat_available} = useAppSelector(state=>state.store)
  const generateSlot:any=(open:string=':',close:string=':')=>{
    const [timeOpen,timeClose] = [+open.split(':')[0], +close.split(':')[0]]
    return Array(timeClose-timeOpen).fill(0).map((el,i)=>{
      return { label:`${timeOpen+i}:00 -  ${timeOpen+i+1}:00` ,value:`${timeOpen+i}:00`   }
    })
  }
  const checkSlot = (reserveTime:string,arrayHistory:[obj:{reserve_time:string,current_qty:number}])=>{
    const find =  arrayHistory.find(el=>el.reserve_time == reserveTime) 
    return !!find ? find.current_qty:store_by_id?.maximum
  }
  
  
  const handleFinish =(values:{reserveTime:string,qty:number})=>{
    if(!localStorage.getItem('account_id')){
      navigate('/signin')
    }
    const requestData = {
      account_id: localStorage.getItem('account_id'),
      store_id: store_by_id._id,
      qty:values.qty,
      reserve_time: values.reserveTime,
      type:'reserve'
    }
   
    ConfirmModal({
      title:`ต้องการจองที่นั่งในร้าน ${store_by_id.name} ใช่หรือไม่?`,
      content:`จำนวนที่นั่ง ${values.qty} ช่วงเวลา ${values.reserveTime.split(':')[0]}:00 -  ${+values.reserveTime.split(':')[0]+1}:00 `,
      action:()=>requestReserve.mutate(requestData)
      
})
    // requestReserve.mutate(requestData)

    //console.log('requestData', requestData)
  }
  //console.log('generateSlot', generateSlot(store_by_id.open,store_by_id.close))

  
  if(queryGetStore.isLoading) return <>Loading...</>
  else if(queryGetStore.error) return <>error</>
  return (
    <AppWrapper>
          {
            store_by_id&&
        <AppGrid  pd='2rem 8rem' justifyContent='center' alignItems='center' height='100vh' rgap='2rem' cgap='2rem' >
         
        <GridItem size='45%'>
    
            <ImageMain src={store_by_id?.image[0]} />
 
        </GridItem>
          <GridItem size='45%'  >
            <h1>
              {store_by_id?.name}
            </h1>
            <h3>
            Open: {store_by_id?.open}{'         '}Close: {store_by_id?.close} 
            </h3>
            <GridItem size='50%'>
          <Form onFinish={handleFinish} form={form}>
            <Form.Item name='reserveTime' label='ช่วงเวลาจอง'>
              <Select placeholder='ระบุช่วงเวลาที่จะจอง' options={generateSlot(store_by_id?.open,store_by_id?.close)} onChange={()=>dispatch(checkSeat(checkSlot(form.getFieldValue('reserveTime'),store_by_id?.reserve_slot)))}  />
            </Form.Item>
            <Form.Item name='qty' label='จำนวนที่นั่ง'>
              <InputNumber placeholder='ระบุจำนวนที่นั่ง' addonAfter={'ที่นั่ง'}/>
            </Form.Item>
            {!!seat_available && 
            <Form.Item>
          <>จำนวนที่นั่งเหลือ : {seat_available} ที่นั่ง</>
            </Form.Item>
           }
            <Form.Item>
              <Button htmlType='submit' type='primary'>
                จองที่นั่ง
              </Button>
            </Form.Item>
          </Form> 
          </GridItem>
          </GridItem>
        </AppGrid>
           }
    </AppWrapper>
  )
}

export default SingleStorePage

const ImageMain = styled(Image)`
  width:450px;
  height:450px;
  @media screen and (max-width: 768px){
    width:100%;
    height:100%;
  }
`