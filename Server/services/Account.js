const helper = require('../helper.js');
const AccountDao = require('../dao/AccountDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service Account');

serviceRouter.get('/account/gib/:id', function(request, response) {
    console.log('Service Account: Client requested one record, id=' + request.params.id);

    const accountDao = new AccountDao(request.app.locals.dbConnection);
    try {
        var obj = accountDao.loadById(request.params.id);
        console.log('Service account: Record loaded');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Account: Error loading record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/account/alle', function(request, response) {
    console.log('Service Account: Client requested all records');

    const accountDao = new AccountDao(request.app.locals.dbConnection);
    try {
        var arr = accountDao.loadAll();
        console.log('Service Account: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service Account: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/account/existiert/:id', function(request, response) {
    console.log('Service Account: Client requested check, if record exists, id=' + request.params.id);

    console.log('go');

    const accountDao = new AccountDao(request.app.locals.dbConnection);
    try {
        var exists = accountDao.exists(request.params.id);
        console.log('Service Account: Check if record exists by id=' + request.params.id + ', exists=' + exists);
        response.status(200).json({'id': request.params.id, 'existiert': exists});
    } catch (ex) {
        console.error('Service Account: Error checking if record exists. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.post('/account', function(request, response) {
    console.log('Service Account: Client requested creation of new record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.benutzername)) 
        errorMsgs.push('benutzername fehlt');
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push('passwort fehlt');
    if (helper.isUndefined(request.body.antwort)) 
        errorMsgs.push('antwort fehlt');
    if (helper.isUndefined(request.body.email)) 
        errorMsgs.push('email fehlt');
    if (helper.isUndefined(request.body.profilbild)) 
        errorMsgs.push('profilbild fehlt');
    if (helper.isUndefined(request.body.sicherheitsfrageid)) 
        errorMsgs.push('sicherheitsfrage fehlt');
    if (helper.isUndefined(request.body.adminid)) 
        errorMsgs.push('adminid fehlt');
    
    if (errorMsgs.length > 0) {
        console.log('Service Account: Creation not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const accountDao = new AccountDao(request.app.locals.dbConnection);
    try {
        var obj = accountDao.create(request.body.benutzername, request.body.passwort, request.body.antwort, request.body.email, request.body.profilbild, request.body.sicherheitsfrageid, request.body.adminid);
        console.log('Service Account: Record inserted');
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Account: Error creating new record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/account', function(request, response) {
    console.log('Service Account: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.kennzeichnung)) 
        errorMsgs.push('kennzeichnung fehlt');
    if (helper.isUndefined(request.body.bezeichnung)) 
        errorMsgs.push('bezeichnung fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Account: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const accountDao = new AccountDao(request.app.locals.dbConnection);
    try {
        var obj = accountDao.update(request.body.id, request.body.kennzeichnung, request.body.bezeichnung);
        console.log('Service Account: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Account: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.put('/account/pw', function(request, response) {
    console.log('Service Account: Client requested update of existing record');

    var errorMsgs=[];
    if (helper.isUndefined(request.body.id)) 
        errorMsgs.push('id fehlt');
    if (helper.isUndefined(request.body.passwort)) 
        errorMsgs.push('passwort fehlt');

    if (errorMsgs.length > 0) {
        console.log('Service Account: Update not possible, data missing');
        response.status(400).json({ 'fehler': true, 'nachricht': 'Funktion nicht möglich. Fehlende Daten: ' + helper.concatArray(errorMsgs) });
        return;
    }

    const accountDao = new AccountDao(request.app.locals.dbConnection);
    try {
        var obj = accountDao.updatePW(request.body.id, request.body.passwort);
        console.log('Service Account: Record updated, id=' + request.body.id);
        response.status(200).json(obj);
    } catch (ex) {
        console.error('Service Account: Error updating record by id. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }    
});

serviceRouter.delete('/account/:id', function(request, response) {
    console.log('Service Account: Client requested deletion of record, id=' + request.params.id);

    const accountDao = new AccountDao(request.app.locals.dbConnection);
    try {
        var obj = accountDao.loadById(request.params.id);
        accountDao.delete(request.params.id);
        console.log('Service Account: Deletion of record successfull, id=' + request.params.id);
        response.status(200).json({ 'gelöscht': true, 'eintrag': obj });
    } catch (ex) {
        console.error('Service Account: Error deleting record. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
