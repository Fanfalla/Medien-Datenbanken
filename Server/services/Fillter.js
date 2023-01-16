const helper = require('../helper.js');
const FillterDao = require('../dao/FillterDao.js');
const express = require('express');
var serviceRouter = express.Router();

console.log('- Service AnimeEintragGenre');

serviceRouter.get('/Fillter/SortGenreAnime/:id', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested the records');

    var a = request.params.id
    var b = a.split('_')
    console.log(b)

    const fillterDao = new FillterDao(request.app.locals.dbConnection);
    try {
        var arr = fillterDao.FilterAnime(b);
        console.log('Service AnimeEintragGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/Fillter/SortGenreManga/:id', function(request, response) {
    console.log('Service MangaGenre: Client requested the records');

    var a = request.params.id
    var b = a.split('_')
    console.log(b)

    const fillterDao = new FillterDao(request.app.locals.dbConnection);
    try {
        var arr = fillterDao.FilterManga(b);
        console.log('Service MangaEintragGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service MangaGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

serviceRouter.get('/Fillter/SortGenreAnimeList/:id', function(request, response) {
    console.log('Service AnimeEintragGenre: Client requested the records');

    var a = request.params.id
    var b = a.split('_')
    console.log(b)

    const fillterDao = new FillterDao(request.app.locals.dbConnection);
    try {
        var arr = fillterDao.FilterAnimeList(b);
        console.log('Service AnimeEintragGenre: Records loaded, count=' + arr.length);
        response.status(200).json(arr);
    } catch (ex) {
        console.error('Service AnimeEintragGenre: Error loading all records. Exception occured: ' + ex.message);
        response.status(400).json({ 'fehler': true, 'nachricht': ex.message });
    }
});

module.exports = serviceRouter;
