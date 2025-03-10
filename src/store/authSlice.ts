import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Status } from "../types/status"
import { AppDispatch } from "./store"
import { API } from "../http"

interface LoginData{
    email : string,
    password : string
}

interface User{
    username : string | null,
    email : string | null,
    password : string | null,
    token : string | null
}

interface AuthState{
    user : User,
    status : Status
    token : string | null
}

const initialState : AuthState = {
    user : {} as User,
    status : Status.LOADING,
    token : null
}

const authSlice = createSlice({
    name : 'auth',
    initialState,
    reducers : {
        setUser (state : AuthState,action : PayloadAction<User>){
            state.user = action.payload
        },
        setStatus(state: AuthState,action : PayloadAction<Status>){
            state.status = action.payload
        },
        resetStatus(state : AuthState){
            state.status = Status.LOADING
        },
        setToken(state : AuthState,action : PayloadAction<string>){
            state.user.token = action.payload
        },
        setUserLogout(state: AuthState){
            state.token = null
            state.user = {
                email : null,
                username : null,
                password : null,
                token : null
            }
        }
    }
})

export const { setUser,setStatus,resetStatus,setToken,setUserLogout}  = authSlice.actions

export default authSlice.reducer

export function login(data : LoginData){
    return async function loginThunk(dispatch:AppDispatch) {
        dispatch(setStatus(Status.LOADING))
        try {
            const response = await API.post('login',data)
            if(response.status === 200){
                const { data} = response.data
                dispatch(setStatus(Status.SUCCESS))
                dispatch(setToken(data))
                // console.log('hello')
                const storageKey = (import.meta as any).env.VITE_ADMIN_STORAGE_KEY;
                // console.log(storageKey)
                // const storageKey = import.meta.env.VITE_CLIENT_STORAGE_KEY;

                if(storageKey){

                    localStorage.setItem(storageKey,data)
                }else{
                    alert('storageKey not found')
                }
                
                // localStorage.setItem('token',data)
            }else{
                dispatch(setStatus(Status.ERROR))
            }
            
        } catch (error) {
            dispatch(setStatus(Status.ERROR))
            
        }
    }
        
    
}