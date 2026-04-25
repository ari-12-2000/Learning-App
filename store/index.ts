import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice"
import courseReducer from "../features/course/courseSlice"
import { studentApi } from "@/features/student/studentApi";
import { courseApi } from "@/features/course/courseApi";

export const store= configureStore({
    reducer:{
        auth:authReducer,
        course:courseReducer,
        [studentApi.reducerPath]: studentApi.reducer,
        [courseApi.reducerPath]: courseApi.reducer
    },
    middleware: (getDefaultMiddleware)=> getDefaultMiddleware()
    .concat(studentApi.middleware)
    .concat(courseApi.middleware)
})

export type RootState= ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch