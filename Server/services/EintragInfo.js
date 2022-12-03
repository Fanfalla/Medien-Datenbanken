const helper = require('../helper.js');
const EintragInfoDao = require('../dao/EintragInfoDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service EintragInfo');

serviceRouter.get('/eintragInfo/gib/:id', function(request, response) {
    console.log('Service EintragInfo: Client requested one record, id=' + request.params.id);

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var obj = eintragInfoDao.loadById(request.params.id);
        console.log('Service EintragInfo: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service EintragInfo: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/eintragInfo/alle', function(request, response) {
    console.log('Service EintragInfo: Client requested all records');

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var arr = eintragInfoDao.loadAll();
        console.log('Service EintragInfo: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service EintragInfo: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/eintragInfo/existiert/:id', function(request, response) {
    console.log('Service EintragInfo: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var exists = eintragInfoDao.exists(request.params.id);
        console.log('Service EintragInfo: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service EintragInfo: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/eintragInfo', function(request, response) {
    console.log('Service EintragInfo: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service EintragInfo: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var obj = eintragInfoDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service EintragInfo: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service EintragInfo: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/eintragInfo', function(request, response) {
    console.log('Service EintragInfo: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service EintragInfo: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var obj = eintragInfoDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service EintragInfo: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service EintragInfo: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/eintragInfo/:id', function(request, response) {
    console.log('Service EintragInfo: Client requested deletion of record, id=' + request.params.id);

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var obj = eintragInfoDao.loadById(request.params.id);
        eintragInfoDao.delete(request.params.id);
        console.log('Service EintragInfo: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service EintragInfo: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
