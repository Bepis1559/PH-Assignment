import Express from "express";
export const taskRouter = Express.Router()
let id = 1
let tasks = []





// ====================================
//  get requests 
taskRouter.get('/', (req, res) => {
    res.status(200).send(tasks)
})
taskRouter.get('/:id', (req, res) => {
    const searchedTask = tasks.filter(el => el.id == req.params.id)
    res.status(200).send(searchedTask)
})



// ====================================
//  post requests 

taskRouter.post('/', async (req, res) => {
    try {
        const response = await fetch('http://localhost:5000/employee/');
        const employees = await response.json();

        const taskToPush = {
            id: id,
            title: req.body.title,
            description: req.body.description,
            assignee: req.body.assignee,
            dueDate: req.body.dueDate,
        };

        const assigneeExists = employees.some(employee => {
            return employee.fullName.toLowerCase().includes(req.body.assignee.toLowerCase());
        });

        if (!assigneeExists) {
            res.status(400).send('The assignee does not exist.');
            return;
        }

        id++;
        tasks.push(taskToPush);
        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while trying to add the task.');
    }
});



// ====================================
//  delete requests 

taskRouter.delete('/:id', (req, res) => {
    tasks = tasks.filter(task => task.id != req.params.id)
    if (!tasks.length) id = 1
    res.sendStatus(200)
})

// ====================================
//  put requests 

taskRouter.put('/', async (req, res) => {
    const id = req.body.id;
    const updatedTask = {
        id: id,
        title: req.body.title,
        description: req.body.description,
        assignee: req.body.assignee,
        dueDate: req.body.dueDate,
    };

    try {
        const response = await fetch('http://localhost:5000/employee/');
        const employees = await response.json();

        const assigneeExists = employees.some(employee => {
            return employee.fullName.toLowerCase().includes(req.body.assignee.toLowerCase());
        });

        if (!assigneeExists) {
            res.status(400).send('The assignee does not exist.');
            return;
        }

        const indexOfSearchedTask = tasks?.findIndex(task => task.id == id);
        if (indexOfSearchedTask !== -1) {
            tasks[indexOfSearchedTask] = updatedTask;
        }

        res.sendStatus(200);
    } catch (error) {
        console.log(error);
        res.status(500).send('An error occurred while trying to update the task.');
    }
});

