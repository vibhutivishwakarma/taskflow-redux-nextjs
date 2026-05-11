import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./features/taskSlice";
import { taskApi } from "./taskApi";

export const store = configureStore({
    reducer:{
        tasks: taskSlice,
        [taskApi.reducerPath] : taskApi.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(taskApi.middleware)
    
});


