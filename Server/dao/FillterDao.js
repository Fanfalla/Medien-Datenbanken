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

        var season = "seasonid"
        var jahr = "jahrid"
        var format = "formatid"
        var source = "sourceid"
        let selectedtext = ""
        var selectedOrder = "romaji"
        var folgenanzahl = 0
        
        var genre1 = "genreid"
        var genre2 = "genreid"
        var genre3 = "genreid"
        var genre4 = "genreid"
        var genre5 = "genreid"
        var genre6 = "genreid"
        var genre7 = "genreid"
        var genre8 = "genreid"
        var genre9 = "genreid"
        var genre10 = "genreid"
        var genre11 = "genreid"
        var genre12 = "genreid"
        var genre13 = "genreid"
        var genre14 = "genreid"
        var genre15 = "genreid"
        var genre16 = "genreid"
        var genre17 = "genreid"
        var genre18 = "genreid"

        if(ids[0] > 1){
            season = ids[0]
        }

        if(ids[1] > 1){
            jahr = ids[1]
        }

        if(ids[2] > 1){
            format = ids[2]
        }

        if(ids[3] > 1){
            source = ids[3]
        }

        if(ids[4] != ""){
            selectedtext = ids[4]
        }

        if(ids[6] > 0){

            if(ids[6] == 1){
                selectedOrder = "romaji ASC"
            }

            if(ids[6] == 2){
                selectedOrder = "startdatum ASC"
            }

            if(ids[6] == 3){
                selectedOrder = "startdatum DESC"
            }

            if(ids[6] == 4){
                selectedOrder = "folgenanzahl ASC, romaji ASC"
            }

            if(ids[6] == 5){
                folgenanzahl = 1
                selectedOrder = "folgenanzahl DESC, romaji ASC"
            }

        }
        
        var arr = ids[5].split("&")

        if(arr[0] > 1){
            genre1 = arr[0]
        }

        if(arr[1] > 1){
            genre2 = arr[1]
        }
        
        if(arr[2] > 1){
            genre3 = arr[2]
        }
        
        if(arr[3] > 1){
            genre4 = arr[3]
        }
        
        if(arr[4] > 1){
            genre5 = arr[4]
        }
        
        if(arr[5] > 1){
            genre6 = arr[5]
        }
        
        if(arr[6] > 1){
            genre7 = arr[6]
        }
        
        if(arr[7] > 1){
            genre8 = arr[7]
        }
        
        if(arr[8] > 1){
            genre9 = arr[8]
        }
        
        if(arr[9] > 1){
            genre10 = arr[9]
        }
        
        if(arr[10] > 1){
            genre11 = arr[10]
        }
        
        if(arr[11] > 1){
            genre12 = arr[11]
        }
        
        if(arr[12] > 1){
            genre13 = arr[12]
        }
        
        if(arr[13] > 1){
            genre14 = arr[13]
        }
        
        if(arr[14] > 1){
            genre15 = arr[14]
        }
        
        if(arr[15] > 1){
            genre16 = arr[15]
        }
        
        if(arr[16] > 1){
            genre17 = arr[16]
        }
        
        if(arr[17] > 1){
            genre18 = arr[17]
        }
        
        var sql = 'SELECT Anime.id, romaji, cover FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id INNER JOIN EintragInfo ON EintragInfo.id = Anime.eintragid INNER JOIN Season ON Anime.seasonid = Season.id WHERE Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre1 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre2 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre3 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre4 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre5 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre6 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre7 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre8 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre9 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre10 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre11 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre12 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre13 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre14 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre15 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre16 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre17 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre18 + ') AND seasonid = ' + season + ' AND jahrid = ' + jahr + ' AND formatid = ' + format + ' AND sourceid = ' + source + ' And romaji LIKE \'%' + selectedtext + '%\' AND folgenanzahl != ' + folgenanzahl + ' GROUP BY Anime.id ORDER BY ' + selectedOrder;
        var statement = this._conn.prepare(sql);
        console.log(statement.get())
        var result = statement.all();

        if (helper.isUndefined(result)) 
            throw new Error('No Record found');

        if (helper.isArrayEmpty(result)){
            console.log(result)
            return [];
        }
        
        return result;
    }

    FilterAnimeList(ids) {
        console.log(ids)

        var season = "seasonid"
        var jahr = "jahrid"
        var format = "formatid"
        var source = "sourceid"
        let selectedtext = ""
        var selectedOrder = "romaji"
        var folgenanzahl = 0
        
        var genre1 = "genreid"
        var genre2 = "genreid"
        var genre3 = "genreid"
        var genre4 = "genreid"
        var genre5 = "genreid"
        var genre6 = "genreid"
        var genre7 = "genreid"
        var genre8 = "genreid"
        var genre9 = "genreid"
        var genre10 = "genreid"
        var genre11 = "genreid"
        var genre12 = "genreid"
        var genre13 = "genreid"
        var genre14 = "genreid"
        var genre15 = "genreid"
        var genre16 = "genreid"
        var genre17 = "genreid"
        var genre18 = "genreid"

        if(ids[0] > 1){
            season = ids[0]
        }

        if(ids[1] > 1){
            jahr = ids[1]
        }

        if(ids[2] > 1){
            format = ids[2]
        }

        if(ids[3] > 1){
            source = ids[3]
        }

        if(ids[4] != ""){
            selectedtext = ids[4]
        }

        if(ids[6] > 0){

            if(ids[6] == 1){
                selectedOrder = "romaji ASC"
            }

            if(ids[6] == 2){
                selectedOrder = "startdatum ASC"
            }

            if(ids[6] == 3){
                selectedOrder = "startdatum DESC"
            }

            if(ids[6] == 4){
                selectedOrder = "folgenanzahl ASC, romaji ASC"
            }

            if(ids[6] == 5){
                folgenanzahl = 1
                selectedOrder = "folgenanzahl DESC, romaji ASC"
            }

        }

        var accountid = ids[7]
        var liststatusid = ids[8]
        console.log('---------------------->' + accountid + ', ' + liststatusid)
        
        var arr = ids[5].split("&")

        if(arr[0] > 1){
            genre1 = arr[0]
        }

        if(arr[1] > 1){
            genre2 = arr[1]
        }
        
        if(arr[2] > 1){
            genre3 = arr[2]
        }
        
        if(arr[3] > 1){
            genre4 = arr[3]
        }
        
        if(arr[4] > 1){
            genre5 = arr[4]
        }
        
        if(arr[5] > 1){
            genre6 = arr[5]
        }
        
        if(arr[6] > 1){
            genre7 = arr[6]
        }
        
        if(arr[7] > 1){
            genre8 = arr[7]
        }
        
        if(arr[8] > 1){
            genre9 = arr[8]
        }
        
        if(arr[9] > 1){
            genre10 = arr[9]
        }
        
        if(arr[10] > 1){
            genre11 = arr[10]
        }
        
        if(arr[11] > 1){
            genre12 = arr[11]
        }
        
        if(arr[12] > 1){
            genre13 = arr[12]
        }
        
        if(arr[13] > 1){
            genre14 = arr[13]
        }
        
        if(arr[14] > 1){
            genre15 = arr[14]
        }
        
        if(arr[15] > 1){
            genre16 = arr[15]
        }
        
        if(arr[16] > 1){
            genre17 = arr[16]
        }
        
        if(arr[17] > 1){
            genre18 = arr[17]
        }
        
        var sql = 'SELECT Anime.id, romaji, cover, folgenanzahl, folgen, format.format FROM AnimeListe INNER JOIN Anime On AnimeListe.animeid = anime.id INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id INNER JOIN EintragInfo ON EintragInfo.id = Anime.eintragid INNER JOIN Format ON Format.id = eintraginfo.formatid INNER JOIN Season ON Anime.seasonid = Season.id WHERE Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre1 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre2 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre3 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre4 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre5 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre6 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre7 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre8 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre9 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre10 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre11 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre12 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre13 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre14 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre15 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre16 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre17 + ') AND Anime.id IN (SELECT Anime.id FROM Anime INNER JOIN AnimeEintragGenre ON AnimeEintragGenre.animeeintragid = Anime.id WHERE genreid = ' + genre18 + ') AND seasonid = ' + season + ' AND jahrid = ' + jahr + ' AND formatid = ' + format + ' AND sourceid = ' + source + ' And romaji LIKE \'%' + selectedtext + '%\' AND folgenanzahl != ' + folgenanzahl + ' AND accountid = ' + accountid + ' AND liststatusid = ' + liststatusid + ' GROUP BY Anime.id ORDER BY ' + selectedOrder;
        var statement = this._conn.prepare(sql);
        console.log(statement.get())
        var result = statement.all();

        if (helper.isUndefined(result)) 
            throw new Error('No Record found');

        if (helper.isArrayEmpty(result)){
            console.log(result)
            return [];
        }
        
        return result;
    }

    FilterManga(ids) {
        console.log(ids)

        var jahr = "jahrid"
        var format = "formatid"
        var source = "sourceid"
        let selectedtext = ""
        var selectedOrder = "romaji"
        var chapteranzahl = 0
        
        var genre1 = "genreid"
        var genre2 = "genreid"
        var genre3 = "genreid"
        var genre4 = "genreid"
        var genre5 = "genreid"
        var genre6 = "genreid"
        var genre7 = "genreid"
        var genre8 = "genreid"
        var genre9 = "genreid"
        var genre10 = "genreid"
        var genre11 = "genreid"
        var genre12 = "genreid"
        var genre13 = "genreid"
        var genre14 = "genreid"
        var genre15 = "genreid"
        var genre16 = "genreid"
        var genre17 = "genreid"
        var genre18 = "genreid"

        if(ids[0] > 1){
            jahr = ids[0]
        }

        if(ids[1] > 1){
            format = ids[1]
        }

        if(ids[2] > 1){
            source = ids[2]
        }

        if(ids[3] != ""){
            selectedtext = ids[3]
        }

        if(ids[5] > 0){

            if(ids[5] == 1){
                selectedOrder = "romaji ASC"
            }

            if(ids[5] == 2){
                selectedOrder = "startdatum ASC"
            }

            if(ids[5] == 3){
                selectedOrder = "startdatum DESC"
            }

            if(ids[5] == 4){
                selectedOrder = "chapteranzahl ASC, romaji ASC"
            }

            if(ids[5] == 5){
                chapteranzahl = 1
                selectedOrder = "chapteranzahl DESC, romaji ASC"
            }

            if(ids[5] == 6){
                selectedOrder = "volumeanzahl ASC, romaji ASC"
            }

            if(ids[5] == 7){
                selectedOrder = "volumeanzahl DESC, romaji ASC"
            }

        }
        
        var arr = ids[4].split("&")

        if(arr[0] > 1){
            genre1 = arr[0]
        }

        if(arr[1] > 1){
            genre2 = arr[1]
        }
        
        if(arr[2] > 1){
            genre3 = arr[2]
        }
        
        if(arr[3] > 1){
            genre4 = arr[3]
        }
        
        if(arr[4] > 1){
            genre5 = arr[4]
        }
        
        if(arr[5] > 1){
            genre6 = arr[5]
        }
        
        if(arr[6] > 1){
            genre7 = arr[6]
        }
        
        if(arr[7] > 1){
            genre8 = arr[7]
        }
        
        if(arr[8] > 1){
            genre9 = arr[8]
        }
        
        if(arr[9] > 1){
            genre10 = arr[9]
        }
        
        if(arr[10] > 1){
            genre11 = arr[10]
        }
        
        if(arr[11] > 1){
            genre12 = arr[11]
        }
        
        if(arr[12] > 1){
            genre13 = arr[12]
        }
        
        if(arr[13] > 1){
            genre14 = arr[13]
        }
        
        if(arr[14] > 1){
            genre15 = arr[14]
        }
        
        if(arr[15] > 1){
            genre16 = arr[15]
        }
        
        if(arr[16] > 1){
            genre17 = arr[16]
        }
        
        if(arr[17] > 1){
            genre18 = arr[17]
        }
        
        var sql = 'SELECT Manga.id, romaji, cover FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id INNER JOIN EintragInfo ON EintragInfo.id = Manga.eintragid WHERE Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre1 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre2 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre3 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre4 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre5 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre6 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre7 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.Mangaid = Manga.id WHERE genreid = ' + genre8 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre9 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre10 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre11 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre12 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre13 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre14 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre15 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre16 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre17 + ') AND Manga.id IN (SELECT Manga.id FROM Manga INNER JOIN MangaGenre ON MangaGenre.mangaid = Manga.id WHERE genreid = ' + genre18 + ') AND jahrid = ' + jahr + ' AND formatid = ' + format + ' AND sourceid = ' + source + ' AND romaji LIKE \'%' + selectedtext + '%\' AND chapteranzahl > ' + chapteranzahl + ' GROUP BY Manga.id ORDER BY ' + selectedOrder;
        var statement = this._conn.prepare(sql);
        console.log(statement.get())
        var result = statement.all();

        if (helper.isUndefined(result)) 
            throw new Error('No Record found');

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