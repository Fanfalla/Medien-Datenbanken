const helper = require('../helper.js');

class MangaGenreDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM MangaGenre WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    
    loadByMangaId(id) {
        var sql = 'SELECT * FROM MangaGenre WHERE mangaid=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by mangaid=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM MangaGenre';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    loadManga(id) {
        console.log(id)
        var sql = 'SELECT MangaGenre.id, Manga.id, genre FROM MangaGenre INNER JOIN Manga ON Manga.id = MangaGenre.mangaid INNER JOIN Genre ON MangaGenre.genreid = Genre.id WHERE mangaid=?';
        var statement = this._conn.prepare(sql);
        var result = statement.all(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        if (helper.isArrayEmpty(result)){
            console.log(result)
            return [];
        }
        
        return result;
    }

    exists(id) {
        var sql = 'SELECT COUNT(id) AS cnt FROM MangaGenre WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(mangaid, genreid) {
        var sql = 'INSERT INTO MangaGenre (mangaid, genreid) VALUES (?,?)';
        var statement = this._conn.prepare(sql);
        var params = [mangaid, genreid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, mangaid, genreid) {
        var sql = 'UPDATE MangaGenre SET mangaid=?, genreid=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [mangaid, genreid, id];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM MangaGenre WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    deleteMangaEintragId(id) {
        try {
            var sql = 'DELETE FROM mangagenre WHERE mangaid=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes == 0) 
                throw new Error('Could not delete Record by mangaid=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by mangaid=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('MangaGenreDao [_conn=' + this._conn + ']');
    }
}

module.exports = MangaGenreDao;