'use client';
import { addTask, deleteTask, toggleTask } from "@/redux/features/taskSlice";
import { useGetTasksQuery } from "@/redux/taskApi";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Home() {

  const [task, setTask] = useState('');
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all');
  const {
  data,
  isLoading,
  error,
} = useGetTasksQuery('');

  const dispatch = useDispatch()

  const reduxTasks = useSelector(
    (state: any) => state.tasks.tasks
  )
  const tasks = [...(data || []), ...reduxTasks];
  const handleAddTask = () => {
    if (!task.trim()) return;
    dispatch(addTask(task))
    setTask('')
  }

  const filteredTask = tasks.filter((item:any)=>{
    const matchedTask = item.title.toLowerCase().includes(search.toLowerCase())

    if(filter === 'completed'){
      return item.completed && matchedTask
    }
    if(filter === 'pending'){
      return !item.completed && matchedTask
    }
    return matchedTask
  })
  
  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (error) {
  return <h1>Something went wrong</h1>;
}

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-pink-50">
      <h1 className="text-4xl font-bold mb-6">
        TaskFlow
      </h1>
      <div className="flex gap-3 mb-6">
        <input type="text" placeholder="Enter Task" value={task} onChange={(e) => setTask(e.target.value)}
          className="w-80 border p-3 rounded-full" />
        <button onClick={handleAddTask} className="bg-black text-white px-4 py-2 rounded-full">Add Task</button>
      </div>
        <input
          type="text"
          placeholder="Search Task"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 rounded-full w-40 bg-white mb-5"
        />
        <div className="flex gap-3 mb-3">
          <button className="bg-gray-300 px-2 py-1 rounded-full" onClick={()=> setFilter('all')}> All</button>
          <button className="bg-gray-300 px-2 py-1 rounded-full" onClick={()=> setFilter('completed')}> Completed</button>
          <button className="bg-gray-300 px-2 py-1 rounded-full" onClick={()=> setFilter('pending')}> Pending</button>
        </div>

      <div>
        {filteredTask.map((item: any) => (
          <div key={item.id} className="flex items-center gap-3 mb-3">
            <input type="checkbox" checked={item.completed} onChange={() => dispatch(toggleTask(item.id))} />

            <p className={
              item.completed
                ? 'line-through'
                : ''
            }>{item.title}</p>

            <button className="bg-red-400 text-white px-2 rounded" onClick={() => dispatch(deleteTask(item.id))}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
