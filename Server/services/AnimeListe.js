const helper = require('../helper.js');
const AnimeListeDao = require('../dao/AnimeListeDao.js');
const AnimeDao = require('../dao/AnimeDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service AnimeListe');

serviceRouter.get('/animeListe/gib/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested one record, id=' + request.params.id);

    var a = request.params.id
    var b = a.split('_')
    console.log(b)

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var obj = parseInt(animeListeDao.loadByIds(b));
        console.log('Service AnimeListe: Record loaded ' + obj);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/count/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested one record, id=' + request.params.id);

    var a = request.params.id
    var b = a.split('_')
    console.log(b)

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var obj = parseInt(animeListeDao.count(b));
        console.log('Service AnimeListe: Record loaded ' + obj);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/getWatching/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var arr = animeListeDao.loadWatching(a);
        console.log('Service animeListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/addFolge/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id
    var b = a.split('_')

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    const animeDao = new AnimeDao(request.app.locals.dbConnection);
    try {
        animeListeDao.addFolge(b);
        var obj = parseInt(animeListeDao.getFolge(b))
        if(parseInt(animeListeDao.getListStatus(b)) != 1 && parseInt(animeListeDao.getFolge(b)) != parseInt(animeDao.getFolgen(parseInt(b[1])))){
            animeListeDao.updateListStatusOther(b)
        }
        if(parseInt(animeListeDao.getFolge(b)) == parseInt(animeDao.getFolgen(parseInt(b[1])))){
            animeListeDao.updateListStatus(b)
        }
        if(parseInt(animeListeDao.getFolge(b)) == parseInt(animeDao.getFolgen(parseInt(b[1]))) && parseInt(animeDao.getFolgen(parseInt(b[1]))) == 1){
            animeListeDao.updateListStatus(b)
        }
        console.log('Service animeListe: Records loaded = ' + obj);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/getCompleted/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var arr = animeListeDao.loadCompleted(a);
        console.log('Service animeListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/getPlanning/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var arr = animeListeDao.loadPlanning(a);
        console.log('Service animeListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/getPaused/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var arr = animeListeDao.loadPaused(a);
        console.log('Service animeListe: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeListe: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/animeListe/getDropped/:id', function(request, response) {
    console.log('Service AnimeListe: Client requested all records');

    var a = request.params.id

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    try {
        var arr = animeListeDao.loadDropped(a);
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

serviceRouter.post('/animeListe/status/add', function(request, response) {
    console.log('Service AnimeListe: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.User)) 
        errorMsgs.push('User fehlt');
    if (helper.isUndefined(request.body.ListStatusUser)) 
        errorMsgs.push('ListstatusUser fehlt');
    if (helper.isUndefined(request.body.EntryID)) 
        errorMsgs.push('EntryID fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service AnimeListe: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const animeListeDao = new AnimeListeDao(request.app.locals.dbConnection);
    const animeDao = new AnimeDao(request.app.locals.dbConnection);
    try {

        if(request.body.ListStatusUser == 0){
            var obj = animeListeDao.delete(parseInt(animeListeDao.getUserId(request.body.User)), request.body.EntryID)
            console.log('Service AnimeListe: Record Deleted');
        }
        
        if(animeListeDao.loadByUserAndName(parseInt(animeListeDao.getUserId(request.body.User)), request.body.EntryID) && request.body.ListStatusUser > 0){
            var obj = animeListeDao.editStatus(request.body.ListStatusUser, parseInt(animeListeDao.getUserId(request.body.User)), request.body.EntryID)
            console.log('Service AnimeListe: Record Updated');
            response.status(200).json(obj);
        }
        
        if(!animeListeDao.loadByUserAndName(parseInt(animeListeDao.getUserId(request.body.User)), request.body.EntryID) && request.body.ListStatusUser > 0 && request.body.ListStatusUser == 3){
            var obj = animeListeDao.createF(parseInt(animeListeDao.getUserId(request.body.User)), request.body.EntryID, request.body.ListStatusUser, parseInt(animeDao.getFolgen(request.body.EntryID)))
            console.log('Service AnimeListe: Record Updated');
            response.status(200).json(obj);
        }
        
        if(!animeListeDao.loadByUserAndName(parseInt(animeListeDao.getUserId(request.body.User)), request.body.EntryID) && request.body.ListStatusUser > 0 && request.body.ListStatusUser != 3){
            var obj = animeListeDao.create(parseInt(animeListeDao.getUserId(request.body.User)), request.body.EntryID, request.body.ListStatusUser);
            console.log('Service AnimeListe: Record inserted');
            response.status(200).json(obj);
        }
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
