import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"


export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    endpoints: (builder) => ({
        getCourses: builder.query({
            query: () => "/courses"
        }),

        getCourse: builder.query({
            query: (id: number) => `/courses/${id}`
        }),

        getModule: builder.query({
            query: (id: number) => `/modules/${id}`
        }),

        getTopic: builder.query({
            query: (id: number) => `/topics/${id}`
        }),

        getCourseCategories: builder.query({
            query: ()=> "/courses/categories"
        })
    })
})

export const {
  useGetCoursesQuery,
  useGetCourseQuery,
  useGetModuleQuery,
  useGetTopicQuery,
  useGetCourseCategoriesQuery
} = courseApi