const helper = require('../helper.js');
const SicherheitsfrageDao = require('../dao/SicherheitsfrageDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Sicherheitsfrage');

serviceRouter.get('/sicherheitsfrage/gib/:id', function(request, response) {
    console.log('Service Sicherheitsfrage: Client requested one record, id=' + request.params.id);

    const sicherheitsfrageDao = new SicherheitsfrageDao(request.app.locals.dbConnection);
    try {
        var obj = sicherheitsfrageDao.loadById(request.params.id);
        console.log('Service Sicherheitsfrage: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Sicherheitsfrage: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/sicherheitsfrage/alle', function(request, response) {
    console.log('Service Sicherheitsfrage: Client requested all records');

    const sicherheitsfrageDao = new SicherheitsfrageDao(request.app.locals.dbConnection);
    try {
        var arr = sicherheitsfrageDao.loadAll();
        console.log('Service Sicherheitsfrage: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Sicherheitsfrage: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/sicherheitsfrage/existiert/:id', function(request, response) {
    console.log('Service Sicherheitsfrage: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const sicherheitsfrageDao = new SicherheitsfrageDao(request.app.locals.dbConnection);
    try {
        var exists = sicherheitsfrageDao.exists(request.params.id);
        console.log('Service Sicherheitsfrage: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Sicherheitsfrage: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/sicherheitsfrage', function(request, response) {
    console.log('Service Sicherheitsfrage: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Sicherheitsfrage: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const sicherheitsfrageDao = new SicherheitsfrageDao(request.app.locals.dbConnection);
    try {
        var obj = sicherheitsfrageDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Sicherheitsfrage: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Sicherheitsfrage: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/sicherheitsfrage', function(request, response) {
    console.log('Service Sicherheitsfrage: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Sicherheitsfrage: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const sicherheitsfrageDao = new SicherheitsfrageDao(request.app.locals.dbConnection);
    try {
        var obj = sicherheitsfrageDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Sicherheitsfrage: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Sicherheitsfrage: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/sicherheitsfrage/:id', function(request, response) {
    console.log('Service Sicherheitsfrage: Client requested deletion of record, id=' + request.params.id);

    const sicherheitsfrageDao = new SicherheitsfrageDao(request.app.locals.dbConnection);
    try {
        var obj = sicherheitsfrageDao.loadById(request.params.id);
        sicherheitsfrageDao.delete(request.params.id);
        console.log('Service Sicherheitsfrage: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Sicherheitsfrage: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
