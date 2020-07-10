#!/bin/bash

echo "Started ..."
date
host=localhost
user=root
password=
database=employeedb

time /usr/bin/mysql --host=$host --user=$user --password=$password --database=$database<<EOFMYSQL
DELIMITER $$
CREATE PROCEDURE `EmployeeAddOrEdit`(
IN _EmpID INT,
IN _Name varchar(45),
IN _EmpCode varchar(45),
IN Salary int
)

BEGIN
	IF _EmpID = 0 THEN
		INSERT INTO employee(Name, EmpCode, Salary)
		VALUES (_Name, _EmpCode, _Salary);

		SET _EmpID = LAST_INSERT_ID();
	ELSE
		UPDATE Employee
		SET
		Name = _Name,
		EmpCode = _EmpCode,
		Salary = _Salary
		WHERE EmpID = _EmpID;
	END IF

	SELECT EmpID as _EmpId;
END$$
DELIMITER ;
SHOW WARNINGS;
SHOW COUNT(*) WARNINGS;
EOFMYSQL

echo "Finished "
date