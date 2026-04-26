import { CourseMinimal } from "@/types/course"
import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react"


export const courseApi = createApi({
    reducerPath: "courseApi",
    baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
    refetchOnFocus: true,
    refetchOnReconnect: true,
    endpoints: (builder) => ({
        getCourses: builder.query<{ data: CourseMinimal[] }, void>({
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

        getCourseCategories: builder.query<{ data: { category: string }[] }, void>({
            query: () => "/courses/categories"
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