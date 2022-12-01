const helper = require('../helper.js');
const GenreDao = require('../dao/GenreDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Genre');

serviceRouter.get('/genre/gib/:id', function(request, response) {
    console.log('Service Genre: Client requested one record, id=' + request.params.id);

    const genreDao = new GenreDao(request.app.locals.dbConnection);
    try {
        var obj = genreDao.loadById(request.params.id);
        console.log('Service Genre: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Genre: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/genre/alle', function(request, response) {
    console.log('Service Genre: Client requested all records');

    const genreDao = new GenreDao(request.app.locals.dbConnection);
    try {
        var arr = genreDao.loadAll();
        console.log('Service Genre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Genre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/genre/existiert/:id', function(request, response) {
    console.log('Service Genre: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const genreDao = new GenreDao(request.app.locals.dbConnection);
    try {
        var exists = genreDao.exists(request.params.id);
        console.log('Service Genre: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Genre: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/genre', function(request, response) {
    console.log('Service Genre: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Genre: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const genreDao = new GenreDao(request.app.locals.dbConnection);
    try {
        var obj = genreDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Genre: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Genre: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/genre', function(request, response) {
    console.log('Service Genre: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Genre: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const genreDao = new GenreDao(request.app.locals.dbConnection);
    try {
        var obj = genreDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Genre: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Genre: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/genre/:id', function(request, response) {
    console.log('Service Genre: Client requested deletion of record, id=' + request.params.id);

    const genreDao = new GenreDao(request.app.locals.dbConnection);
    try {
        var obj = genreDao.loadById(request.params.id);
        genreDao.delete(request.params.id);
        console.log('Service Genre: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Genre: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
