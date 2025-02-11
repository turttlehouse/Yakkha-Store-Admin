import { configureStore } from "@reduxjs/toolkit";
import dataSlice from "./dataSlice";


const store = configureStore({
    reducer :{
        datas : dataSlice
    }
})

export default store

//defining types for redux store
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>