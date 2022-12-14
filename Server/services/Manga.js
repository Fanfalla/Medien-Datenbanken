const helper = require('../helper.js');
const MangaDao = require('../dao/MangaDao.js');
const EintragInfoDao = require('../dao/EintragInfoDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Manga');

serviceRouter.get('/manga/gib/:id', function(request, response) {
    console.log('Service Manga: Client requested one record, id=' + request.params.id);

    const mangaDao = new MangaDao(request.app.locals.dbConnection);
    try {
        var obj = mangaDao.loadById(request.params.id);
        console.log('Service Manga: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Manga: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/manga/alle', function(request, response) {
    console.log('Service Manga: Client requested all records');

    const mangaDao = new MangaDao(request.app.locals.dbConnection);
    try {
        var arr = mangaDao.loadAll();
        console.log('Service Manga: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Manga: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/manga/existiert/:id', function(request, response) {
    console.log('Service Manga: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const mangaDao = new MangaDao(request.app.locals.dbConnection);
    try {
        var exists = mangaDao.exists(request.params.id);
        console.log('Service Manga: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Manga: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/manga/add', function(request, response) {
    console.log('Service Manga: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.ChapterAnzahl)) 
        errorMsgs.push('ChapterAnzahl fehlt');
    if (helper.isUndefined(request.body.VolumeAnzahl)) 
        errorMsgs.push('VolumeAnzahl fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Manga: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht m??glich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const mangaDao = new MangaDao(request.app.locals.dbConnection);
    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        if(!mangaDao.MangaExists(request.body.romaji)){
            var obj = mangaDao.create(request.body.ChapterAnzahl, request.body.VolumeAnzahl, parseInt(eintragInfoDao.latestID()));
            console.log('Service Manga: Record inserted');
            response.status(200).json(obj);
        }else{
            console.log('Manga Existiert bereits')
            response.json({'nachricht': 'Manga Existiert bereits'})
        }
    } catch (ex) {
        console.error('Service Manga: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/manga', function(request, response) {
    console.log('Service Manga: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Manga: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht m??glich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const mangaDao = new MangaDao(request.app.locals.dbConnection);
    try {
        var obj = mangaDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Manga: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Manga: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/manga/:id', function(request, response) {
    console.log('Service Manga: Client requested deletion of record, id=' + request.params.id);

    const mangaDao = new MangaDao(request.app.locals.dbConnection);
    try {
        var obj = mangaDao.loadById(request.params.id);
        mangaDao.delete(request.params.id);
        console.log('Service Manga: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gel??scht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Manga: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
