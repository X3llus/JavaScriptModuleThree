CREATE TABLE availability (
  `id` INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
  `propertyId` int not null,
  `startDate` DATE not null,
  `endDate` DATE not null,
  FOREIGN KEY (propertyId) REFERENCES properties (id)
);
