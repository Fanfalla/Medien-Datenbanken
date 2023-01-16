const helper = require('../helper.js');

class AnimeEintragGenreDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    loadById(id) {
        var sql = 'SELECT * FROM AnimeEintragGenre WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by id=' + id);

        return result;
    }

    loadByAnimeEintragId(id) {
        var sql = 'SELECT * FROM AnimeEintragGenre WHERE animeeintragid=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by animeeintragid=' + id);

        return result;
    }

    loadAll() {
        var sql = 'SELECT * FROM AnimeEintragGenre';
        var statement = this._conn.prepare(sql);
        var result = statement.all();

        if (helper.isArrayEmpty(result)) 
            return [];
        
        return result;
    }

    loadAnime(id) {
        console.log(id)
        var sql = 'SELECT AnimeEintragGenre.id, Anime.id, genre FROM AnimeEintragGenre INNER JOIN Anime ON Anime.id = AnimeEintragGenre.animeeintragid INNER JOIN Genre ON AnimeEintragGenre.genreid = Genre.id WHERE animeeintragid=?';
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
        var sql = 'SELECT COUNT(id) AS cnt FROM animeeintraggenre WHERE id=?';
        var statement = this._conn.prepare(sql);
        var result = statement.get(id);

        if (result.cnt == 1) 
            return true;

        return false;
    }

    create(animeid, genreid) {
        var sql = 'INSERT INTO animeeintraggenre (animeeintragid, genreid) VALUES (?,?)';
        var statement = this._conn.prepare(sql);
        var params = [animeid, genreid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not insert new Record. Data: ' + params);

        return this.loadById(result.lastInsertRowid);
    }

    update(id, animeid, genreid) {
        var sql = 'UPDATE animeeintraggenre SET animeid=?, genreid=? WHERE id=?';
        var statement = this._conn.prepare(sql);
        var params = [animeid, genreid];
        var result = statement.run(params);

        if (result.changes != 1) 
            throw new Error('Could not update existing Record. Data: ' + params);

        return this.loadById(id);
    }

    delete(id) {
        try {
            var sql = 'DELETE FROM animeeintraggenre WHERE id=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes != 1) 
                throw new Error('Could not delete Record by id=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by id=' + id + '. Reason: ' + ex.message);
        }
    }

    deleteAnimeEintragId(id) {
        try {
            var sql = 'DELETE FROM animeeintraggenre WHERE animeeintragid=?';
            var statement = this._conn.prepare(sql);
            var result = statement.run(id);

            if (result.changes == 0) 
                throw new Error('Could not delete Record by animeeintragid=' + id);

            return true;
        } catch (ex) {
            throw new Error('Could not delete Record by animeeintragid=' + id + '. Reason: ' + ex.message);
        }
    }

    toString() {
        console.log('GenreDao [_conn=' + this._conn + ']');
    }
}

module.exports = AnimeEintragGenreDao;