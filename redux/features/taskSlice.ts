import { createSlice } from "@reduxjs/toolkit"

type Task = {
  id: number;
  title: string;
  completed: boolean;
};

type InitialState = {
  tasks: Task[];
};

const initialState: InitialState = {
  tasks: [],
};

const taskSlice = createSlice({
    name: 'task',
    initialState,
    reducers : {
        addTask:(state, action) =>{
            state.tasks.push({
                id: Date.now(),
                title: action.payload,
                completed:false
            });
        },
        deleteTask:(state,action)=>{
            state.tasks = state.tasks.filter((t)=>{
                return t.id !== action.payload
            })
        },

        toggleTask:(state,action)=>{
            const task = state.tasks.find((t)=>
                t.id === action.payload
            )
            if(task){
                task.completed = !task.completed
            }
        }
    }
    
})

export const {
  addTask,
  deleteTask,
  toggleTask,
} = taskSlice.actions;

export default taskSlice.reducer;