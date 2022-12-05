const helper = require('../helper.js');

class AnimeDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM Anime WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM Anime';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Anime WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(folgenanzahl, dauer, eintragid, seasonid, studioid) {
        var sql = 'INSERT INTO Anime (folgenanzahl, dauer, eintragid, seasonid, studioid) VALUES (?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [folgenanzahl, dauer, eintragid, seasonid, studioid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, folgenanzahl, dauer, eintragid, seasonid, studioid) {
        var sql = 'UPDATE Anime SET folgenanzahl=?, dauer=?, eintragid=?, seasonid=?, studioid=?  WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [folgenanzahl, dauer, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Anime WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('AnimeDao [_conn=' + this._conn + ']');
    }
}

module.exports = AnimeDao;