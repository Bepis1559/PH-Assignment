import { ReactElement, useEffect, useState } from "react";
import { Task } from "./Task";
import { GetAndSetToResult } from "../../helpers/GetAndSetToResult";
import text from '../../helpers/propsText.json'
import { AddButton } from "./AddButton";

export const TaskTable = () : ReactElement => {
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() =>{
       GetAndSetToResult(setTasks,text.URL.task)
    },[])

    return(
       <div className="tasksContainer">
        <AddButton
        //  @ts-ignore *
         setEntity={setTasks}
         aria_describedby={text.Task.AddBtn.aria_describedby}
         aria_label={text.Task.AddBtn.aria_label}
         content={text.Task.AddBtn.content}
        />
        <table className="table table-bordered text-light ">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Description</th>
                    <th>Assignee</th>
                    <th>Due date</th>
                    <th>Done</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
              {tasks.map(task =>(
                <Task 
                key={task.id}
                id={task.id}
                title={task.title} 
                description={task.description} 
                assignee={task.assignee} 
                dueDate={task.dueDate}   
                done = {task.done}
                setEntity = {setTasks}             
                />
              ))}
            </tbody>
        </table>
       </div>
    )

}