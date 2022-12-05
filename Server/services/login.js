
const dbOptions = { verbose: console.log };
const dbFile ="../Datenbank/Datenbank";
const express = require('express');
const session = require('express-session');
const path = require('path');
const app = express();
var serviceRouter = express.Router();
const sqlite3 = require('sqlite3').verbose();

// open the database
let db = new sqlite3.Database('../Datenbank/Datenbank', sqlite3.OPEN_READWRITE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Willkommen in der Strohhutbande Datenbank');
});


app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'static')));

// http://localhost:3000/
app.get('/', function(request, response) {
	// Render login template
	response.sendFile(path.join(__dirname + '../../../Login.html'));
});

// http://localhost:3000/auth
app.post('/auth', function(request, response) {
	// Capture the input fields
	let benutzername = request.body.benutzername;
	let passwort = request.body.passwort;
	// Ensure the input fields exists and are not empty
    if (benutzername && passwort) {
        db.serialize(() => {
            db.each('SELECT * FROM Account WHERE benutzername = ? AND passwort = ?', [benutzername, passwort], function(error, results, fields) {
                // If there is an issue with the query, output the error
                if (error) throw error;
                // If the account exists
                if (results.length > 0) {
                    // Authenticate the user
                    request.session.loggedin = true;
                    request.session.benutzername = benutzername;
                    // Redirect to home page
                    response.sendFile(path.resolve('../../../Profil.html'));
                } else {
                    response.send('Incorrect Username and/or Password!');
                }			
                response.end();
            });
        });
    }
    else {
		response.send('Please enter Username and Password!');
		response.end();
    }
});
	

// http://localhost:3000/home
app.get('../../../Profil', function(request, response) {
	// If the user is loggedin
	if (request.session.loggedin) {
		// Output username
		response.send('Welcome back, ' + request.session.benutzername + '!');
	} else {
		// Not logged in
		response.send('Please login to view this page!');
	}
	response.end();
});

app.listen(3000);


