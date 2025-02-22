import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status } from "../types/status"
import { Category, InitialState, OrderData, Product, User } from "../types/data"
import { APIAuthenticated } from "../http"
import { AppDispatch } from "./store"

export interface AddProduct{
    productName : string,
    productDescription : string,
    productPrice : number,
    productTotalStockQty : number,
    image : null,
    categoryId : string
}

interface DeleteProduct{
    productId : string
}

interface DeleteOrder{
    orderId : string
}

interface DeleteUser{
    userId : string
}

interface AddCategory{
    categoryName : string
}

interface DeleteCategory{
    categoryId : string
}


const initialState : InitialState ={
    orders: [],
    products: [],
    users :[],
    status : Status.LOADING,
    singleProduct : null,
    categories : []
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
        },
        setDeleteProduct : (state : InitialState,action : PayloadAction<DeleteProduct>)=>{
            const index = state.products.findIndex(item =>item.id = action.payload.productId)
            state.products.splice(index,1)
        },
        setDeleteOrder : (state : InitialState,action : PayloadAction<DeleteOrder>)=>{
            const index = state.orders.findIndex(item => item.id = action.payload.orderId)
            state.orders.splice(index,1)
        },
        setDeleteUser : (state : InitialState,action : PayloadAction<DeleteUser>)=>{
            const index = state.users.findIndex(item =>item.id === action.payload.userId)
            state.users.splice(index,1)
        },
        setCategory : (state : InitialState,action : PayloadAction<Category[]>)=>{
            state.categories = action.payload
        },
        setDeleteCategory : (state : InitialState,action : PayloadAction<DeleteCategory>)=>{
            const index = state.categories.findIndex(item => item.id === action.payload.categoryId)
            state.categories.splice(index,1)
        }

    }
})

export const { setStatus,setProduct,setOrders,setUser,setSingleProduct,setDeleteProduct,setDeleteOrder,setDeleteUser,setCategory,setDeleteCategory} = dataSlice.actions

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

export function fetchCategories(){
    return async function fetchCategoriesThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.get('/admin/category')
            if(response.status === 200){
                dispatch(setCategory(response.data.data))
                dispatch(setStatus(Status.SUCCESS))
            }
            else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            setStatus(Status.ERROR)
            
        }
    }
}

export function addProduct(data : AddProduct){
    return async function addProductThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('/admin/product',data,{
                headers :{
                    "Content-Type" : "multipart/form-data"
                }
            })
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

export function addCategory(data : AddCategory){
    return async function addCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.post('admin/category',data)
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

export function deleteUser(id:string){
    return async function deleteUserThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete(`users/${id}`)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteUser({userId : id}))
                
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
    }
}


export function deleteCategory(id:string){
    return async function deleteCategoryThunk(dispatch:AppDispatch){
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await APIAuthenticated.delete(`admin/category/${id}`)
            if(response.status === 200){
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setDeleteCategory({categoryId : id}))
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            setStatus(Status.ERROR)
            
        }
    }
}


