--Anime--
CREATE TABLE Anime (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	animeeintragid INTEGER,
	genreid INTEGER,
	CONSTRAINT animeeintrag FOREIGN KEY(animeeintragid) REFERENCES AnimeEintrag(id),
	CONSTRAINT genre FOREIGN KEY(genreid) REFERENCES Genre(id)
);

--AnimeEintrag--
CREATE TABLE AnimeEintrag (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	romaji TEXT,
	englisch TEXT,
	deutsch TEXT,
	folgenanzahl INTEGER,
	dauer INTEGER,
	startdatum TEXT,
	enddatum TEXT,
	cover TEXT,
	beschreibung TEXT,
	formatid INTEGER,
	seasonid INTEGER,
	jahrid INTEGER,
	sourceid INTEGER,
	statusid INTEGER,
	studioid INTEGER,
	CONSTRAINT format FOREIGN KEY(formatid) REFERENCES Format(id),
	CONSTRAINT season FOREIGN KEY(seasonid) REFERENCES Season(id),
	CONSTRAINT jahr FOREIGN KEY(jahrid) REFERENCES Jahr(id),
	CONSTRAINT "source" FOREIGN KEY(sourceid) REFERENCES "Source"(id),
	CONSTRAINT status FOREIGN KEY(statusid) REFERENCES Status(id),
	CONSTRAINT studio FOREIGN KEY(studioid) REFERENCES Studio(id)
);

-- Format--
CREATE TABLE Format (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	format TEXT NOT NULL
);

-- Genre--
CREATE TABLE Genre (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	genre TEXT NOT NULL
);

-- Jahr--
CREATE TABLE Jahr (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	jahr INTEGER
);

-- Manga--
CREATE TABLE Manga (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	mangaid INTEGER,
	genreid INTEGER,
	CONSTRAINT MangaEintrag FOREIGN KEY(mangaid) REFERENCES MangaEintrag(id),
	CONSTRAINT Genre FOREIGN KEY(genreid) REFERENCES Genre(id)
);

-- MangaEintrag--
CREATE TABLE MangaEintrag (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	romaji TEXT,
	englisch TEXT,
	deutsch TEXT,
	chapteranzahl INTEGER,
	volumeanzahl INTEGER,
	startdatum TEXT,
	enddatum TEXT,
	cover TEXT,
	beschreibung TEXT,
	formatid INTEGER,
	jahrid INTEGER,
	sourceid INTEGER,
	statusid INTEGER,
	CONSTRAINT format FOREIGN KEY(formatid) REFERENCES Format(id),
	CONSTRAINT jahr FOREIGN KEY(jahrid) REFERENCES Jahr(id),
	CONSTRAINT "source" FOREIGN KEY(sourceid) REFERENCES "Source"(id),
	CONSTRAINT status FOREIGN KEY(statusid) REFERENCES Status(id)
);

-- Season--
CREATE TABLE Season (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	season TEXT
);

-- "Source"--
CREATE TABLE "Source" (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	"source" TEXT
);

-- Status--
CREATE TABLE Status (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	status TEXT
);

-- Studio--
CREATE TABLE Studio (	
	id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
	studio TEXT
);