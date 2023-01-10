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

    loadByUserAndName(userid, mangaid) {
        var sql = 'SELECT * FROM Mangaliste WHERE accountid = ? AND mangaid = ?';
        var statement = this._conn.prepare(sql);
        var params = [userid, mangaid];
        var result = statement.get(params);

        if (helper.isUndefined(result)) 
            return false;

        return result;
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

    create(accountid, mangaid, liststatusid) {
        var sql = 'INSERT INTO MangaListe (accountid, mangaid, liststatusid) VALUES (?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [accountid, mangaid, liststatusid];
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

    update(id, accountid, mangaid) {
        var sql = 'UPDATE MangaListe SET accountid=?, mangaid=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [accountid, mangaid, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    editStatus(statusid, accountid, mangaid) {
        var sql = 'UPDATE MangaListe SET liststatusid= ? WHERE accountid = ? AND mangaid = ?';
        var statement = this._conn.prepare(sql);
        var params = [statusid, accountid, mangaid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
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

    toString() {
        console.log('MangaListeDao [_conn=' + this._conn + ']');
    }
}

module.exports = MangaListeDao;