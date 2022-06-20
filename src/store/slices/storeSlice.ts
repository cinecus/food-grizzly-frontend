import { createSlice } from "@reduxjs/toolkit";

const initialState:any = {
    store:null,
    store_by_id:null,
    seat_available:null
}

const storeSlice = createSlice({
    name: 'store',
    initialState,
    reducers: {
        getStore:(state,action)=>{
            state.store = action.payload.result.store
        },
        getStoreByID:(state,action)=>{
            state.store_by_id = action.payload.result
        },
        checkSeat:(state,action)=>{
            state.seat_available = action.payload
              
        }
    }
})

export const {getStore,getStoreByID,checkSeat} = storeSlice.actions

export default storeSlice.reducer