import Express from "express";
export const employeeRouter = Express.Router()
let id = 1

let employees = [

]


// ====================================
//  get requests 
employeeRouter.get('/', (req, res) => {
    res.status(200).send(employees)
})
employeeRouter.get('/:id', (req, res) => {
    const searchedEmployee = employees.filter(el => el.id == req.params.id)
    res.status(200).send(searchedEmployee)
})



// ====================================
//  post requests 

employeeRouter.post('/', (req, res) => {
    const employeeToPush =
    {
        id: id,
        email: req.body.email,
        fullName: req.body.fullName,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        monthlySalary: req.body.monthlySalary,
    }
    id++
    employees.push(employeeToPush)
    res.sendStatus(200)
})


// ====================================
//  post requests 

employeeRouter.delete('/:id', (req, res) => {
    employees = employees.filter(employee => employee.id != req.params.id)
    if (!employees.length) id = 1
    res.sendStatus(200)
})