import { useMutation, useQuery } from "react-query";
import {GET,POST,DELAY} from '../api/index'
import { signIn } from "../store/slices/authSlice";
import { url } from "../api/url";
import { DEPOSIT, GET_BALANCE, RESERVE, TRANSFER, WITHDRAW } from "../api/api_route";
import { SuccessModal,ErrorModal } from "../components/AppModal";
import { Navigate, useNavigate} from "react-router-dom";

export const useGetBalance:any=()=>{
    return useQuery('transaction',()=>GET(GET_BALANCE,{headers: {
        Authorization:localStorage.getItem('token')
      }}),{
        onSuccess:()=>{

        },
        // refetchInterval:2000
    })
}

export const useDeposit:any=()=>{
    return useMutation('transaction',async(data:object)=>await POST(DEPOSIT,data,{headers: {
        Authorization:localStorage.getItem('token')
      }}),{
        onSuccess:()=>{
            SuccessModal({redirect:null})
        },
        onError:(error)=>{
            console.log('error', error)
        }
    } )
}

export const useWithdraw:any=()=>{
    return useMutation('transaction',async(data:object)=>await POST(WITHDRAW,data,{headers: {
        Authorization:localStorage.getItem('token')
      }}),{
        onSuccess:()=>{
            SuccessModal({redirect:null})
        },
        onError:(error:{message:string})=>{
            ErrorModal({title:error.message})
        }
    })
}

export const useTransfer:any=()=>{
    return useMutation('transaction',async(data:object)=>await  POST(TRANSFER,data,{headers: {
        Authorization:localStorage.getItem('token')
      }}),{
        onSuccess:()=>{
            SuccessModal({redirect:null})
        },
        onError:(error:{message:string})=>{
            ErrorModal({title:error.message})
        }
    }
    )
}

export const useReserve:any=()=>{
    let navigate:any = useNavigate();
    return useMutation('transaction',async(data:object)=>await  POST(RESERVE,data,{headers: {
        Authorization:localStorage.getItem('token')
      }}),{
        onSuccess:()=>{
            SuccessModal({redirect:()=> navigate('/history')})
        },
        onError:(error:{message:string})=>{
            ErrorModal({title:error.message})
        }
    }
    )
}