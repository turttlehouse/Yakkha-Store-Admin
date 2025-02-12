import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status } from "../types/status"
import { InitialState, OrderData, Product, User } from "../types/data"
import { APIAuthenticated } from "../http"
import { AppDispatch } from "./store"



const initialState : InitialState ={
    orders: [],
    products: [],
    users :[],
    status : Status.LOADING,
    singleProduct : null
}

const dataSlice = createSlice({
    name : 'data',
    initialState,
    reducers :{
        setStatus : (state:InitialState,action : PayloadAction<Status>)=>{
            state.status = action.payload
        },    
        // setProduct : (state : InitialState, action : PayloadAction<InitialState['products']>)=>{  OR
        setProduct : (state : InitialState,action : PayloadAction<Product[]>)=>{  
            state.products = action.payload
        },
        setOrders: (state : InitialState, action : PayloadAction<OrderData[]>)=>{
            state.orders = action.payload
        },
        setUser : (state : InitialState,action : PayloadAction<User[]>)=>{
            state.users = action.payload
        },
        setSingleProduct : (state : InitialState,action : PayloadAction<Product>)=>{
            state.singleProduct = action.payload
        }
    

    }
})

export const { setStatus,setProduct,setOrders,setUser,setSingleProduct} = dataSlice.actions

export default dataSlice.reducer


export function fetchProducts(){
    return async function fetchProductsThunk(dispatch:any) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('admin/product');
            if(response.status === 200){
                const { data } = response.data;
                dispatch(setProduct(data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
        
    }
}

export function fetchOrders(){
    return async function fetchOrdersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/order');
            if(response.status === 200)
            {
                dispatch(setOrders(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }

            
        } catch (error) {
            setStatus(Status.ERROR)
            
        }
    }
}

export function fetchUsers(){
    return async function fetchUsersThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/users')
            if(response.status === 200){
                dispatch(setUser(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}

export function addProduct(data : Product){
    return async function addProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('/admin/product',data)
            if(response.status === 200){
                dispatch(setProduct(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            setStatus(Status.ERROR)
        }
    }
}

export function deleteProduct(id : string){
    return async function deleteProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete(`admin/product/${id}`)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}

export function deleteOrder(id: string){
    return async function deleteOrderThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete(`order/admin/${id}`)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            setStatus(Status.ERROR)
            
        }
        
    }
}


export function singleProduct(id:string){
    return async function singleProductThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get(`admin/product/${id}`)
            if(response.status === 200){
                dispatch(setSingleProduct(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            setStatus(Status.ERROR)
            
        }
        
    }
}




