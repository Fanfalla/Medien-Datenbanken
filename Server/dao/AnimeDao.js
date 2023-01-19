const helper = require('../helper.js');

class AnimeDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadall(id) {
        var sql = 'SELECT Anime.id, romaji FROM Anime';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadById2(id) {
        var sql = 'SELECT Anime.id, folgenanzahl, dauer, romaji, englisch, deutsch, startdatum, enddatum, cover, diashow, beschreibung, formatid, jahrid, sourceid, statusid, seasonid, studioid FROM Anime INNER JOIN EintragInfo ON Anime.eintragid = EintragInfo.id INNER JOIN Studio ON Anime.studioid = Studio.id WHERE anime.id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadById(id) {
        var sql = 'SELECT Anime.id, folgenanzahl, dauer, romaji, englisch, deutsch, startdatum, enddatum, cover, diashow, beschreibung, format, jahr, \'source\'.\'source\', status, season, studio FROM Anime INNER JOIN EintragInfo ON Anime.eintragid = EintragInfo.id INNER JOIN Season ON Anime.seasonid = Season.id INNER JOIN Studio ON Anime.studioid = Studio.id INNER JOIN Format ON EintragInfo.formatid = Format.id INNER JOIN Jahr ON EintragInfo.jahrid = Jahr.id INNER JOIN \'Source\' ON EintragInfo.sourceid = \'Source\'.id INNER JOIN Status ON EintragInfo.statusid = Status.id WHERE anime.id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadEintragId(id) {
        var sql = 'SELECT eintragid FROM Anime WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        var a = Object.values(result);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return a;
    }

    AnimeExists(romaji = '') {
        var sql = 'SELECT * FROM Anime INNER JOIN EintragInfo ON Anime.eintragid = EintragInfo.id  WHERE romaji=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(romaji);

        if (result === undefined) 
            return false;

        return result;
    }

    getFolgen(id){
        var sql = 'SELECT folgenanzahl FROM Anime WHERE anime.id = ?'
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);
        var a = Object.values(result);

        return a;
    }

    latestID(){
        var sql = 'SELECT id FROM Anime ORDER BY id desc LIMIT 1';
        var statement = this._conn.prepare(sql);
        var result = statement.get();
        var a = Object.values(result);
        return a;
    }

    loadAll() {
        var sql = 'SELECT Anime.id, folgenanzahl, dauer, romaji, englisch, deutsch, startdatum, enddatum, cover, diashow, beschreibung, format, jahr, \'source\'.\'source\', status, season, studio FROM Anime INNER JOIN EintragInfo ON Anime.eintragid = EintragInfo.id INNER JOIN Season ON Anime.seasonid = Season.id INNER JOIN Studio ON Anime.studioid = Studio.id INNER JOIN Format ON EintragInfo.formatid = Format.id INNER JOIN Jahr ON EintragInfo.jahrid = Jahr.id INNER JOIN \'Source\' ON EintragInfo.sourceid = \'Source\'.id INNER JOIN Status ON EintragInfo.statusid = Status.id ORDER BY romaji';
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

    update(id, folgenanzahl, dauer, seasonid, studioid) {
        var sql = 'UPDATE Anime SET folgenanzahl=?, dauer=?, seasonid=?, studioid=?  WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [folgenanzahl, dauer, seasonid, studioid, id];
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