
DELIMITER $
BEGIN NOT ATOMIC
    IF NOT EXISTS (SELECT *
FROM information_schema.tables
WHERE table_schema = 'manager' 
    AND table_name = 'Users'
LIMIT 1) THEN 
   CREATE TABLE Users (
	UserId INT NOT NULL AUTO_INCREMENT,
	Name VARCHAR(20),
	Email VARCHAR(30),
	PRIMARY KEY (UserId)
);
    END IF;
END $
DELIMITER ;

DELIMITER $
BEGIN NOT ATOMIC
    IF NOT EXISTS (SELECT *
FROM information_schema.tables
WHERE table_schema = 'manager' 
    AND table_name = 'Searches'
LIMIT 1) THEN 
	CREATE TABLE Searches (
	SearchId INT NOT NULL AUTO_INCREMENT,
	DOI VARCHAR(40),
	UserId INT NOT NULL,
	PRIMARY KEY (SearchId),
	CONSTRAINT FK_UserId_Users FOREIGN KEY (UserId) REFERENCES Users(UserId)
	);
    END IF;
END $
DELIMITER ;

DELIMITER $
BEGIN NOT ATOMIC
    IF NOT EXISTS (SELECT *
FROM information_schema.tables
WHERE table_schema = 'manager' 
    AND table_name = 'Citations'
LIMIT 1) THEN 
	CREATE TABLE Citations (
	CitationId INT NOT NULL AUTO_INCREMENT,
	Title VARCHAR(40),
	Text VARCHAR(80),
	SearchId INT NOT NULL,
	PRIMARY KEY (CitationId),
	CONSTRAINT FK_SearchId_Search FOREIGN KEY (SearchId) REFERENCES Searches(SearchId)
	);
    END IF;
END $
DELIMITER ;
