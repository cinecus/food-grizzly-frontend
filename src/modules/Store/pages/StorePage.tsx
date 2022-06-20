import React from 'react'
import styled from 'styled-components'
import AppWrapper from '../../../components/AppWrapper'
import AppGrid from '../../../components/AppGrid'
import GridItem from '../../../components/GridItem'
import CardItem from '../../../components/CardItem'
import { Navigate, useNavigate ,useLocation ,Link} from "react-router-dom";
import { useGetStore } from '../../../hooks/StoreHook'
import { useAppSelector } from '../../../store/store'

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


const StorePage = () => {
  const queryGetStore = useGetStore()
  const {store} = useAppSelector(state=>state.store)
  let navigate:any = useNavigate();
  if(queryGetStore.isLoading) return <>Loading...</>
  return (
    <AppWrapper>
        <AppGrid  pd='2rem 8rem' justifyContent='center' alignItems='start' height='100%' rgap='2rem' cgap='2rem' minHeight='100vh'>
          {
            !!store?store?.map(({...Store},i:number)=>{
           
              return <GridItem size='30%' bg='#f1f1f1' key={i}>
              {/* <Link to={`/store/${Store._id}`}  > */}
              <CardItem height='300px' bd_height='85%' ft_bg='#fefefe' ft_height='15%' onClick={()=>navigate(`/store/${Store._id}`,{state:{id:Store._id}})}>
                  <div className='card-body'>
                      <img src={Store.image[0]}/>
                  </div>
                  <div className='card-footer'>
                      {Store.name}
                  </div>
              </CardItem>
              {/* </Link> */}
          </GridItem>
            })
            :<>Not Found Store is Available</>
          }
        </AppGrid>
    </AppWrapper>
  )
}

export default StorePage