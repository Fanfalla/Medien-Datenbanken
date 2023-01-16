const helper = require('../helper.js');

class AnimeListeDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadByIds(ids) {

        var a = ids[0]
        var b = ids[1]

        var sql = 'SELECT liststatusid FROM AnimeListe WHERE animeid = ? AND accountid= ?';
        var statement = this._conn.prepare(sql);
        var params = [a, b]
        var result = statement.get(params);
        var a = Object.values(result);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + ids[0]);

        return a;
    }

    loadByUserAndName(userid, animeid) {
        var sql = 'SELECT * FROM Animeliste WHERE accountid = ? AND animeid = ?';
        var statement = this._conn.prepare(sql);
        var params = [userid, animeid];
        var result = statement.get(params);

        if (helper.isUndefined(result)) 
            return false;

        return result;
    }

    count(arr) {
        var userid = arr[0]
        var animeid = arr[1]
        var sql = 'SELECT count(id) FROM animeliste WHERE accountid = ? AND liststatusid = ?';
        var statement = this._conn.prepare(sql);
        var params = [userid, animeid];
        var result = statement.get(params);
        var a = Object.values(result)

        if (helper.isUndefined(result))
            return false;

        return a;
    }

    loadWatching(userid) {
        var sql = 'SELECT anime.id, romaji, folgen, format, folgenanzahl, cover FROM Animeliste INNER JOIN Anime ON animeid = anime.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 1 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    loadCompleted(userid) {
        var sql = 'SELECT anime.id, romaji, folgen, format, folgenanzahl, cover FROM Animeliste INNER JOIN Anime ON animeid = anime.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 3 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    loadPlanning(userid) {
        var sql = 'SELECT anime.id, romaji, folgen, format, folgenanzahl, cover FROM Animeliste INNER JOIN Anime ON animeid = anime.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 4 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    loadPaused(userid) {
        var sql = 'SELECT anime.id, romaji, folgen, format, folgenanzahl, cover FROM Animeliste INNER JOIN Anime ON animeid = anime.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 5 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    loadDropped(userid) {
        var sql = 'SELECT anime.id, romaji, folgen, format, folgenanzahl, cover FROM Animeliste INNER JOIN Anime ON animeid = anime.id INNER JOIN eintraginfo ON eintragid = eintraginfo.id INNER JOIN Format ON eintraginfo.formatid = Format.id WHERE accountid = ? AND liststatusid = 6 ORDER BY romaji';
        var statement = this._conn.prepare(sql);
        var params = [userid];
        var result = statement.all(params);

        if (helper.isArrayEmpty(result)) 
            return [];

        return result;
    }

    addFolge(arr) {

        console.log(arr)
        var folgen = parseInt(arr[0]) + 1
        var animeid = arr[1]
        var userid = arr[2]
        var sql = 'UPDATE animeliste set folgen = ? WHERE animeid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [folgen, animeid, userid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);
    }

    getFolge(arr) {
        var animeid = arr[1]
        var userid = arr[2]
        var sql = 'SELECT folgen FROM animeliste WHERE animeid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [animeid, userid];
        var result = statement.get(params);
        var a = Object.values(result);

        return a;
    }

    getListStatus(arr) {
        var animeid = arr[1]
        var userid = arr[2]
        var sql = 'SELECT liststatusid FROM animeliste WHERE animeid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [animeid, userid];
        var result = statement.get(params);
        var a = Object.values(result);

        return a;
    }

    updateListStatus(arr){
        var animeid = arr[1]
        var userid = arr[2]
        var sql = 'UPDATE animeliste set liststatusid = 3 WHERE animeid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [animeid, userid];
        statement.run(params);
    }

    updateListStatusOther(arr){
        var animeid = arr[1]
        var userid = arr[2]
        var sql = 'UPDATE animeliste set liststatusid = 1 WHERE animeid = ? AND accountid = ?';
        var statement = this._conn.prepare(sql);
        var params = [animeid, userid];
        statement.run(params);
    }

    loadById(id) {
        var sql = 'SELECT * FROM AnimeListe WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadByAnimeId(id) {
        var sql = 'SELECT * FROM AnimeListe WHERE animeid=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM AnimeListe';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM AnimeListe WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    existsAnimeId(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM AnimeListe WHERE animeid=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt >= 1) 
            return true;

        return false;
    }

    getUserId(benutzername){
        var sql = 'SELECT id FROM Account Where benutzername = ?'
        var statement = this._conn.prepare(sql);
        var result = statement.get(benutzername);
        var a = Object.values(result);
        return a;
    }

    create(accountid, animeid, liststatusid) {
        var sql = 'INSERT INTO AnimeListe (accountid, animeid, liststatusid, folgen) VALUES (?,?,?,0)';
        var statement = this._conn.prepare(sql);
        var params = [accountid, animeid, liststatusid];
        var result = statement.run(params);

        if (result === undefined) 
            return false;

        return this.loadById(result.lastInsertRowid);
    }

    createF(accountid, animeid, liststatusid, folgen) {
        var sql = 'INSERT INTO AnimeListe (accountid, animeid, liststatusid, folgen) VALUES (?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [accountid, animeid, liststatusid, folgen];
        var result = statement.run(params);

        if (result === undefined) 
            return false;

        return this.loadById(result.lastInsertRowid);
    }

    update(id, accountid, animeid) {
        var sql = 'UPDATE AnimeListe SET accountid=?, animeid=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [accountid, animeid, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    editStatus(statusid, accountid, animeid) {
        var sql = 'UPDATE AnimeListe SET liststatusid= ? WHERE accountid = ? AND animeid = ?';
        var statement = this._conn.prepare(sql);
        var params = [statusid, accountid, animeid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(userid, animeid) {
        try {
            var sql = 'DELETE FROM AnimeListe WHERE accountid = ? AND animeid = ?';
            var statement = this._conn.prepare(sql);
            var params = [userid, animeid];
            var result = statement.run(params);

            if (result.changes != 1) 
                throw new Error('Could not delete anime= ' + animeid + ' from user= ' + userid);

            return true;
        } catch (ex) {
            throw new Error('Could not delete anime= ' + animeid + ' from user= ' + userid + '. Reason: ' + ex.message);
        }
    }

    deleteAnimeId(animeid) {
        try {
            var sql = 'DELETE FROM AnimeListe WHERE animeid = ?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(animeid);

            if (result.changes == 0) 
                throw new Error('Could not delete anime= ' + animeid);

            return true;
        } catch (ex) {
            throw new Error('Could not delete anime= ' + animeid + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('AnimeListeDaoDao [_conn=' + this._conn + ']');
    }
}

module.exports = AnimeListeDao;