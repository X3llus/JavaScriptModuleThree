CREATE TABLE users (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `fName` VARCHAR(50) NOT NULL,
  `lName` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) UNIQUE NOT NULL,
  `password` CHAR(60),
  `superhost` char(1) default 'f'
);
