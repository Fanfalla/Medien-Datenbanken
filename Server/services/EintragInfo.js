const helper = require('../helper.js');
const EintragInfoDao = require('../dao/EintragInfoDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service EintragInfo'); /*Wiedergabe welcher Service genutzt wird*/

serviceRouter.get('/eintragInfo/gib/:id', function(request, response) {
    console.log('Service EintragInfo: Client requested one record, id=' + request.params.id);

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var obj = eintragInfoDao.loadById(request.params.id); 
        console.log('Service EintragInfo: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service EintragInfo: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/eintragInfo/alle', function(request, response) {
    console.log('Service EintragInfo: Client requested all records'); /*Einträge von der eintragInfo werden geladen*/

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var arr = eintragInfoDao.loadAll();
        console.log('Service EintragInfo: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service EintragInfo: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/eintragInfo/existiert/:id', function(request, response) {
    console.log('Service EintragInfo: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var exists = eintragInfoDao.exists(request.params.id);
        console.log('Service EintragInfo: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service EintragInfo: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/EintragInfo/add', function(request, response) {
    console.log('Service EintragInfo: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.Romaji)) 	/*Fehlermeldung wenn etwas fehlt*/
        errorMsgs.push('Romaji fehlt');
    if (helper.isUndefined(request.body.Englisch)) 
        errorMsgs.push('English fehlt');
    if (helper.isUndefined(request.body.Deutsch)) 
        errorMsgs.push('Deutsch fehlt');
    if (helper.isUndefined(request.body.StartDate)) 
        errorMsgs.push('StartDate fehlt');
    if (helper.isUndefined(request.body.EndDate)) 
        errorMsgs.push('EndDate fehlt');
    if (helper.isUndefined(request.body.Cover)) 
        errorMsgs.push('Cover fehlt');
    if (helper.isUndefined(request.body.Diashow)) 
        errorMsgs.push('Diashow fehlt');
    if (helper.isUndefined(request.body.Beschreibung))
        errorMsgs.push('Beschreibung fehlt');
    if (helper.isUndefined(request.body.Format)) 
        errorMsgs.push('Format fehlt');
    if (helper.isUndefined(request.body.Jahr)) 
        errorMsgs.push('Jahr fehlt');
    if (helper.isUndefined(request.body.Source)) 
        errorMsgs.push('Source fehlt');
    if (helper.isUndefined(request.body.Status)) 
        errorMsgs.push('Status fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service EintragInfo: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    } /*Soll nicht ausgeführt werden wenn etwas fehlt*/

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var obj = eintragInfoDao.create(request.body.Romaji, request.body.Englisch, request.body.Deutsch, request.body.StartDate, request.body.EndDate, request.body.Cover, request.body.Diashow, request.body.Beschreibung, request.body.Format, request.body.Jahr, request.body.Source, request.body.Status);
        console.log('Service EintragInfo: Record inserted');
        response.status(200).json(obj); /*Wiedergabe was hinzugefügt wurde*/
    } catch (ex) {
        console.error('Service EintragInfo: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/eintragInfo', function(request, response) {
    console.log('Service EintragInfo: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service EintragInfo: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var obj = eintragInfoDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service EintragInfo: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service EintragInfo: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/eintragInfo/:id', function(request, response) {
    console.log('Service EintragInfo: Client requested deletion of record, id=' + request.params.id);

    const eintragInfoDao = new EintragInfoDao(request.app.locals.dbConnection);
    try {
        var obj = eintragInfoDao.loadById(request.params.id);
        eintragInfoDao.delete(request.params.id);
        console.log('Service EintragInfo: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service EintragInfo: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
