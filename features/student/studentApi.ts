
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const studentApi = createApi({
    reducerPath: "studentApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api/student" }),
    endpoints: (builder) => ({
        getProgress: builder.query({
            query: () => `progress`,
            transformResponse: (res: any) => res.data
        }),

        getEnrolledCoursesProgress: builder.query({
            query: () => `courses`,
            transformResponse: (res: any) => res.data
        }),

        getProfileImage: builder.query({
            query: () => `profileImage`,
            transformResponse: (res: any) => res.data
        })
    })
})

export const {
    useGetProgressQuery,
    useGetEnrolledCoursesProgressQuery,
    useGetProfileImageQuery
} = studentApi