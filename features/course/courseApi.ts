import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"


export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getPrograms: builder.query({
            query: () => "/programs"
        }),

        getProgram: builder.query({
            query: (id: number) => `/programs/${id}`
        }),

        getModule: builder.query({
            query: (id: number) => `/modules/${id}`
        }),
    })
})

export const {
  useGetProgramsQuery,
  useGetProgramQuery,
  useGetModuleQuery
} = courseApi