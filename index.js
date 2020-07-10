const mysql =require('mysql');
const express =require('express');
var app = express();
const bodyparser =require('body-parser');

app.use(bodyparser.json());

var mysqlConnection =mysql.createConnection({
	host: 'localhost',
	user : 'root',
	password: '',
	database: 'employeedb',
	multipleStatements: true
});


mysqlConnection.connect((err) => {
	if (!err)
		console.log('DB connection succeded.');
	else
		console.log('DB Connection failed \n Error :' + JSON.stringify(err, undefined, 2));
});


app.listen(3000, ()=>console.log('Express server is running at port no: 3000'));

//Get all employees
app.get('/employees',(req,res) => {
	mysqlConnection.query('SELECT * FROM employee',(err,rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

//Get an employee
app.get('/employees/:id',(req,res) => {
	mysqlConnection.query('SELECT * FROM employee WHERE EmpID = ?',[req.params.id],(err,rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

//Delete an employee
app.delete('/employees/:id',(req,res) => {
	mysqlConnection.query('DELETE FROM employee WHERE EmpID = ?',[req.params.id],(err,rows, fields)=>{
		if(!err)
			res.send('Deleted Successfully');
		else
			console.log(err);
	})
});

//Insert an employee
app.post('/employees',(req,res) => {
	let emp =req.body;
	var sql ="SET @EmpID = ?; SET @Name =?; SET @EmpCode =?; SET @Salary =?;CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary); "; 
	mysqlConnection.query(sql,[emp.EmpID, emp.Name, emp.EmpCode, emp.Salary],(err,rows, fields)=>{
		if(!err)
			res.send(rows);
		else
			console.log(err);
	})
});

//Update an employees
app.put('/employees', (req, res) => {
    let emp = req.body;
    var sql = "SET @EmpID = ?;SET @Name = ?;SET @EmpCode = ?;SET @Salary = ?; \
    CALL EmployeeAddOrEdit(@EmpID,@Name,@EmpCode,@Salary);";
    mysqlConnection.query(sql, [emp.EmpID, emp.Name, emp.EmpCode, emp.Salary], (err, rows, fields) => {
        if (!err)
            res.send('Updated successfully');
        else
            console.log(err);
    })
});