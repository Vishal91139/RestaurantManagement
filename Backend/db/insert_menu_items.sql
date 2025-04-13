-- Insert menu items with specific IDs to match frontend
-- First, make sure the auto_increment counter is set high enough
ALTER TABLE menu AUTO_INCREMENT = 200;

-- Insert Desserts (IDs 101-105)
INSERT INTO menu (id, name, description, price, category, image) VALUES
(101, 'Chocolate Lava Cake', 'Warm chocolate cake with a gooey molten center, served with vanilla ice cream.', 6.99, 'Desserts', '/images/menu/desserts/chocolate-lava-cake.jpg'),
(102, 'Tiramisu', 'Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.', 7.49, 'Desserts', '/images/menu/desserts/tiramisu.jpg'),
(103, 'Cheesecake', 'Creamy New York-style cheesecake with a graham cracker crust.', 6.99, 'Desserts', '/images/menu/desserts/cheesecake.jpg'),
(104, 'Apple Pie', 'Classic apple pie with a flaky crust, served warm with vanilla ice cream.', 5.99, 'Desserts', '/images/menu/desserts/apple-pie.jpg'),
(105, 'Crème Brûlée', 'Rich custard topped with a layer of caramelized sugar.', 7.99, 'Desserts', '/images/menu/desserts/creme-brulee.jpg');

-- Insert Breakfast items (IDs 201-205)
INSERT INTO menu (id, name, description, price, category, image) VALUES
(201, 'Eggs Benedict', 'Poached eggs and Canadian bacon on English muffins, topped with hollandaise sauce.', 12.99, 'Breakfast', '/images/menu/breakfast/eggs-benedict.jpg'),
(202, 'Pancakes', 'Fluffy buttermilk pancakes served with maple syrup and butter.', 9.99, 'Breakfast', '/images/menu/breakfast/pancakes.jpg'),
(203, 'Avocado Toast', 'Toasted artisan bread topped with mashed avocado, cherry tomatoes, and a poached egg.', 11.99, 'Breakfast', '/images/menu/breakfast/avocado-toast.jpg'),
(204, 'Breakfast Burrito', 'Scrambled eggs, chorizo, black beans, cheese, and pico de gallo wrapped in a flour tortilla.', 10.99, 'Breakfast', '/images/menu/breakfast/breakfast-burrito.jpg'),
(205, 'French Toast', 'Thick slices of brioche bread dipped in cinnamon-vanilla batter and grilled to perfection.', 9.99, 'Breakfast', '/images/menu/breakfast/french-toast.jpg');

-- Insert Lunch items (IDs 301-305)
INSERT INTO menu (id, name, description, price, category, image) VALUES
(301, 'Chicken Caesar Salad', 'Grilled chicken breast over romaine lettuce with Caesar dressing, croutons, and parmesan.', 13.99, 'Lunch', '/images/menu/lunch/chicken-caesar-salad.jpg'),
(302, 'Club Sandwich', 'Triple-decker sandwich with turkey, bacon, lettuce, tomato, and mayo on toasted bread.', 12.99, 'Lunch', '/images/menu/lunch/club-sandwich.jpg'),
(303, 'Veggie Burger', 'Plant-based patty with lettuce, tomato, onion, and special sauce on a brioche bun.', 14.99, 'Lunch', '/images/menu/lunch/veggie-burger.jpg'),
(304, 'Fish Tacos', 'Grilled fish with cabbage slaw, pico de gallo, and chipotle aioli in corn tortillas.', 15.99, 'Lunch', '/images/menu/lunch/fish-tacos.jpg'),
(305, 'Pasta Primavera', 'Fettuccine pasta with seasonal vegetables in a light cream sauce.', 13.99, 'Lunch', '/images/menu/lunch/pasta-primavera.jpg');

-- Insert Dinner items (IDs 401-405)
INSERT INTO menu (id, name, description, price, category, image) VALUES
(401, 'Filet Mignon', '8oz center-cut filet with garlic mashed potatoes and seasonal vegetables.', 29.99, 'Dinner', '/images/menu/dinner/filet-mignon.jpg'),
(402, 'Grilled Salmon', 'Atlantic salmon with lemon-dill sauce, wild rice, and asparagus.', 24.99, 'Dinner', '/images/menu/dinner/grilled-salmon.jpg'),
(403, 'Chicken Parmesan', 'Breaded chicken breast topped with marinara and mozzarella, served with spaghetti.', 19.99, 'Dinner', '/images/menu/dinner/chicken-parmesan.jpg'),
(404, 'Vegetable Stir Fry', 'Mixed vegetables and tofu stir-fried in a savory sauce, served over rice.', 16.99, 'Dinner', '/images/menu/dinner/vegetable-stir-fry.jpg'),
(405, 'Lobster Ravioli', 'Ravioli stuffed with lobster meat in a creamy tomato sauce.', 26.99, 'Dinner', '/images/menu/dinner/lobster-ravioli.jpg');

-- Insert Drinks (IDs 501-505)
INSERT INTO menu (id, name, description, price, category, image) VALUES
(501, 'Fresh Lemonade', 'Freshly squeezed lemonade with a hint of mint.', 3.99, 'Drinks', '/images/menu/drinks/lemonade.jpg'),
(502, 'Iced Tea', 'House-brewed iced tea, sweetened or unsweetened.', 2.99, 'Drinks', '/images/menu/drinks/iced-tea.jpg'),
(503, 'Strawberry Smoothie', 'Blend of fresh strawberries, banana, and yogurt.', 5.99, 'Drinks', '/images/menu/drinks/strawberry-smoothie.jpg'),
(504, 'Cappuccino', 'Espresso with steamed milk and a layer of foamed milk.', 4.99, 'Drinks', '/images/menu/drinks/cappuccino.jpg'),
(505, 'Craft Beer', 'Selection of local craft beers. Ask your server for today\''s options.', 6.99, 'Drinks', '/images/menu/drinks/craft-beer.jpg');
