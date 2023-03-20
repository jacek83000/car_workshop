CREATE SCHEMA IF NOT EXISTS `car_workshop-mysql2`;

CREATE TABLE IF NOT EXISTS `car_workshop-mysql2`.`Car` 
    (   `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
        `name` VARCHAR(50) NOT NULL ,
        `mileage` VARCHAR(50) NOT NULL ,
        `color` VARCHAR(50) NOT NULL ,
        PRIMARY KEY (`_id`),
        UNIQUE INDEX `cr_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `car_workshop-mysql2`.`Mechanic` 
    (   `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
        `firstName` VARCHAR(50) NOT NULL ,
        `lastName` VARCHAR(50) NOT NULL ,
        `email` VARCHAR(50) NOT NULL ,
        `password` VARCHAR(50) NOT NULL,
        PRIMARY KEY (`_id`),
        UNIQUE INDEX `mc_id_UNIQUE` (`_id` ASC)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

CREATE TABLE IF NOT EXISTS `car_workshop-mysql2`. `Repair` 
    (   `_id` INT UNSIGNED NOT NULL AUTO_INCREMENT ,
        `startDate` DATE NOT NULL ,
        `expectedEndDate` DATE NOT NULL ,
        `price` DECIMAL(10,2) UNSIGNED NOT NULL ,
        `description` VARCHAR(100) NULL ,
        `cr_id` INT UNSIGNED NOT NULL ,
     	`mc_id` INT UNSIGNED NOT NULL ,
        PRIMARY KEY (`_id`),
        UNIQUE INDEX `rep_id_UNIQUE` (`_id` ASC),
        CONSTRAINT `cr_fk` FOREIGN KEY (`cr_id`) REFERENCES `car_workshop-mysql2`.`Car` (`_id`),
        CONSTRAINT `mc_fk` FOREIGN KEY (`mc_id`) REFERENCES `car_workshop-mysql2`.`Mechanic` (`_id`)
    ) ENGINE = InnoDB CHARSET=utf8 COLLATE utf8_general_ci;

INSERT IGNORE INTO `car_workshop-mysql2`.`Car` 
    (`_id`, `name`, `mileage`, `color`) VALUES 
    (1, 'Audi A3', 123000, 'Czerwony'),
    (2, 'BMW X5', 220000, 'Niebieski')
;

INSERT IGNORE INTO `car_workshop-mysql2`.`Mechanic` 
    (`_id`, `firstName`, `lastName`, `email`, `password`) VALUES 
    (1, 'Maciej', 'Zieliński', 'maciej.zielinski@ryc.com', '12345'),
    (2, 'Krzysztof', 'Nowak', 'krzysztof.nowak@ryc.com', '123')
;
INSERT IGNORE INTO `car_workshop-mysql2`.`Repair` 
    (`_id`, `cr_id`, `mc_id`, `startDate`, `expectedEndDate`,`price`,`description`) VALUES
    (1, 1, 1, '2022-10-25', '2022-11-02', 200, 'Wymiana tłumika'),
    (2, 1, 2, '2022-11-30', '2022-12-10', 500, null),
    (3, 2, 1, '2022-11-03', '2022-11-30', 3000, 'Wymiana hamulców')
;