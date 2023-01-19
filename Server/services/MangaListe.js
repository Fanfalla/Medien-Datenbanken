const helper = require('../helper.js');
const MangaListeDao = require('../dao/MangaListeDao.js');
const MangaDao = require('../dao/MangaDao.js');
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

serviceRouter.get('/mangaListe/getReading/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var arr = mangaListeDao.loadReading(a);
        console.log('Service mangaListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaListe/getCompleted/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var arr = mangaListeDao.loadCompleted(a);
        console.log('Service mangaListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaListe/getPlanning/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var arr = mangaListeDao.loadPlanning(a);
        console.log('Service mangaListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaListe/getPaused/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var arr = mangaListeDao.loadPaused(a);
        console.log('Service mangaListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaListe/getDropped/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var arr = mangaListeDao.loadDropped(a);
        console.log('Service mangaListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/mangaListe/count/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested one record, id=' + request.params.id);

    var a = request.params.id
    var b = a.split('_')
    console.log(b)

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        var obj = parseInt(mangaListeDao.count(b));
        console.log('Service AnimeListe: Record loaded ' + obj);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading record by id. Exception occured: ' + ex.message);
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

    var errorMsgs=[];
    if (helper.isUndefined(request.body.User)) 
        errorMsgs.push('User fehlt');
    if (helper.isUndefined(request.body.ListStatusUser)) 
        errorMsgs.push('ListstatusUser fehlt');
    if (helper.isUndefined(request.body.EntryID)) 
        errorMsgs.push('EntryID fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service MangaListe: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    const mangaDao = new MangaDao(request.app.locals.dbConnection);
    try {

        if(request.body.ListStatusUser == 0){
            var obj = mangaListeDao.delete(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID)
            console.log('Service MangaListe: Record Deleted');
        }

        if(mangaListeDao.loadByUserAndName(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID) && request.body.ListStatusUser > 0){
            var obj = mangaListeDao.editStatus(request.body.ListStatusUser, parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID)
            if(request.body.ListStatusUser == 3){
                mangaListeDao.setChapter(parseInt(mangaDao.getChapters(request.body.EntryID)), parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID)
            }
            console.log('Service MangaListe: Record Updated');
            response.status(200).json(obj);
        }

        if(!mangaListeDao.loadByUserAndName(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID) && request.body.ListStatusUser > 0 && request.body.ListStatusUser == 3){
            var obj = mangaListeDao.createC(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID, request.body.ListStatusUser, parseInt(mangaDao.getChapter(request.body.EntryID)));
            console.log('Service MangaListe: Record inserted');
            response.status(200).json(obj);
        }

        if(!mangaListeDao.loadByUserAndName(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID) && request.body.ListStatusUser > 0 && request.body.ListStatusUser != 3){
            var obj = mangaListeDao.create(parseInt(mangaListeDao.getUserId(request.body.User)), request.body.EntryID, request.body.ListStatusUser);
            console.log('Service MangaListe: Record inserted');
            response.status(200).json(obj);
        }
    } catch (ex) {
        console.error('Service MangaListe: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.get('/mangaListe/addChapter/:id', function(request, response) {
    console.log('Service MangaListe: Client requested all records');

    var a = request.params.id
    var b = a.split('_')

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    const mangaDao = new MangaDao(request.app.locals.dbConnection);
    try {
        mangaListeDao.addChapter(b);
        var obj = parseInt(mangaListeDao.getChapter(b))
        if(parseInt(mangaListeDao.getListStatus(b)) != 1 && parseInt(mangaListeDao.getChapter(b)) != parseInt(mangaDao.getChapters(parseInt(b[1])))){
            mangaListeDao.updateListStatusOther(b)
        }
        if(parseInt(mangaListeDao.getChapter(b)) == parseInt(mangaDao.getChapters(parseInt(b[1])))){
            mangaListeDao.updateListStatus(b)
        }
        if(parseInt(mangaListeDao.getChapter(b)) == parseInt(mangaDao.getChapters(parseInt(b[1]))) && parseInt(mangaDao.getChapters(parseInt(b[1]))) == 1){
            mangaListeDao.updateListStatus(b)
        }
        console.log('Service mangaListe: Records loaded = ' + obj);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service MangaListe: Error loading all records. Exception occured: ' + ex.message);
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
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
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
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service MangaListe: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.delete('/mangaListe/delete/:id', function(request, response) {
    console.log('Service MangaListe: Client requested deletion of record, mangaid=' + request.params.id);

    const mangaListeDao = new MangaListeDao(request.app.locals.dbConnection);
    try {
        if (mangaListeDao.existsMangaId(request.params.id)) {
            var obj = mangaListeDao.loadByMangaId(request.params.id);
            mangaListeDao.deleteMangaId(request.params.id);
            console.log('Service MangaListe: Deletion of record successfull, id=' + request.params.id);
            response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
        } else {
            console.log('Service MangaListe: No record with id=' + request.params.id);
            response.status(200).json({'fehler': false,});
        }
    } catch (ex) {
        console.error('Service MangaListe: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
