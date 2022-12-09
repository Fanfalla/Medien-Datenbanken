const helper = require('../helper.js');
const SeasonDao = require('../dao/SeasonDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Season');

serviceRouter.get('/season/gib/:id', function(request, response) {
    console.log('Service Season: Client requested one record, id=' + request.params.id);

    const SeasonDao = new SeasonDao(request.app.locals.dbConnection);
    try {
        var obj = SeasonDao.loadById(request.params.id);
        console.log('Service Season: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Season: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/season/alle', function(request, response) {
    console.log('Service Season: Client requested all records');

    const seasonDao = new SeasonDao(request.app.locals.dbConnection);
    try {
        var arr = seasonDao.loadAll();
        console.log('Service Season: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Season: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/season/existiert/:id', function(request, response) {
    console.log('Service Season: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const seasonDao = new SeasonDao(request.app.locals.dbConnection);
    try {
        var exists = seasonDao.exists(request.params.id);
        console.log('Service Season: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Season: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/season', function(request, response) {
    console.log('Service Season: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Season: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const seasonDao = new SeasonDao(request.app.locals.dbConnection);
    try {
        var obj = seasonDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Season: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Season: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/season', function(request, response) {
    console.log('Service Season: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Season: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const seasonDao = new SeasonDao(request.app.locals.dbConnection);
    try {
        var obj = seasonDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Season: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Season: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/season/:id', function(request, response) {
    console.log('Service Season: Client requested deletion of record, id=' + request.params.id);

    const seasonDao = new SeasonDao(request.app.locals.dbConnection);
    try {
        var obj = seasonDao.loadById(request.params.id);
        seasonDao.delete(request.params.id);
        console.log('Service Season: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Season: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
