const helper = require('../helper.js');
const AnimeDao = require('../dao/AnimeDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Anime');

serviceRouter.get('/anime/gib/:id', function(request, response) {
    console.log('Service Anime: Client requested one record, id=' + request.params.id);

    const animeDao = new AnimeDao(request.app.locals.dbConnection);
    try {
        var obj = animeDao.loadById(request.params.id);
        console.log('Service Anime: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anime: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/anime/alle', function(request, response) {
    console.log('Service Anime: Client requested all records');

    const animeDao = new AnimeDao(request.app.locals.dbConnection);
    try {
        var arr = animeDao.loadAll();
        console.log('Service Anime: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Anime: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/anime/existiert/:id', function(request, response) {
    console.log('Service Anime: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const animeDao = new AnimeDao(request.app.locals.dbConnection);
    try {
        var exists = animeDao.exists(request.params.id);
        console.log('Service Anime: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Anime: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/anime', function(request, response) {
    console.log('Service Anime: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Anime: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const animeDao = new AnimeDao(request.app.locals.dbConnection);
    try {
        var obj = animeDao.create(request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Anime: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anime: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/anime', function(request, response) {
    console.log('Service Anime: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Anime: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const animeDao = new AnimeDao(request.app.locals.dbConnection);
    try {
        var obj = animeDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Anime: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Anime: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/anime/:id', function(request, response) {
    console.log('Service Anime: Client requested deletion of record, id=' + request.params.id);

    const animeDao = new AnimeDao(request.app.locals.dbConnection);
    try {
        var obj = animeDao.loadById(request.params.id);
        animeDao.delete(request.params.id);
        console.log('Service Anime: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Anime: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
