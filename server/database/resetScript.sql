DROP TABLE IF EXISTS EventRegistration;
DROP TABLE IF EXISTS EventTags;
DROP TABLE IF EXISTS Event;
DROP TABLE IF EXISTS User;




CREATE TABLE User (
  UserID bigint unsigned NOT NULL AUTO_INCREMENT,
  username varchar(50) NOT NULL UNIQUE, 
  password varchar(8000) NOT NULL,
  firstName varchar(30) NOT NULL,
  lastName varchar(30) NOT NULL,
  email varchar(50),
  PRIMARY KEY (`UserID`),
  UNIQUE KEY `UserID` (`UserID`)
);

CREATE TABLE Event (
  EventID bigint unsigned NOT NULL AUTO_INCREMENT,
  eventName varchar(50) NOT NULL,
  eventDateTime datetime NOT NULL,
  location varchar(50) NOT NULL,
  description text,
  organiser bigint unsigned,
  price decimal(10,2) NOT NULL,
  PRIMARY KEY (EventID),
  FOREIGN KEY (organiser) REFERENCES User (UserID)
);


CREATE TABLE EventRegistration (
  EventID bigint unsigned NOT NULL,
  UserID bigint unsigned NOT NULL,
  PRIMARY KEY (EventID,UserID),
  KEY UserID (UserID),
  FOREIGN KEY (EventID) REFERENCES Event (EventID),
  FOREIGN KEY (UserID) REFERENCES User (UserID)
);

CREATE TABLE EventTags (
  EventID bigint unsigned NOT NULL,
  tag varchar(30) NOT NULL,
  PRIMARY KEY (EventID,tag),
  FOREIGN KEY (EventID) REFERENCES Event (EventID)
);

