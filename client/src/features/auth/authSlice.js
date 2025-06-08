import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const signinUser = createAsyncThunk('/sign-in',async (userData) => {
    return userData
})

const authSlice = createSlice({
    name:'auth',
    initialState:{
        user:null,
        status:'idle',
        error:null
    },
    reducers:{
        signout:(state)=>{
            state.user = null
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(signinUser.pending,(state)=>{
            state.status='loading'
        }).addCase(signinUser.fulfilled,(state,action)=>{
            state.status='succeeded'
            state.user = action.payload
        }).addCase(signinUser.rejected,(state,action)=>{
            state.status = 'failed'
            state.error = action.error.message
        })
    }
})

export const {signout} = authSlice.actions
export default authSlice.reducer