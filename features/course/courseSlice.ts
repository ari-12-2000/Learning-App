import { createSlice } from "@reduxjs/toolkit"

const initialState ={
  filterCategory: ''
}

const courseSlice = createSlice({
   name: "course",
   initialState,
   reducers:{ // it should contain pure functions
     setFilterCategory: (state, action) => {
      state.filterCategory = action.payload
    },
    clearFilterCategory: (state) => {
      state.filterCategory = ''
    }
   }

})

export const { setFilterCategory , clearFilterCategory } = courseSlice.actions
export default courseSlice.reducer;