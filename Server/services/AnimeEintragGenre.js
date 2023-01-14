const helper = require('../helper.js');
const AnimeEintragGenreDao = require('../dao/AnimeEintragGenreDao.js');
const AnimeDao = require('../dao/AnimeDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service AnimeEintragGenre');

serviceRouter.get('/animeEintragGenre/gib/:id', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested one record, id=' + request.params.id);

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    try {
        var obj = animeEintragGenreDao.loadById(request.params.id);
        console.log('Service AnimeEintragGenre: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeEintragGenre/alle', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested all records');

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    try {
        var arr = animeEintragGenreDao.loadAll();
        console.log('Service AnimeEintragGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeEintragGenre/animeGenre/:id', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested the records');

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    try {
        var arr = animeEintragGenreDao.loadAnime(request.params.id);
        console.log('Service AnimeEintragGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeEintragGenre/SortGenre/:id', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested the records');

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    try {
        var arr = animeEintragGenreDao.loadGenre(request.params.id);
        console.log('Service AnimeEintragGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeEintragGenre/existiert/:id', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    try {
        var exists = animeEintragGenreDao.exists(request.params.id);
        console.log('Service AnimeEintragGenre: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/animeEintragGenre/add', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested creation of new record');
    const animeDao = new AnimeDao(request.app.locals.dbConnection);

    var errorMsgs=[];
    if (helper.isUndefined(request.body.Genre)) 
        errorMsgs.push('genre fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service AnimeEintragGenre: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    latestAnimeID = parseInt(animeDao.latestID());
    console.log('---'+latestAnimeID+'---');
    try {
        for(var i = 0; i < request.body.Genre.length; i++){
            var obj = animeEintragGenreDao.create(latestAnimeID, request.body.Genre[i]);
        }
        console.log('Service AnimeEintragGenre: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/animeEintragGenre', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service AnimeEintragGenre: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    try {
        var obj = animeEintragGenreDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service AnimeEintragGenre: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/animeEintragGenre/:id', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested deletion of record, id=' + request.params.id);

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    try {
        var obj = animeEintragGenreDao.loadById(request.params.id);
        animeEintragGenreDao.delete(request.params.id);
        console.log('Service AnimeEintragGenre: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.delete('/animeEintragGenre/delete/:id', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested deletion of record, id=' + request.params.id);

    const animeEintragGenreDao = new AnimeEintragGenreDao(request.app.locals.dbConnection);
    try {
        var obj = animeEintragGenreDao.loadByAnimeEintragId(request.params.id);
        animeEintragGenreDao.deleteAnimeEintragId(request.params.id);
        console.log('Service AnimeEintragGenre: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
