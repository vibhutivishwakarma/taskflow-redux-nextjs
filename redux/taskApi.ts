import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const taskApi = createApi({
    reducerPath: 'taskApi',
    baseQuery: fetchBaseQuery({
        baseUrl:'https://jsonplaceholder.typicode.com/',
    }),
    endpoints:(builder) =>({
        getTasks: builder.query({
            query:()=> 'todos?_limit=5',
        })
    })
})

export const {
    useGetTasksQuery,
} = taskApi