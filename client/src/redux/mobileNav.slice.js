import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    isOpen:false
}
export const mobileNavSlice = createSlice({
    name:'mobileNav',
    initialState,
    reducers:{
        toggleNav :(state)=>{
            state.isOpen = !state.isOpen
        }
    }
})
export const {toggleNav} = mobileNavSlice.actions
export default mobileNavSlice.reducer