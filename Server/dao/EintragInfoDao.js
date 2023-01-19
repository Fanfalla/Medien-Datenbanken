const helper = require('../helper.js');

class EintragInfoDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM EintragInfo WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM EintragInfo';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM EintragInfo WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    latestID() {
        var sql = 'SELECT id FROM EintragInfo ORDER BY id desc LIMIT 1';
        var statement = this._conn.prepare(sql);
        var result = statement.get();
        var a = Object.values(result);
        return a;
    }

    create(romaji, englisch, deutsch, startdatum, enddatum, cover , diashow, beschreibung, formatid, jahrid, sourceid, statusid) {
        var sql = 'INSERT INTO EintragInfo (romaji, englisch, deutsch, startDatum, endDatum, cover, diashow, beschreibung, formatid, jahrid, sourceid, statusid) VALUES (?,?,?,?,?,?,?,?,?,?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [romaji, englisch, deutsch, startdatum, enddatum, cover, diashow, beschreibung, formatid, jahrid, sourceid, statusid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return true;
    }

    update(id, romaji, englisch, deutsch, startdatum, enddatum, cover, diashow, beschreibung, formatid, jahrid, sourceid, statusid) {
        var sql = 'UPDATE EintragInfo SET romaji=?, englisch=?, deutsch=?, startDatum=?, endDatum=?, cover=?, diashow=?, beschreibung=?, formatid=?, jahrid=?, sourceid=?, statusid=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [romaji, englisch, deutsch, startdatum, enddatum, cover, diashow, beschreibung, formatid, jahrid, sourceid, statusid, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return true;
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM EintragInfo WHERE id=?';
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
        console.log('EintragInfoDao [_conn=' + this._conn + ']');
    }
}

module.exports = EintragInfoDao;