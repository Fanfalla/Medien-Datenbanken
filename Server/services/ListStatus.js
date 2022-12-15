const helper = require('../helper.js');
const ListStatusDao = require('../dao/ListStatusDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service ListStatus');

serviceRouter.get('/listStatus/gib/:id', function(request, response) {
    console.log('Service ListStatus: Client requested one record, id=' + request.params.id);

    const listSTatusDao = new ListStatusDao(request.app.locals.dbConnection);
    try {
        var obj = ListStatusDao.loadById(request.params.id);
        console.log('Service ListStatus: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service ListStatus: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/listStatus/alle/Anime', function(request, response) {
    console.log('Service ListStatus: Client requested all records');

    const listStatusDao = new ListStatusDao(request.app.locals.dbConnection);
    try {
        var arr = listStatusDao.loadAllAnime();
        console.log('Service ListStatus: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service ListStatus: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/listStatus/alle/Manga', function(request, response) {
    console.log('Service ListStatus: Client requested all records');

    const listStatusDao = new ListStatusDao(request.app.locals.dbConnection);
    try {
        var arr = listStatusDao.loadAllManga();
        console.log('Service ListStatus: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service ListStatus: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/listStatus/existiert/:id', function(request, response) {
    console.log('Service ListStatus: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const listStatusDao = new ListStatusDao(request.app.locals.dbConnection);
    try {
        var exists = listStatusDao.exists(request.params.id);
        console.log('Service ListStatus: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service ListStatus: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/listStatus', function(request, response) {
    console.log('Service ListStatus: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service ListStatus: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const listStatusDao = new ListStatusDao(request.app.locals.dbConnection);
    try {
        var obj = listStatusDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service ListStatus: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service ListStatus: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/listStatus', function(request, response) {
    console.log('Service ListStatus: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service ListStatus: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const listStatusDao = new ListStatusDao(request.app.locals.dbConnection);
    try {
        var obj = listStatusDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service ListStatus: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service ListStatus: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/listStatus/:id', function(request, response) {
    console.log('Service ListStatus: Client requested deletion of record, id=' + request.params.id);

    const listStatusDao = new ListStatusDao(request.app.locals.dbConnection);
    try {
        var obj = listStatusDao.loadById(request.params.id);
        listStatusDao.delete(request.params.id);
        console.log('Service ListStatus: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service ListStatus: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
