const helper = require('../helper.js');
const AnimeListeDao = require('../dao/AnimeListeDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service AnimeListe');

serviceRouter.get('/animeListe/gib/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested one record, id=' + request.params.id);

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var obj = animeListeDao.loadById(request.params.id);
        console.log('Service AnimeListe: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/alle', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var arr = animeListeDao.loadAll();
        console.log('Service animeListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/existiert/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var exists = animeListeDao.exists(request.params.id);
        console.log('Service AnimeListe: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service AnimeListe: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/animeListe', function(request, response) {
    console.log('Service AnimeListe: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service AnimeListe: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var obj = animeListeDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service AnimeListe: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeListe: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/animeListe', function(request, response) {
    console.log('Service AnimeListe: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service AnimeListe: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var obj = animeListeDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service AnimeListe: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeListe: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/animeListe/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested deletion of record, id=' + request.params.id);

    const animeListDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var obj = animeListeDao.loadById(request.params.id);
        animeListeDao.delete(request.params.id);
        console.log('Service AnimeListe: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service AnimeListe: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
