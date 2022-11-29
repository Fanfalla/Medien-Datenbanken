--Anime--
INSERT INTO Anime (animeeintragid, genreid) VALUES (1, 1);
INSERT INTO Anime (animeeintragid, genreid) VALUES (1, 2);
INSERT INTO Anime (animeeintragid, genreid) VALUES (1, 3);
INSERT INTO Anime (animeeintragid, genreid) VALUES (1, 4);
INSERT INTO Anime (animeeintragid, genreid) VALUES (1, 6);

--AnimeEintrag--
INSERT INTO AnimeEintrag
(romaji, englisch, deutsch, folgenanzahl, dauer, startdatum, enddatum, cover, beschreibung, formatid, seasonid, jahrid, sourceid, statusid)
VALUES('ONE PIECE', 'ONE PIECE', 'ONE PIECE', 1042, 24, '1999-10-20', '', '', 'Gold Roger was known as the Pirate King, the strongest and most infamous being to have sailed 
the Grand Line. The capture and death of Roger by the World Government brought a change throughout the world. His last words before his death revealed the location of the 
greatest treasure in the world, One Piece. It was this revelation that brought about the Grand Age of Pirates, men who dreamed of finding One Piece (which promises an unlimited 
amount of riches and fame), and quite possibly the most coveted of titles for the person who found it, the title of the Pirate King. Enter Monkey D. Luffy, a 17-year-old boy that 
defies your standard definition of a pirate. Rather than the popular persona of a wicked, hardened, toothless pirate who ransacks villages for fun, Luffy’s reason for being a 
pirate is one of pure wonder; the thought of an exciting adventure and meeting new and intriguing people, along with finding One Piece, are his reasons of becoming a pirate. 
Following in the footsteps of his childhood hero, Luffy and his crew travel across the Grand Line, experiencing crazy adventures, unveiling dark mysteries and battling 
strong enemies, all in order to reach One Piece', 1, 4, 1, 1, 2);

--Format--
INSERT INTO Format (format) VALUES('TV');
INSERT INTO Format (format) VALUES('TV Short');
INSERT INTO Format (format) VALUES('Movie');
INSERT INTO Format (format) VALUES('OVA');
INSERT INTO Format (format) VALUES('Special');
INSERT INTO Format (format) VALUES('ONA');
INSERT INTO Format (format) VALUES('Music');
INSERT INTO Format (format) VALUES('Manga');
INSERT INTO Format (format) VALUES('Light Novel');
INSERT INTO Format (format) VALUES('One Shot');

--Genre--
INSERT INTO Genre (genre) VALUES('Action');
INSERT INTO Genre (genre) VALUES('Adventure');
INSERT INTO Genre (genre) VALUES('Comedy');
INSERT INTO Genre (genre) VALUES('Drama');
INSERT INTO Genre (genre) VALUES('Ecchi');
INSERT INTO Genre (genre) VALUES('Fantasy');
INSERT INTO Genre (genre) VALUES('Horror');
INSERT INTO Genre (genre) VALUES('Mahou Shoujo');
INSERT INTO Genre (genre) VALUES('Mecha');
INSERT INTO Genre (genre) VALUES('Music');
INSERT INTO Genre (genre) VALUES('Mystery');
INSERT INTO Genre (genre) VALUES('Psychological');
INSERT INTO Genre (genre) VALUES('Romance');
INSERT INTO Genre (genre) VALUES('Sci-Fi');
INSERT INTO Genre (genre) VALUES('Slice of Life');
INSERT INTO Genre (genre) VALUES('Sport');
INSERT INTO Genre (genre) VALUES('Supernatural');
INSERT INTO Genre (genre) VALUES('Thriller');

--Jahr--
INSERT INTO Jahr (jahr) VALUES(1999);
INSERT INTO Jahr (jahr) VALUES(2000);
INSERT INTO Jahr (jahr) VALUES(2001);
INSERT INTO Jahr (jahr) VALUES(2002);
INSERT INTO Jahr (jahr) VALUES(2003);
INSERT INTO Jahr (jahr) VALUES(2004);
INSERT INTO Jahr (jahr) VALUES(2005);
INSERT INTO Jahr (jahr) VALUES(2006);
INSERT INTO Jahr (jahr) VALUES(2007);
INSERT INTO Jahr (jahr) VALUES(2008;
INSERT INTO Jahr (jahr) VALUES(2009);
INSERT INTO Jahr (jahr) VALUES(2010);
INSERT INTO Jahr (jahr) VALUES(2011);
INSERT INTO Jahr (jahr) VALUES(2012);
INSERT INTO Jahr (jahr) VALUES(2013);
INSERT INTO Jahr (jahr) VALUES(2014);
INSERT INTO Jahr (jahr) VALUES(2015);
INSERT INTO Jahr (jahr) VALUES(2016);
INSERT INTO Jahr (jahr) VALUES(2017);
INSERT INTO Jahr (jahr) VALUES(2018);
INSERT INTO Jahr (jahr) VALUES(2019);
INSERT INTO Jahr (jahr) VALUES(2020);
INSERT INTO Jahr (jahr) VALUES(2021);
INSERT INTO Jahr (jahr) VALUES(2022);
INSERT INTO Jahr (jahr) VALUES(2023);

--Manga--
INSERT INTO Manga (mangaid, genreid) VALUES(1, 1);
INSERT INTO Manga (mangaid, genreid) VALUES(1, 2);
INSERT INTO Manga (mangaid, genreid) VALUES(1, 3);

--MangaEintrag--
INSERT INTO MangaEintrag(romaji, englisch, deutsch, chapteranzahl, volumeanzahl, startdatum, enddatum, cover, beschreibung, formatid, jahrid, sourceid, statusid)
VALUES('Pocket Monsters: Satoshi to Gou no Monogatari!', 'Pokémon Journeys: The Series', 'Pokémon Reisen', 24, 4, '2019-11-15', '2021-10-15', '', 'A new Pocket Monsters 
manga based on the 2019 Pocket Monsters anime.', 8, 21, 12, 1);

--Season--
INSERT INTO Season (season) VALUES('Winter');
INSERT INTO Season (season) VALUES('Spring');
INSERT INTO Season (season) VALUES('Summer');
INSERT INTO Season (season) VALUES('Fall');

--Source--
INSERT INTO "Source" ("source") VALUES('Manga');
INSERT INTO "Source" ("source") VALUES('Light Novel');
INSERT INTO "Source" ("source") VALUES('Original');
INSERT INTO "Source" ("source") VALUES('Web Novel');
INSERT INTO "Source" ("source") VALUES('Novel');
INSERT INTO "Source" ("source") VALUES('Visual Novel');
INSERT INTO "Source" ("source") VALUES('Video Game');
INSERT INTO "Source" ("source") VALUES('Doujinshi');
INSERT INTO "Source" ("source") VALUES('Comic');
INSERT INTO "Source" ("source") VALUES('Live Action');
INSERT INTO "Source" ("source") VALUES('Multimedia Project');
INSERT INTO "Source" ("source") VALUES('Anime');

--Status--
INSERT INTO Status (status) VALUES('Finished');
INSERT INTO Status (status) VALUES('Releasing');
INSERT INTO Status (status) VALUES('Not Yet Released');

--Studio--
INSERT INTO Studio (studio) VALUES('MADHOUSE');
INSERT INTO Studio (studio) VALUES('bones');
INSERT INTO Studio (studio) VALUES('Studio Pierrot');