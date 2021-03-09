--Queries below are listed in order as they appear on the Tab/HTML Pages.
-- Query for adding a new character functionality with colon : or ? character being used to 
-- denote the variables that will have data from the backend programming language

--Tab: Inventory Management 
--Desctription: Queries  below insert new data into Studio and display the querey entered by user. 
INSERT INTO Studios (studio_name) VALUES (:studio_name_input);

SELECT * FROM Studios WHERE studio_name = :studio_name_input;

--Tab: Inventory Management
--Description: Queries will insert a new studio key and display the newly inserted info using an Inner join, joining Studios and StudioKeys Tables.
INSERT INTO StudioKeys (studio_id) VALUES (:studio_id_input); 

SELECT Studios.studio_id, StudioKeys.studio_key, Studios.studio_name FROM Studios" +
INNER JOIN StudioKeys ON Studios.studio_id = StudioKeys.studio_id "


--Tab: Browse Video Games
--Description: Insert New Video Game into VideoGames table and then displays new inserted video game information and inner join on studios and studio keys.
INSERT INTO VideoGames (studio_key, game_title, price, vg_rating, quantity) VALUES (?,?,?,?,?)

SELECT DISTINCT VideoGames.video_game_id, StudioKeys.studio_key, Studios.studio_name, VideoGames.game_title, VideoGames.price, VideoGames.quantity, VideoGames.vg_rating "+
FROM Studios INNER JOIN StudioKeys ON Studios.studio_id = StudioKeys.studio_id INNER JOIN VideoGames" +
ON StudioKeys.studio_key = VideoGames.studio_key"
--Tab: Browse Video Games
--Description: Update VideoGame Data with data entered by user from form fields

UPDATE VideoGames SET game_title=?, price=?, vg_rating=?, quantity=? WHERE video_game_id=?

--Tab: Browse Video Games
--Description: Enter game_title that user wants to delete along with the rows other data display remaining rows of the table. 

DELETE FROM VideoGames WHERE video_game_id = ?


--Tab: Register
--Description: Insert customer information and then display newly inserted customer info. 

INSERT INTO Customers (first_name, last_name, email, dob, street, city, state, zip, phone_num) VALUES (?,?,?,?,?,?,?,?,?)

SELECT * FROM Customers

--Tab: Review Orders/New Customer Order (Consider changing Customer id as FK to something else)
--Description: Insert New Customer Orders into Orderes table and then displays new inserted Order information and inner join on Customers.
INSERT INTO Orders (order_date, order_complete, customer_id) VALUES (?, ?, ?)

SELECT Customers.customer_id, Orders.order_num, Customers.first_name, Customers.last_name, Orders.order_date, Orders.order_complete
FROM Customers INNER JOIN Orders ON Customers.customer_id = Orders.customer_id

--Tab: New Item into Order
--Description: Insert New Items Order into Orders table and then displays new inserted video game information/studio, order info and inner join on Orders, VideogGames, StudioKeys, Studios.
INSERT INTO OrderedItems (order_returned, order_num, video_game_id) VALUES (?, ?, ?)


SELECT Customers.customer_id, Customers.first_name, Customers.last_name, OrderedItems.item_id, Orders.order_num, OrderedItems.video_game_id, VideoGames.game_title, Studios.studio_id, Studios.studio_name, VideoGames.quantity, "VideoGames.price, VideoGames.vg_rating, OrderedItems.order_returned FROM OrderedItems INNER JOIN VideoGames ON VideoGames.video_game_id = OrderedItems.video_game_id 
INNER JOIN Orders ON Orders.order_num = OrderedItems.order_num INNER JOIN Customers ON Customers.customer_id = Orders.customer_id " 
INNER JOIN StudioKeys ON StudioKeys.studio_key = VideoGames.studio_key INNER JOIN Studios ON Studios.studio_id = StudioKeys.studio_id 
