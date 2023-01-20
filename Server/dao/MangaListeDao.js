const helper = require('../helper.js');

class MangaListeDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadByIds(ids) {

        var a = ids[0]
        var b = ids[1]

        var sql = 'SELECT liststatusid FROM MangaListe WHERE mangaid = ? AND accountid= ?';
        var statement = this._conn.prepare(sql);
        var params = [a, b]
        var result = statement.get(params);
        var a = Object.values(result);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + ids[0]);

        return a;
    }

    loadById(id) {
        var sql = 'SELECT * FROM MangaListe WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadByMangaId(id) {
        var sql = 'SELECT * FROM MangaListe WHERE mangaid=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by mangaid=' + id);

        return result;
    }

    loadByUserAndName(userid, mangaid) {
        var sql = 'SELECT * FROM Mangaliste WHERE accountid = ? AND mangaid = ?';
        var statement = this._conn.prepare(sql);
        var params = [userid, mangaid];
        var result = statement.get(params);

        if (helper.isUndefined(result)) 
            return false;

        return result;
    }

    loadReading(userid) {
        var sql = 'SELECT manga.id, romaji, chapteranzahl, format, chapter, cover FROM Mangaliste INNER JOIN Manga ON mangaid = manga.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 2 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    loadCompleted(userid) {
        var sql = 'SELECT manga.id, romaji, chapteranzahl, format, chapter, cover FROM Mangaliste INNER JOIN Manga ON mangaid = manga.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 3 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    loadPlanning(userid) {
        var sql = 'SELECT manga.id, romaji, chapteranzahl, format, chapter, cover FROM Mangaliste INNER JOIN Manga ON mangaid = manga.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 4 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    loadPaused(userid) {
        var sql = 'SELECT manga.id, romaji, chapteranzahl, format, chapter, cover FROM Mangaliste INNER JOIN Manga ON mangaid = manga.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 5 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    loadDropped(userid) {
        var sql = 'SELECT manga.id, romaji, chapteranzahl, format, chapter, cover FROM Mangaliste INNER JOIN Manga ON mangaid = manga.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 6 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    count(arr) {
        var userid = arr[0]
        var animeid = arr[1]
        var sql = 'SELECT count(id) FROM mangaliste WHERE accountid = ? AND liststatusid = ?';
        var statement = this._conn.prepare(sql);
        var params = [userid, animeid];
        var result = statement.get(params);
        var a = Object.values(result)

        if (helper.isUndefined(result))
            return false;

        return a;
    }

    addChapter(arr) {

        console.log(arr)
        var folgen = parseInt(arr[0]) + 1
        var mangaid = arr[1]
        var userid = arr[2]
        var sql = 'UPDATE mangaliste set chapter = ? WHERE mangaid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [folgen, mangaid, userid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);
    }

    getChapter(arr) {
        var mangaid = arr[1]
        var userid = arr[2]
        var sql = 'SELECT chapter FROM mangaliste WHERE mangaid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [mangaid, userid];
        var result = statement.get(params);
        var a = Object.values(result);

        return a;
    }

    loadAll() {
        var sql = 'SELECT * FROM MangaListe';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM MangaListe WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    existsMangaId(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM MangaListe WHERE mangaid=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt >= 1) 
            return true;

        return false;
    }

    create(accountid, mangaid, liststatusid) {
        var sql = 'INSERT INTO MangaListe (accountid, mangaid, liststatusid, chapter) VALUES (?,?,?,0)';
        var statement = this._conn.prepare(sql);
        var params = [accountid, mangaid, liststatusid];
        var result = statement.run(params);

        if (result === undefined) 
            return false;

        return this.loadById(result.lastInsertRowid);
    }

    setChapter(maxChapter, accountid, mangaid){
        var sql = 'UPDATE mangaListe SET chapter= ? WHERE accountid = ? AND mangaid = ?';
        var statement = this._conn.prepare(sql);
        var params = [maxChapter, accountid, mangaid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return true;

    }

    createC(accountid, mangaid, liststatusid, chapter) {
        var sql = 'INSERT INTO MangaListe (accountid, mangaid, liststatusid, chapter) VALUES (?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [accountid, mangaid, liststatusid, chapter];
        var result = statement.run(params);

        if (result === undefined) 
            return false;

        return this.loadById(result.lastInsertRowid);
    }

    getUserId(benutzername){
        var sql = 'SELECT id FROM Account Where benutzername = ?'
        var statement = this._conn.prepare(sql);
        var result = statement.get(benutzername);
        var a = Object.values(result);
        return a;
    }

    getListStatus(arr) {
        var mangaid = arr[1]
        var userid = arr[2]
        var sql = 'SELECT liststatusid FROM mangaliste WHERE mangaid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [mangaid, userid];
        var result = statement.get(params);
        var a = Object.values(result);

        return a;
    }

    updateListStatus(arr){
        var mangaid = arr[1]
        var userid = arr[2]
        var sql = 'UPDATE mangaliste set liststatusid = 3 WHERE mangaid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [mangaid, userid];
        statement.run(params);
    }

    updateListStatusOther(arr){
        var mangaid = arr[1]
        var userid = arr[2]
        var sql = 'UPDATE mangaliste set liststatusid = 1 WHERE mangaid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [mangaid, userid];
        statement.run(params);
    }

    update(id, accountid, mangaid) {
        var sql = 'UPDATE MangaListe SET accountid=?, mangaid=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [accountid, mangaid, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return true;
    }

    editStatus(statusid, accountid, mangaid) {
        var sql = 'UPDATE MangaListe SET liststatusid= ? WHERE accountid = ? AND mangaid = ?';
        var statement = this._conn.prepare(sql);
        var params = [statusid, accountid, mangaid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return true;
    }

    delete(userid, mangaid) {
        try {
            var sql = 'DELETE FROM MangaListe WHERE accountid = ? AND mangaid = ?';
            var statement = this._conn.prepare(sql);
            var params = [userid, mangaid];
            var result = statement.run(params);

            if (result.changes != 1) 
                throw new Error('Could not delete manga= ' + mangaid + ' from user= ' + userid);

            return true;
        } catch (ex) {
            throw new Error('Could not delete manga= ' + mangaid + ' from user= ' + userid + '. Reason: ' + ex.message);
        }
    }

    deleteMangaId(mangaid) {
        try {
            var sql = 'DELETE FROM MangaListe WHERE mangaid = ?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(mangaid);

            if (result.changes == 0) 
                throw new Error('Could not delete manga= ' + mangaid);

            return true;
        } catch (ex) {
            throw new Error('Could not delete manga= ' + mangaid + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('MangaListeDao [_conn=' + this._conn + ']');
    }
}

module.exports = MangaListeDao;