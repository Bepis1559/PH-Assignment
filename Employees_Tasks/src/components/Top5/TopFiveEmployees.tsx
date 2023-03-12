import { ReactElement, useEffect, useState } from "react"
import { Employee } from "../Employees/Employee"
import { Task } from "../Tasks/Task"
import text from '../../helpers/propsText.json'

type EmployeeTasks = {
  id: number;
  fullName: string;
  taskCount: number;
}

export const TopFiveEmployees = () : ReactElement =>{
    const [employeeTasks, setEmployeeTasks] = useState<EmployeeTasks[]>([])

    useEffect(() => {


        const today = new Date();
    const lastMonthStartDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
    const lastMonthEndDate = new Date(today.getFullYear(), today.getMonth(), 0);

    
        const getEmployeeTasks = async () => {
            try {
                const employeeResponse = await fetch(text.URL.employee)
                const employeeData: Employee[] = await employeeResponse.json()

                const taskResponse = await fetch(text.URL.task)
                const taskData: Task[] = await taskResponse.json()

               const tasksForLastMonth = taskData.filter(task => {
               const taskDueDate = new Date(task.dueDate) 
               return taskDueDate >= lastMonthStartDate && taskDueDate <= lastMonthEndDate
               })

                
                //@ts-ignore
                const employeeTaskCounts: EmployeeTasks[] = employeeData.map(employee => {
                    const tasksDoneInLastThirtyDays = tasksForLastMonth.filter(task => 
                        employee.fullName.toLowerCase().trim().includes(task.assignee.toLowerCase().trim()) && task.done).length

                    return {
                        id: employee.id,
                        fullName: employee.fullName,
                        taskCount: tasksDoneInLastThirtyDays,
                    }
                })

                const sortedEmployeeTaskCounts = employeeTaskCounts.sort((a, b) => b.taskCount - a.taskCount)

                setEmployeeTasks(sortedEmployeeTaskCounts.slice(0, 5))
            } catch (error) {
                console.log(error)
            }
        }

        getEmployeeTasks()
    }, [])

    return(
        <div className="container margin-block-start-10r">
            <p className="h1 text-light m-5 text-center">The 5 employees with most tasks done in the last 30 days:</p>
            {employeeTasks.length > 0 ? 
            <table className="table table-bordered text-light">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Full name</th>
                    <th>Tasks done for the past month</th>
                </tr>
            </thead>
            <tbody>
                {employeeTasks.map(employeeTask => {
                   return employeeTask.taskCount > 0 ?
                    <tr key={employeeTask.id}>
                        <td>{employeeTask.id}</td>
                        <td>{employeeTask.fullName}</td>
                        <td>{employeeTask.taskCount}</td>
                    </tr>
                    : null
                } 
                )}
            </tbody>
        </table>
            : <p className=" text-bg-danger text-center  h1">The are no top 5 employees</p>
        }
            
        </div>
    )
}
