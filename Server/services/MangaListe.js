const helper = require('../helper.js');
const MangaListeDao = require('../dao/MangaListeDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service MangaListe');

serviceRouter.get('/mangaListe/gib/:id', function(request, response) {
    console.log('Service MangaListe: Client requested one record, id=' + request.params.id);

    var a = request.params.id
    var b = a.split('_')
    console.log(b)

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var obj = parseInt(mangaListeDao.loadByIds(b));
        console.log('Service MangaListe: Record loaded ' + obj);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service MangaListe: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaListe/alle', function(request, response) {
    console.log('Service MangaListe: Client requested all records');

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var arr = mangaListeDao.loadAll();
        console.log('Service MangaListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service MangaListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaListe/existiert/:id', function(request, response) {
    console.log('Service MangaListe: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var exists = mangaListeDao.exists(request.params.id);
        console.log('Service MangaListe: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service MangaListe: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/mangaListe/status/add', function(request, response) {
    console.log('Service MangaListe: Client requested creation of new record');

    console.log('-------> User: ' + request.body.User)
    console.log('-------> ListStatusUser: ' + request.body.ListStatusUser)
    console.log('-------> EntryID: ' + request.body.EntryID)

    var errorMsgs=[];
    if (helper.isUndefined(request.body.User)) 
        errorMsgs.push('User fehlt');
    if (helper.isUndefined(request.body.ListStatusUser)) 
        errorMsgs.push('ListstatusUser fehlt');
    if (helper.isUndefined(request.body.EntryID)) 
        errorMsgs.push('EntryID fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service MangaListe: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht m??glich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {

        if(request.body.ListStatusUser == 0){
            var obj = mangaListeDao.delete(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID)
            console.log('Service MangaListe: Record Deleted');
        }
        if(mangaListeDao.loadByUserAndName(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID) && request.body.ListStatusUser > 0){
            var obj = mangaListeDao.editStatus(request.body.ListStatusUser, parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID)
            console.log('Service MangaListe: Record Updated');
            response.status(200).json(obj);
        }
        if(!mangaListeDao.loadByUserAndName(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID) && request.body.ListStatusUser > 0){
            var obj = mangaListeDao.create(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID, request.body.ListStatusUser);
            console.log('Service MangaListe: Record inserted');
            response.status(200).json(obj);
        }
    } catch (ex) {
        console.error('Service MangaListe: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/mangaListe', function(request, response) {
    console.log('Service MangaListe: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service MangaListe: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht m??glich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var obj = mangaListeDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service MangaListe: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service MangaListe: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/mangaListe/:id', function(request, response) {
    console.log('Service MangaListe: Client requested deletion of record, id=' + request.params.id);

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var obj = mangaListeDao.loadById(request.params.id);
        mangaListeDao.delete(request.params.id);
        console.log('Service MangaListe: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gel??scht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service MangaListe: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
