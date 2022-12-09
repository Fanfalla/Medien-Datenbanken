const helper = require('../helper.js');
const FormatDao = require('../dao/FormatDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Format');

serviceRouter.get('/format/gib/:id', function(request, response) {
    console.log('Service Format: Client requested one record, id=' + request.params.id);

    const formatDao = new FormatDao(request.app.locals.dbConnection);
    try {
        var obj = formatDao.loadById(request.params.id);
        console.log('Service Format: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Format: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/format/alle', function(request, response) {
    console.log('Service Format: Client requested all records');

    const formatDao = new FormatDao(request.app.locals.dbConnection);
    try {
        var arr = formatDao.loadAll();
        console.log('Service Format: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Format: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/format/existiert/:id', function(request, response) {
    console.log('Service Format: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const formatDao = new FormatDao(request.app.locals.dbConnection);
    try {
        var exists = formatDao.exists(request.params.id);
        console.log('Service Format: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Format: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/format', function(request, response) {
    console.log('Service Format: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Format: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const formatDao = new FormatDao(request.app.locals.dbConnection);
    try {
        var obj = formatDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Format: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Format: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/format', function(request, response) {
    console.log('Service Farmot: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Format: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const formatDao = new FormatDao(request.app.locals.dbConnection);
    try {
        var obj = formatDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Format: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Format: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/format/:id', function(request, response) {
    console.log('Service Format: Client requested deletion of record, id=' + request.params.id);

    const formatDao = new FormatDao(request.app.locals.dbConnection);
    try {
        var obj = formatDao.loadById(request.params.id);
        formatDao.delete(request.params.id);
        console.log('Service Format: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Format: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
