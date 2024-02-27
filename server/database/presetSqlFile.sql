SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS comp6000_09.EventRegistration;
DROP TABLE IF EXISTS comp6000_09.EventTags;
DROP TABLE IF EXISTS comp6000_09.Event;
DROP TABLE IF EXISTS comp6000_09.User;
DROP TABLE IF EXISTS comp6000_09.UserTags;
DROP TABLE IF EXISTS comp6000_09.Societies;
DROP TABLE IF EXISTS comp6000_09.societiesTag;
SET FOREIGN_KEY_CHECKS = 1;

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
  organiser bigint unsigned NOT NULL,
  price decimal(10,2) NOT NULL,
  imageURL varchar(50) NOT NULL DEFAULT 'eventIcons/pin.png',
  UNIQUE (eventName, eventDateTime, location, organiser),
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

CREATE TABLE UserTags (
  UserID bigint unsigned NOT NULL,
  tag varchar(30) NOT NULL,
  PRIMARY KEY (UserID,tag),
  FOREIGN KEY (UserID) REFERENCES User (UserID)
);

CREATE TABLE Societies (
    SocietiesID INT PRIMARY KEY AUTO_INCREMENT,
    socName VARCHAR(255) NOT NULL,
    socDateTime DATETIME NOT NULL,
    socLocation VARCHAR(255),
    socDescription TEXT,
    socOrganiser VARCHAR(100),
    socPrice DECIMAL(10, 2),
    socLink VARCHAR(255)
);

CREATE TABLE societiesTag (
    tagID INT PRIMARY KEY AUTO_INCREMENT,
    SocietiesID INT,
    tag VARCHAR(30) NOT NULL,
    FOREIGN KEY (SocietiesID) REFERENCES Societies(SocietiesID)
);


INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("1","Test","Test","Test@gmail.com", "Test", sha2("Test", 256)); 
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("2","Peter","Wright","pw@gmail.com", "Peter", sha2("Peter", 256)); 
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("3", "John", "Doe", "jd@example.com", "johnd", SHA2("johnd", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("4", "Alice", "Smith", "alice.smith@example.com", "asmith", SHA2("asmith", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("5", "Michael", "Johnson", "m.johnson@example.com", "mikej", SHA2("mikej", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("6", "Emily", "Brown", "ebrown@example.com", "emilyb", SHA2("emilyb", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("7", "Christopher", "Wilson", "chris.w@example.com", "cwilson", SHA2("cwilson", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("8", "Sarah", "Taylor", "sarah.t@example.com", "saraht", SHA2("saraht", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("9", "David", "Martinez", "david.m@example.com", "dmartinez", SHA2("dmartinez", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("10", "Jessica", "Lee", "jess.lee@example.com", "jessl", SHA2("jessl", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("11", "Daniel", "Garcia", "daniel.g@example.com", "dgarcia", SHA2("dgarcia", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("12", "Jennifer", "Clark", "jen.clark@example.com", "jenniferc", SHA2("jenniferc", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("13", "Matthew", "Rodriguez", "matt.rodr@example.com", "mrodriguez", SHA2("mrodriguez", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("14", "Amanda", "Hernandez", "amanda.h@example.com", "amandah", SHA2("amandah", 256));
INSERT INTO comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("15", "Ryan", "Young", "ryan.y@example.com", "ryany", SHA2("ryany", 256));

INSERT INTO comp6000_09.Event (eventName,eventDateTime,location,description,organiser,price, imageURL) VALUES ("Boxing","2024-03-10 09:30:00","Sports Hall","Boxing for all skill levels!","1","3.50", "eventIcons/basketball.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Basketball Tournament", "2024-03-10 09:00:00", "Basketball Court", "Join us for an exciting basketball tournament!", "2", "5.00", "eventIcons/basketball.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Yoga Class", "2024-03-05 18:30:00", "Yoga Studio", "Relax and unwind in our rejuvenating yoga class.", "3", "7.00", "eventIcons/mind.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Movie Night", "2024-03-08 20:00:00", "Auditorium", "Enjoy a movie night with friends and family!", "4", "3.00", "eventIcons/sofa.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Cooking Workshop", "2024-03-06 11:00:00", "Kitchen Studio", "Learn to cook delicious dishes from expert chefs.", "5", "10.00", "eventIcons/apple.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Music Concert", "2024-03-11 19:30:00", "Concert Hall", "Experience an unforgettable night of live music performances.", "6", "15.00", "eventIcons/music.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Art Exhibition", "2024-03-09 10:00:00", "Art Gallery", "Discover stunning artworks from talented artists.", "7", "4.50", "eventIcons/paintbrush.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Dance Workshop", "2024-03-07 15:00:00", "Dance Studio", "Learn new dance moves and techniques!", "8", "6.50", "eventIcons/shoe.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Soccer Match", "2024-03-12 16:00:00", "Soccer Field", "Cheer for your favorite team in an exciting soccer match!", "9", "4.00", "eventIcons/basketball.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Gardening Workshop", "2024-03-04 12:00:00", "Botanical Garden", "Learn essential gardening tips and tricks.", "10", "8.00", "eventIcons/water.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Fashion Show", "2024-03-13 19:00:00", "Fashion Hall", "Witness the latest trends on the runway!", "11", "12.00", "eventIcons/tags.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Cooking Competition", "2024-03-14 14:00:00", "Culinary School", "Compete with other chefs and showcase your culinary skills.", "12", "20.00", "eventIcons/apple.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Hiking Adventure", "2024-03-15 09:00:00", "Nature Reserve", "Embark on an exciting hiking journey through scenic trails.", "13", "3", "eventIcons/pin.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Photography Workshop", "2024-03-16 10:30:00", "Photography Studio", "Learn photography techniques from professional photographers.", "14", "9.50", "eventIcons/monitor.png");
INSERT INTO comp6000_09.Event (eventName, eventDateTime, location, description, organiser, price, imageURL) VALUES ("Science Fair", "2024-03-17 11:00:00", "Science Museum", "Explore fascinating scientific exhibits and experiments.", "15", "3.50", "eventIcons/science.png");

INSERT INTO comp6000_09.EventRegistration VALUES (7, 12);
INSERT INTO comp6000_09.EventRegistration VALUES (7, 7);
INSERT INTO comp6000_09.EventRegistration VALUES (2, 3);
INSERT INTO comp6000_09.EventRegistration VALUES (9, 3);
INSERT INTO comp6000_09.EventRegistration VALUES (4, 6);
INSERT INTO comp6000_09.EventRegistration VALUES (5, 2);
INSERT INTO comp6000_09.EventRegistration VALUES (3, 10);
INSERT INTO comp6000_09.EventRegistration VALUES (1, 13);
INSERT INTO comp6000_09.EventRegistration VALUES (6, 9);
INSERT INTO comp6000_09.EventRegistration VALUES (2, 4);
INSERT INTO comp6000_09.EventRegistration VALUES (8, 11);
INSERT INTO comp6000_09.EventRegistration VALUES (10, 5);
INSERT INTO comp6000_09.EventRegistration VALUES (9, 7);
INSERT INTO comp6000_09.EventRegistration VALUES (8, 14);
INSERT INTO comp6000_09.EventRegistration VALUES (3, 1);
INSERT INTO comp6000_09.EventRegistration VALUES (3, 6);
INSERT INTO comp6000_09.EventRegistration VALUES (2, 2);
INSERT INTO comp6000_09.EventRegistration VALUES (1, 8);
INSERT INTO comp6000_09.EventRegistration VALUES (4, 10);
INSERT INTO comp6000_09.EventRegistration VALUES (4, 15);
INSERT INTO comp6000_09.EventRegistration VALUES (1, 3);
INSERT INTO comp6000_09.EventRegistration VALUES (3, 13);
INSERT INTO comp6000_09.EventRegistration VALUES (1, 9);
INSERT INTO comp6000_09.EventRegistration VALUES (6, 4);
INSERT INTO comp6000_09.EventRegistration VALUES (2, 11);
INSERT INTO comp6000_09.EventRegistration VALUES (8, 5);
INSERT INTO comp6000_09.EventRegistration VALUES (10, 7);
INSERT INTO comp6000_09.EventRegistration VALUES (6, 12);
INSERT INTO comp6000_09.EventRegistration VALUES (4,13);
INSERT INTO comp6000_09.EventRegistration VALUES (1, 5);
INSERT INTO comp6000_09.EventRegistration VALUES (2, 12);
INSERT INTO comp6000_09.EventRegistration VALUES (3, 3);
INSERT INTO comp6000_09.EventRegistration VALUES (4, 9);
INSERT INTO comp6000_09.EventRegistration VALUES (5, 7);
INSERT INTO comp6000_09.EventRegistration VALUES (6, 1);
INSERT INTO comp6000_09.EventRegistration VALUES (7, 14);
INSERT INTO comp6000_09.EventRegistration VALUES (8, 10);
INSERT INTO comp6000_09.EventRegistration VALUES (9, 6);
INSERT INTO comp6000_09.EventRegistration VALUES (10, 8);
INSERT INTO comp6000_09.EventRegistration VALUES (7, 2);
INSERT INTO comp6000_09.EventRegistration VALUES (3, 15);
INSERT INTO comp6000_09.EventRegistration VALUES (1, 11);
INSERT INTO comp6000_09.EventRegistration VALUES (5, 4);
INSERT INTO comp6000_09.EventRegistration VALUES (8, 13);
INSERT INTO comp6000_09.EventRegistration VALUES (2, 7);
INSERT INTO comp6000_09.EventRegistration VALUES (6, 3);
INSERT INTO comp6000_09.EventRegistration VALUES (1, 14);
INSERT INTO comp6000_09.EventRegistration VALUES (1, 6);
INSERT INTO comp6000_09.EventRegistration VALUES (10, 15);
INSERT INTO comp6000_09.EventRegistration VALUES (10, 1);
INSERT INTO comp6000_09.EventRegistration VALUES (10, 11);