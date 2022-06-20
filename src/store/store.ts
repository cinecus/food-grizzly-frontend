import { configureStore } from "@reduxjs/toolkit";
import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux'

import statusSlice from "./slices/statusSlice";
import photoSlice from "./slices/photoSlice";
import authSlice from "./slices/authSlice";
import storeSlice from "./slices/storeSlice";
import transactionSlice from "./slices/transactionSlice";

const store =  configureStore({
    reducer: {
        status:statusSlice,
        photo:photoSlice,
        auth:authSlice,
        store:storeSlice,
        transaction:transactionSlice
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware({thunk:false})
})

// Types of root state and dispatch
type RootState = ReturnType<typeof store.getState>
type AppDispath = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch = () => useDispatch<AppDispath>()

export default store