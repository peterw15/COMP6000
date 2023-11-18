INSERT comp6000_09.User (UserID, firstName, lastName, email, username, password) VALUES ("1","TestFirstName","TestLastName","test@gmail.com", "TestUsername", "TestPassword");
INSERT comp6000_09.Authentication (UserID, username, password) VALUES ("1","TestUserName",SHA3("TestPassword"));
