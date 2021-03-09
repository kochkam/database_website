
CREATE TABLE Studios (
    studio_id int(11) AUTO_INCREMENT NOT NULL,
    studio_name varchar(255) NOT NULL, 
    PRIMARY KEY (studio_id)
);


CREATE TABLE StudioKeys (
    studio_key int(11) AUTO_INCREMENT NOT NULL,
    studio_id int(11) NOT NULL, 
    PRIMARY KEY (studio_key),
    FOREIGN KEY (studio_id) REFERENCES Studios (studio_id)
    ON UPDATE CASCADE
    ON DELETE CASCADE 
);

CREATE TABLE VideoGames(
    video_game_id int(11) AUTO_INCREMENT NOT NULL, 
    studio_key int(11) NOT NULL, 
    game_title varchar(255) NOT NULL,
    price int(11) NOT NULL,
    vg_rating int(11) NOT NULL,
    quantity int(11) NOT NULL,
    PRIMARY KEY (video_game_id),
    FOREIGN KEY (studio_key) REFERENCES StudioKeys (studio_key)
    ON UPDATE CASCADE
    ON DELETE CASCADE 
);

INSERT INTO Studios (studio_name)
VALUES ('Blizzard');

INSERT INTO Studios (studio_name)
VALUES ('Bioware');

INSERT INTO Studios (studio_name)
VALUES ('Rockstar');

INSERT INTO Studios (studio_name)
VALUES ('EA');

INSERT INTO Studios (studio_name)
VALUES ('Ubisoft');

INSERT INTO Studios (studio_name)
VALUES ('Activision');

INSERT INTO StudioKeys (studio_id)
VALUES (1);

INSERT INTO StudioKeys (studio_id)
VALUES (2);

INSERT INTO StudioKeys (studio_id)
VALUES (3);

INSERT INTO StudioKeys (studio_id)
VALUES (4);

INSERT INTO StudioKeys (studio_id)
VALUES (5);

INSERT INTO StudioKeys (studio_id)
VALUES (6);


INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (1, 'Overwatch', 10, 5, 3);

INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (1, 'Warcraft III', 2, 5, 5);

INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (1, 'HearthStone', 10, 3, 3);

INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (2, 'Mass Effect', 5, 5, 2);

INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (3, 'Read Dead Redemption', 15, 5, 1);

INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (4, 'BattleField 4', 20, 4, 6);

INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (4, 'BattleField 3', 20, 4, 6);

INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (5, 'Assasins Creed', 3, 5, 1);

INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity)
VALUES (5, 'Far Cry', 3, 5, 1);



DESCRIBE Studios;
DESCRIBE StudioKeys;
DESCRIBE VideoGames; 



CREATE TABLE Customers (
    customer_id int(11) AUTO_INCREMENT NOT NULL,
    first_name varchar(255) NOT NULL, 
    last_name varchar(255) NOT NULL,
    email varchar(255) NOT NULL,
    dob date NOT NULL,
    street varchar(255) NOT NULL,
    city varchar(255) NOT NULL,
    state varchar(255) NOT NULL,
    zip char(50) NOT NULL,
    phone_num int(11) NOT NULL,
    PRIMARY KEY (customer_id)
)ENGINE=InnoDB;



CREATE TABLE Orders (
    order_num int(11) AUTO_INCREMENT NOT NULL,
    order_date date NOT NULL, 
    order_complete varchar(255) NOT NULL,
    customer_id int(11) NOT NULL,
    PRIMARY KEY (order_num),
    FOREIGN KEY (customer_id) REFERENCES Customers (customer_id)
)Engine=InnoDB;



CREATE TABLE OrderedItems (
    item_id int(11) AUTO_INCREMENT NOT NULL, 
    order_returned varchar(255) NOT NULL, 
    order_num int(11) NOT NULL,
    video_game_id int(11) NOT NULL,
    PRIMARY KEY (item_id),
    FOREIGN KEY (order_num) REFERENCES Orders (order_num),
    FOREIGN KEY (video_game_id) REFERENCES VideoGames (video_game_id)
    ON DELETE CASCADE 
    ON UPDATE CASCADE
)Engine=InnoDB;



INSERT INTO Customers (first_name, last_name, email, dob, street, city, state, zip, phone_num)
VALUES ('James', 'Smith', 'mail1@mail.com', '1990-01-02', 'Main', 'Fairview', 'Oklahoma', '12345', 0019991234);

INSERT INTO Customers (first_name, last_name, email, dob, street, city, state, zip, phone_num)
VALUES ('Nala', 'Usman', 'email2@mail.com', '1993-12-14', 'North', 'Midlands', 'Montana', '78945', 1015557777);

INSERT INTO Customers (first_name, last_name, email, dob, street, city, state, zip, phone_num)
VALUES ('Grumpy', 'Trott', 'zmail3@mail.com', '2002-25-02', 'Elm', 'Hills', 'Alaska', '36987', 5432227894);

INSERT INTO Customers (first_name, last_name, email, dob, street, city, state, zip, phone_num)
VALUES ('Susan', 'Baker', 'mail7@mail.com', '2000-11-18', 'Special', 'Cloud', 'Nevada', '54375', 0987654321);

INSERT INTO Orders (order_date, order_complete, customer_id)
VALUES (2020-05-01, 'Yes', 1);

INSERT INTO Orders (order_date, order_complete, customer_id)
VALUES (2020-02-24, 'No', 2);

INSERT INTO Orders (order_date, order_complete, customer_id)
VALUES (2020-03-30, 'Yes', 3);

INSERT INTO Orders (order_date, order_complete, customer_id)
VALUES (2020-04-15, 'No', 4);

INSERT INTO OrderedItems (order_returned, order_num, video_game_id)
VALUES ('No', 1, 1);

INSERT INTO OrderedItems (order_returned, order_num, video_game_id)
VALUES ('No', 2, 2);

INSERT INTO OrderedItems (order_returned, order_num, video_game_id)
VALUES ('Yes', 3, 3);

INSERT INTO OrderedItems (order_returned, order_num, video_game_id)
VALUES ('Yes', 4, 4);


DESCRIBE Customers;
DESCRIBE Orders;
DESCRIBE OrderedItems; 
