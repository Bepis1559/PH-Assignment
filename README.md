# PH-Assignment

This project is about setting up employees , tracking their tasks and automatically displaying the five of them who have done the biggest amount of tasks 
for the past month. We can add , delete or edit an employee and the same goes for their tasks . 

Setup guide : 

In the terminal please run the following commands : 

git clone https://github.com/Bepis1559/PH-Assignment.git

cd PH-Assignment (if you are not already there)

cd Employees_Tasks ; 
npm i 
npm run dev 


Then , in a new terminal :

cd server
npm i 
npm run node 


Now , the project should be on http://localhost:5173/ , and the server - http://localhost:5000/employee/ and http://localhost:5000/task/ .

Note that the user can go to http://localhost:5000/employee/1 , http://localhost:5000/employee/2 etc. The routes are created dynamically , so 
the user can check right after he/she added a new employee or a task.
