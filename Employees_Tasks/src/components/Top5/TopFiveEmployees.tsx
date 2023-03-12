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
        const getEmployeeTasks = async () => {
            try {
                const employeeResponse = await fetch(text.URL.employee)
                const employeeData: Employee[] = await employeeResponse.json()

                const taskResponse = await fetch(text.URL.task)
                const taskData: Task[] = await taskResponse.json()


                // Map employee data to an object with task count
                // @ts-ignore
                const employeeTaskCounts: EmployeeTasks[] = employeeData.map(employee => ({
                    id: employee.id,
                    fullName: employee.fullName,
                    taskCount: taskData.filter(task => employee.fullName.toLowerCase().trim().includes(task.assignee.toLowerCase().trim()) && task.done).length,
                }))


                const sortedEmployeeTaskCounts = employeeTaskCounts.sort((a, b) => b.taskCount - a.taskCount)

                // Set state with top 5 employees with most tasks done
                setEmployeeTasks(sortedEmployeeTaskCounts.slice(0, 5))
            } catch (error) {
                console.log(error)
            }
        }

        getEmployeeTasks()
    }, [])

    return(
        <div className="container margin-block-start-10r">
            <p className="h1 text-light m-5 text-center">The 5 employees with most tasks done:</p>
            <table className="table table-bordered text-light">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Full name</th>
                        <th>Tasks done for the past month</th>
                    </tr>
                </thead>
                <tbody>
                    {employeeTasks.map(employeeTask => (
                        <tr key={employeeTask.id}>
                            <td>{employeeTask.id}</td>
                            <td>{employeeTask.fullName}</td>
                            <td>{employeeTask.taskCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
