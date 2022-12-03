const helper = require('../helper.js');
const StatusDao = require('../dao/StatusDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Status');

serviceRouter.get('/status/gib/:id', function(request, response) {
    console.log('Service Status: Client requested one record, id=' + request.params.id);

    const statusDao = new StatusDao(request.app.locals.dbConnection);
    try {
        var obj = statusDao.loadById(request.params.id);
        console.log('Service Status: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Status: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/status/alle', function(request, response) {
    console.log('Service Status: Client requested all records');

    const statusDao = new StatusDao(request.app.locals.dbConnection);
    try {
        var arr = statusDao.loadAll();
        console.log('Service Status: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Status: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/status/existiert/:id', function(request, response) {
    console.log('Service Status: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const statusDao = new StatusDao(request.app.locals.dbConnection);
    try {
        var exists = statusDao.exists(request.params.id);
        console.log('Service Status: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Status: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/status', function(request, response) {
    console.log('Service Status: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Status: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const statusDao = new StatusDao(request.app.locals.dbConnection);
    try {
        var obj = statusDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Status: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Status: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/status', function(request, response) {
    console.log('Service Status: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Status: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const statusDao = new StatusDao(request.app.locals.dbConnection);
    try {
        var obj = statusDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Status: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Status: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/status/:id', function(request, response) {
    console.log('Service Status: Client requested deletion of record, id=' + request.params.id);

    const statusDao = new StatusDao(request.app.locals.dbConnection);
    try {
        var obj = statusDao.loadById(request.params.id);
        statusDao.delete(request.params.id);
        console.log('Service Status: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Status: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
