INSERT comp6000_09.User (UserID, firstName, lastName, email) VALUES ("1","TestFirstName","TestLastName","test@gmail.com");
INSERT comp6000_09.Authentication (UserID, username, password) VALUES ("1","TestUserName",SHA3("TestPassword"));
