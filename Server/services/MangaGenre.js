const helper = require('../helper.js');
const MangaGenreDao = require('../dao/MangaGenreDao.js');
const MangaDao = require('../dao/MangaDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service MangaGenre');

serviceRouter.get('/mangaGenre/gib/:id', function(request, response) {
    console.log('Service MangaGenre: Client requested one record, id=' + request.params.id);

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    try {
        var obj = mangaGenreDao.loadById(request.params.id);
        console.log('Service MangaGenre: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service MangaGenre: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaGenre/alle', function(request, response) {
    console.log('Service MangaGenre: Client requested all records');

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    try {
        var arr = mangaGenreDao.loadAll();
        console.log('Service MangaGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service MangaGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/MangaGenre/MangaGenre/:id', function(request, response) {
    console.log('Service MangaGenre: Client requested the records');

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    try {
        var arr = mangaGenreDao.loadManga(request.params.id);
        console.log('Service MangaGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service MangaGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/MangaGenre/SortGenre/:id', function(request, response) {
    console.log('Service MangaGenre: Client requested the records');

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    try {
        var arr = mangaGenreDao.loadGenre(request.params.id);
        console.log('Service MangaGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service MangaGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaGenre/existiert/:id', function(request, response) {
    console.log('Service MangaGenre: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    try {
        var exists = mangaGenreDao.exists(request.params.id);
        console.log('Service MangaGenre: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service MangaGenre: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaGenre/mangaGenre/:id', function(request, response) {
    console.log('Service MangaGenre: Client requested the records');

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    try {
        var arr = mangaGenreDao.loadManga(request.params.id);
        console.log('Service MangaGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service MangaGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/mangaGenre/add', function(request, response) {
    console.log('Service MangaGenre: Client requested creation of new record');
    const mangaDao = new MangaDao(request.app.locals.dbConnection);

    var errorMsgs=[];
    if (helper.isUndefined(request.body.Genre)) 
        errorMsgs.push('Genre fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service MangaGenre: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    latestMangaID = parseInt(mangaDao.latestID());
    try {
        for(var i = 0; i < request.body.Genre.length; i++){
            var obj = mangaGenreDao.create(latestMangaID, request.body.Genre[i]);
        }
        console.log('Service MangaGenre: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service MangaGenre: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/mangaGenre', function(request, response) {
    console.log('Service MangaGenre: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service MangaGenre: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    try {
        var obj = mangaGenreDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service MangaGenre: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service MangaGenre: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/mangaGenre/:id', function(request, response) {
    console.log('Service MangaGenre: Client requested deletion of record, id=' + request.params.id);

    const mangaGenreDao = new MangaGenreDao(request.app.locals.dbConnection);
    try {
        var obj = mangaGenreDao.loadById(request.params.id);
        mangaGenreDao.delete(request.params.id);
        console.log('Service MangaGenre: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service MangaGenre: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
