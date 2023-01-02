const helper = require('../helper.js');

class MangaDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT Manga.id, chapteranzahl, volumeanzahl, romaji, englisch, deutsch, startdatum, enddatum, cover, diashow, beschreibung, format, jahr, \'source\'.\'source\', status FROM Manga INNER JOIN EintragInfo ON Manga.eintragid = EintragInfo.id INNER JOIN Format  ON EintragInfo.formatid = Format.id  INNER JOIN Jahr  ON EintragInfo.jahrid = Jahr.id  INNER JOIN \'Source\' ON EintragInfo.sourceid = \'Source\'.id  INNER JOIN Status ON EintragInfo.statusid = Status.id WHERE Manga.id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    MangaExists(romaji = '') {
        var sql = 'SELECT * FROM Manga WHERE romaji=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(romaji);

        if (result === undefined) 
            return false;

        return result;
    }

    latestID(){
        var sql = 'SELECT id FROM Manga ORDER BY id desc LIMIT 1';
        var statement = this._conn.prepare(sql);
        var result = statement.get();
        var a = Object.values(result);
        return a;
    }

    loadAll() {
        var sql = 'SELECT Manga.id, chapteranzahl, volumeanzahl, romaji, englisch, deutsch, startdatum, enddatum, cover, diashow, beschreibung, format, jahr, \'source\'.\'source\', status FROM Manga INNER JOIN EintragInfo ON Manga.eintragid = EintragInfo.id INNER JOIN Format  ON EintragInfo.formatid = Format.id  INNER JOIN Jahr  ON EintragInfo.jahrid = Jahr.id  INNER JOIN \'Source\' ON EintragInfo.sourceid = \'Source\'.id  INNER JOIN Status ON EintragInfo.statusid = Status.id';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM Manga WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(chapteranzahl, volumeanzahl, eintragid) {
        var sql = 'INSERT INTO Manga (chapteranzahl, volumeanzahl, eintragid) VALUES (?,?,?)';
        var statement = this._conn.prepare(sql);
        var params = [chapteranzahl, volumeanzahl, eintragid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, chapteranzahl, volumeanzahl, eintragid) {
        var sql = 'UPDATE Manga SET chapteranzahl=?, volumeanzahl=?, eintragid=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [chapteranzahl, volumeanzahl, eintragid, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM Manga WHERE id=?';
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
        console.log('MangaDao [_conn=' + this._conn + ']');
    }
}

module.exports = MangaDao;