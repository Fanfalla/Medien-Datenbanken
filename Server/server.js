/////////////////
// workaround / bugfix for linux systems
Object.fromEntries = l => l.reduce((a, [k,v]) => ({...a, [k]: v}), {})
/////////////////

const helper = require('./helper.js');
const fileHelper = require('./fileHelper.js');
console.log('Starting server...');

try {
    // connect database
    console.log('Connect database...');
    const Database = require('better-sqlite3');
    const dbOptions = { verbose: console.log };
    const dbFile = './Datenbank/Datenbank';
    const dbConnection = new Database(dbFile, dbOptions);

    // create server
    const HTTP_PORT = 8000;
    const express = require('express');
    const fileUpload = require('express-fileupload');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const morgan = require('morgan');
    const _ = require('lodash');

    console.log('Creating and configuring Web Server...');
    const app = express();
    
    // provide service router with database connection / store the database connection in global server environment
    app.locals.dbConnection = dbConnection;

    console.log('Binding middleware...');
    app.use(express.static(__dirname + '/public'))
    app.use(fileUpload({
        createParentPath: true,
        limits: {
            fileSize: 2 * 1024 * 1024 * 1024        // limit to 2MB
        }
    }));
    app.use(cors());
    app.use(bodyParser.urlencoded({ extended: true}));
    app.use(bodyParser.json());
    app.use(function(request, response, next) {
        response.setHeader('Access-Control-Allow-Origin', '*'); 
        response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
        response.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
        next();
    });
    app.use(morgan('dev'));

    // binding endpoints
    const TOPLEVELPATH = '/api';
    console.log('Binding enpoints, top level Path at ' + TOPLEVELPATH);

    var serviceRouter = require('./services/Account.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Anime.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/AnimeEintragGenre.js');
    app.use(TOPLEVELPATH, serviceRouter);
    
    serviceRouter = require('./services/AnimeListe.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/EintragInfo.js');
    app.use(TOPLEVELPATH, serviceRouter);
    
    serviceRouter = require('./services/Format.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Genre.js');
    app.use(TOPLEVELPATH, serviceRouter);
    
    serviceRouter = require('./services/Jahr.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Manga.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/MangaGenre.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/MangaListe.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Season.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Sicherheitsfrage.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Source.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Status.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Studio.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/ListStatus.js');
    app.use(TOPLEVELPATH, serviceRouter);

    serviceRouter = require('./services/Fillter.js');
    app.use(TOPLEVELPATH, serviceRouter);

    // send default error message if no matching endpoint found
    app.use(function (request, response) {
        console.log('Error occured, 404, resource not found');
        response.status(404).json({'fehler': true, 'nachricht': 'Resource nicht gefunden'});
    });


    // starting the Web Server
    console.log('\nBinding Port and starting Webserver...');

    var webServer = app.listen(HTTP_PORT, () => {
        console.log('Listening at localhost, port ' + HTTP_PORT);
        console.log('\nUsage: http://localhost:' + HTTP_PORT + TOPLEVELPATH + "/SERVICENAME/SERVICEMETHOD/....");
        console.log('\n\n-----------------------------------------');
        console.log('exit / stop Server by pressing 2 x CTRL-C');
        console.log('-----------------------------------------\n\n');
    });

} catch (ex) {
    console.error(ex);
}
