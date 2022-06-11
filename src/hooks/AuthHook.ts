import { useMutation, useQuery } from "react-query";
import {GET,POST,DELAY} from '../api/index'
import { useAppDispatch } from "../store/store";
import { signIn,signUp } from "../store/slices/authSlice";
import { url } from "../api/url";
import {GET_ACCOUNT_INFO, SIGNIN,SIGNUP} from '../api/api_route'

export const useSignIn:any=()=>{
    const dispatch = useAppDispatch()
    return useMutation('auth',async(data:object)=>await POST(SIGNIN,data),{
        onSuccess:(data)=>{
            dispatch(signIn(data))
        },
        onError:(error)=>{
            console.log('error',error)
        }
    })
}

export const useSignUp:any=()=>{
    const dispatch = useAppDispatch()
    return useMutation('auth',async(data:object)=>await POST(SIGNUP,data),{
        onSuccess:(data)=>{
            dispatch(signUp(data))
        },
        onError:(error)=>{
            console.log('error',error)
        }
    })
}

export const useGetAccountInfo:any =()=>{
    return useQuery('auth',()=>GET(GET_ACCOUNT_INFO,{headers: {
        Authorization:localStorage.getItem('token')
        }})
    )
}