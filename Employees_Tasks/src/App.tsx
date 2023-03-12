import { ReactElement } from 'react'
import { EmployeeTable } from './components/Employees/EmployeeTable'
import {TaskTable} from './components/Tasks/TaskTable'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import { TopFiveEmployees } from './components/Top5/TopFiveEmployees'


export const App = () : ReactElement =>{

  return (
    <div className='container '>
      <EmployeeTable />
      <TaskTable/>
      <TopFiveEmployees/>
    </div>
  )
}
