NOTE: These instructions assume a Windows environment is being used, and that nodejs and react are installed.

To run this project locally:

Step 1: Create a MySQL database named 'expenses' using the expensedb.sql file. If you have MySQL installed, this can be done by using the command prompt to the location with the .sql file and using the command "mysql -u (username) -p expenses < expensesdb.sql".
Step 2: Ensure that you are hosting an instance of MySQL. If you're currently using ports 3000 or 3001 to do so, bear in mind that you will have to change some of the default ports for the webpages to avoid conflict.
Step 3: Start hosting the backend, located within the "back" directory. First, if you are using a password other than 'root' for MySQL or if you have a password, you will have to update line 5 of 'tracker.js'. Change the 'user' property or add a 'password' property as needed.
	Additionally, if port 3001 is unavailable to you, you will have to change it to another value on line 15 of 'bin/www' and line 4 of "app.js". Avoid using 3000, as that's the default port value of the front-end.
	Afterwards, you can compile the backend. Using the command prompt in the "back" directory, use the command "node app.js" to begin hosting the backend.
Step 4: Start hosting the frontend, located within the "front". If you updated the backend port, you will have to change the URL variable located on line 5 of "App.js" to match.
	Additionally, if port 3000 is unavailable to you, you will have to change it to another value in the 'package.json' file. Change the "start" section on line 16 from "react-scripts start" to "set PORT=5000 && react-scripts start", where 5000 can be any desired port
	You are now ready to compile the front end using the command prompt in the "front" directory. Use the command "npm start" there to begin hosting on the chosen port.

Now that the MySQL database, backend, and frontend are being hosted, you should be able to navigate to the localhost address where the front end is hosted and begin
tracking expenses.