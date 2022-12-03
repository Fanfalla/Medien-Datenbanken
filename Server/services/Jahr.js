const helper = require('../helper.js');
const JahrDao = require('../dao/JahrDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Jahr');

serviceRouter.get('/jahr/gib/:id', function(request, response) {
    console.log('Service Jahr: Client requested one record, id=' + request.params.id);

    const jahrDao = new JahrDao(request.app.locals.dbConnection);
    try {
        var obj = jahrDao.loadById(request.params.id);
        console.log('Service Jahr: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Jahr: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/jahr/alle', function(request, response) {
    console.log('Service Jahr: Client requested all records');

    const jahrDao = new JahrDao(request.app.locals.dbConnection);
    try {
        var arr = jahrDao.loadAll();
        console.log('Service Jahr: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Jahr: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/jahr/existiert/:id', function(request, response) {
    console.log('Service Jahr: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const jahrDao = new JahrDao(request.app.locals.dbConnection);
    try {
        var exists = jahrDao.exists(request.params.id);
        console.log('Service Jahr: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Jahr: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/jahr', function(request, response) {
    console.log('Service Jahr: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Jahr: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const jahrDao = new JahrDao(request.app.locals.dbConnection);
    try {
        var obj = jahrDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Jahr: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Jahr: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/jahr', function(request, response) {
    console.log('Service Jahr: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Jahr: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const jahrDao = new JahrDao(request.app.locals.dbConnection);
    try {
        var obj = jahrDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Jahr: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Jahr: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/jahr/:id', function(request, response) {
    console.log('Service Jahr: Client requested deletion of record, id=' + request.params.id);

    const jahrDao = new JahrDao(request.app.locals.dbConnection);
    try {
        var obj = jahrDao.loadById(request.params.id);
        jahrDao.delete(request.params.id);
        console.log('Service Jahr: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Jahr: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
