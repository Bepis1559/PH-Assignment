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
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        monthlySalary: req.body.monthlySalary,
    }
    id++
    employees.push(employeeToPush)
    res.sendStatus(200)
})


// ====================================
//  delete requests 

employeeRouter.delete('/:id', (req, res) => {
    employees = employees.filter(employee => employee.id != req.params.id)
    if (!employees.length) id = 1
    res.sendStatus(200)
})

// ====================================
//  put requests 

employeeRouter.put('/', (req, res) => {
    const id = req.body.id
    const updatedEmployee = {
        id: id,
        fullName: req.body.fullName,
        email: req.body.email,
        phoneNumber: req.body.phoneNumber,
        dateOfBirth: req.body.dateOfBirth,
        monthlySalary: req.body.monthlySalary,
    }

    const idnexOfSearchedEmployee = employees?.findIndex(employee => employee.id == id)
    if (idnexOfSearchedEmployee !== -1) {
        employees[idnexOfSearchedEmployee] = updatedEmployee
    }

    res.sendStatus(200)
})

