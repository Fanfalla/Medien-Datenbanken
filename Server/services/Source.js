const helper = require('../helper.js');
const SourceDao = require('../dao/SourceDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Source');

serviceRouter.get('/source/gib/:id', function(request, response) {
    console.log('Service Source: Client requested one record, id=' + request.params.id);

    const sourceDao = new SourceDao(request.app.locals.dbConnection);
    try {
        var obj = sourceDao.loadById(request.params.id);
        console.log('Service Source: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Source: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/source/alle', function(request, response) {
    console.log('Service Source: Client requested all records');

    const sourceDao = new SourceDao(request.app.locals.dbConnection);
    try {
        var arr = sourceDao.loadAll();
        console.log('Service Source: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Source: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/source/existiert/:id', function(request, response) {
    console.log('Service Source: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const sourceDao = new SourceDao(request.app.locals.dbConnection);
    try {
        var exists = sourceDao.exists(request.params.id);
        console.log('Service Source: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Sourcee: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/source', function(request, response) {
    console.log('Service Source: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Source: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const sourceDao = new SourceDao(request.app.locals.dbConnection);
    try {
        var obj = sourceDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Source: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Source: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/source', function(request, response) {
    console.log('Service Source: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Source: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const sourceDao = new SourceDao(request.app.locals.dbConnection);
    try {
        var obj = sourceDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Source: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Source: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/source/:id', function(request, response) {
    console.log('Service Source: Client requested deletion of record, id=' + request.params.id);

    const sourceDao = new SourceDao(request.app.locals.dbConnection);
    try {
        var obj = sourceDao.loadById(request.params.id);
        sourceDao.delete(request.params.id);
        console.log('Service Studio: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Studio: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
