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

    loadById(id) {
        var sql = 'SELECT * FROM AnimeListe WHERE id=?';
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

    getUserId(benutzername){
        var sql = 'SELECT id FROM Account Where benutzername = ?'
        var statement = this._conn.prepare(sql);
        var result = statement.get(benutzername);
        var a = Object.values(result);
        return a;
    }

    create(accountid, animeid, liststatusid) {
        var sql = 'INSERT INTO AnimeListe (accountid, animeid, liststatusid) VALUES (?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [accountid, animeid, liststatusid];
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

    toString() {
        console.log('AnimeListeDaoDao [_conn=' + this._conn + ']');
    }
}

module.exports = AnimeListeDao;