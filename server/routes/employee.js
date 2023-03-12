import Express from "express";
export const employeeRouter = Express.Router()
let id = 1

let employees = []




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


employeeRouter.delete('/:id', async (req, res) => {
    const employeeId = parseInt(req.params.id);

    try {
        const response = await fetch('http://localhost:5000/task');
        const tasks = await response.json();

        let hasTaskAssigned = false;
        tasks?.forEach(task => {
            if (task.assignee.toLowerCase().trim().includes(employees[employeeId - 1].fullName.toLowerCase().trim())) {
                hasTaskAssigned = true;
            }
        });

        if (hasTaskAssigned) {
            res.status(500).send('You cannot delete an employee while they still have a task assigned to them.');
        } else {
            employees = employees.filter(employee => employee.id !== employeeId);
            if (!employees.length) id = 1;
            res.sendStatus(200);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while trying to delete the employee.');
    }
});


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

    const indexOfSearchedEmployee = employees?.findIndex(employee => employee.id == id)
    if (indexOfSearchedEmployee !== -1) {
        employees[indexOfSearchedEmployee] = updatedEmployee
    }

    res.sendStatus(200)
})

