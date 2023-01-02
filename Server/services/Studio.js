const helper = require('../helper.js');
const StudioDao = require('../dao/StudioDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Studio');

serviceRouter.get('/stdio/gib/:id', function(request, response) {
    console.log('Service Studio: Client requested one record, id=' + request.params.id);

    const studioDao = new StudioDao(request.app.locals.dbConnection);
    try {
        var obj = studioDao.loadById(request.params.id);
        console.log('Service Studio: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Studio: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/studio/alle', function(request, response) {
    console.log('Service Studio: Client requested all records');

    const studioDao = new StudioDao(request.app.locals.dbConnection);
    try {
        var arr = studioDao.loadAll();
        console.log('Service Studio: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service studio: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/studio/existiert/:id', function(request, response) {
    console.log('Service Studio: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const studioDao = new StudioDao(request.app.locals.dbConnection);
    try {
        var exists = studioDao.exists(request.params.id);
        console.log('Service Studio: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Studio: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/studio/add', function(request, response) {
    console.log('Service Studio: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.studio)) 
        errorMsgs.push('studio fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Studio: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const studioDao = new StudioDao(request.app.locals.dbConnection);
    try {
        if(!studioDao.StudioExists(request.body.studio)){
            var obj = studioDao.create(request.body.studio);
            console.log('Service Studio: Record inserted');
            response.status(200).json(obj);
        } else{
            console.log('Studio Existiert bereits')
            response.json({'nachricht': 'studio Existiert bereits'})
        } 
    }catch (ex) {
        console.error('Service Studio: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }  
});

serviceRouter.put('/studio', function(request, response) {
    console.log('Service Studio: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Studio: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const studioDao = new StudioDao(request.app.locals.dbConnection);
    try {
        var obj = studioDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Studio: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Studio: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/studio/:id', function(request, response) {
    console.log('Service Studio: Client requested deletion of record, id=' + request.params.id);

    const studioDao = new StudioDao(request.app.locals.dbConnection);
    try {
        var obj = studioDao.loadById(request.params.id);
        studioDao.delete(request.params.id);
        console.log('Service Studio: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Studio: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
