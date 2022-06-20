import { useMutation, useQuery } from "react-query";
import {GET,POST,DELAY} from '../api/index'
import { getStore,getStoreByID } from "../store/slices/storeSlice";
import { url } from "../api/url";
import { GET_STORE,GET_STORE_BY_ID} from "../api/api_route";
import { SuccessModal,ErrorModal } from "../components/AppModal";
import { useAppDispatch } from "../store/store";

export const useGetStore:any=()=>{
    const dispatch = useAppDispatch()
    return useQuery('store',async()=>await  GET(GET_STORE,{
      headers: {
        Authorization:localStorage.getItem('token')
      }
    }),{
        onSuccess:(data)=>{
          dispatch(getStore(data))
        },
        // refetchInterval:2000
    })
}

export const useGetStoreByID:any=(id:string)=>{
  const dispatch = useAppDispatch()
  console.log('id', id)
  return useQuery('store',async ()=>await GET(`${GET_STORE_BY_ID}/${id}`,{
    headers: {
      Authorization:localStorage.getItem('token')
    }
  }),{
    onSuccess:(data)=>{
      console.log(data)
      dispatch(getStoreByID(data))
    }
  })
}