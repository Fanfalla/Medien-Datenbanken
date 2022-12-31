const helper = require('../helper.js');

class FillterDao {

    constructor(dbConnection) {
        this._conn = dbConnection;
    }

    getConnection() {
        return this._conn;
    }

    FilterAnime(ids) {
        console.log(ids)

        var genre = "genreid"
        var season = "seasonid"
        var jahr = "jahrid"
        var format = "formatid"
        var source = "sourceid"

        if(ids[0] > 1){
            genre = ids[0]
        }

        if(ids[1] > 1){
            season = ids[1]
        }

        if(ids[2] > 1){
            jahr = ids[2]
        }

        if(ids[3] > 1){
            format = ids[3]
        }

        if(ids[4] > 1){
            source = ids[4]
        }

        console.log(genre)
        console.log(season)
        console.log(source)
        var sql = 'SELECT Anime.id, romaji, cover FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id INNER JOIN EintragInfo ON EintragInfo.id = Anime.eintragid INNER JOIN Season ON Anime.seasonid = Season.id WHERE genreid = ' + genre + ' AND seasonid = ' + season + ' AND jahrid = ' + jahr + ' AND formatid = ' + format + ' AND sourceid = ' + source + ' GROUP  BY Anime.id'
        var statement = this._conn.prepare(sql);
        console.log(statement.get())
        var result = statement.all();

        if (helper.isUndefined(result)) 
            throw new Error('No Record found by Genre=' + genre + ', Season=' + season);

        if (helper.isArrayEmpty(result)){
            console.log(result)
            return [];
        }
        
        return result;
    }
    
    toString() {
        console.log('FillterDao [_conn=' + this._conn + ']');
    }
}

module.exports = FillterDao;