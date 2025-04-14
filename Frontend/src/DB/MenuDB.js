// src/data/menuDB.js (or adjust path)
// EDITED: Added unique 'id' and 'category' to each item in the 'Menu' export.

import Image1 from '../assets/Menu/Breakfast/breakfast1.png';
import Image2 from '../assets/Menu/Breakfast/breakfast2.png';
import Image3 from '../assets/Menu/Breakfast/breakfast3.png';
import Image4 from '../assets/Menu/Breakfast/breakfast4.png';
import Image5 from '../assets/Menu/Breakfast/breakfast5.png';
import Image6 from '../assets/Menu/lunch/lunch1.png';
import Image7 from '../assets/Menu/lunch/lunch2.png';
import Image8 from '../assets/Menu/lunch/lunch3.png';
import Image9 from '../assets/Menu/lunch/lunch4.png';
import Image10 from '../assets/Menu/lunch/lunch5.png';
import Image11 from '../assets/Menu/Dinner/dinner1.png';
import Image12 from '../assets/Menu/Dinner/dinner2.png';
import Image13 from '../assets/Menu/Dinner/dinner3.png';
import Image14 from '../assets/Menu/Dinner/dinner4.png';
import Image15 from '../assets/Menu/Dinner/dinner5.png';
import Images16 from '../assets/desserts.jpg';
import Image17 from '../assets/chicken.jpg';

export const Menu = [ // Using the 'Menu' export you provided
    {
        "section_name": "Desserts",
        "items": [
            {
                "id": 101, // Added ID
                "name": "Chocolate Lava Cake",
                "description": "Warm chocolate cake with a gooey molten center, served with vanilla ice cream.",
                "price": 6.99,
                "category": "Desserts", // Added Category
                "image": Image1
            },
            {
                "id": 102, // Added ID
                "name": "Tiramisu",
                "description": "Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cheese.",
                "price": 7.49,
                "category": "Desserts", // Added Category
                "image": Image2
            },
            {
                "id": 103, // Added ID
                "name": "Fruit Tart",
                "description": "Buttery tart shell filled with custard and topped with fresh seasonal fruits.",
                "price": 5.99,
                "category": "Desserts", // Added Category
                "image": Image3
            }
        ]
    },
    {
        "section_name": "Entrees",
        "items": [
            {
                "id": 201, // Added ID
                "name": "Steak",
                "description": "A juicy grilled steak served with garlic mashed potatoes and seasonal vegetables.",
                "price": 18.99,
                "category": "Entrees", // Added Category
                "image": Image4
            },
            {
                "id": 202, // Added ID
                "name": "Grilled Chicken",
                "description": "Tender grilled chicken breast marinated in herbs and spices.",
                "price": 15.49,
                "category": "Entrees", // Added Category
                "image": Image5
            },
            {
                "id": 203, // Added ID
                "name": "Salmon",
                "description": "Pan-seared salmon fillet served with lemon butter sauce.",
                "price": 17.99,
                "category": "Entrees", // Added Category
                "image": Image6
            }
        ]
    },
    {
        "section_name": "Appetizers",
        "items": [
            {
                "id": 301, // Added ID
                "name": "Sampler Platter",
                "description": "A delicious assortment of mini spring rolls, chicken wings, and mozzarella sticks.",
                "price": 10.99,
                "category": "Appetizers", // Added Category
                "image": Image7
            },
            {
                "id": 302, // Added ID
                "name": "Bruschetta",
                "description": "Toasted baguette slices topped with fresh tomatoes, basil, and balsamic glaze.",
                "price": 7.49,
                "category": "Appetizers", // Added Category
                "image": Image8
            },
            {
                "id": 303, // Added ID
                "name": "Spinach Dip",
                "description": "Creamy spinach and artichoke dip served with tortilla chips.",
                "price": 8.99,
                "category": "Appetizers", // Added Category
                "image": Image9
            }
        ]
    },
    {
        "section_name": "Pasta", // Changed from "pasta" for consistency
        "items": [
            {
                "id": 401, // Added ID
                "name": "Spaghetti Carbonara",
                "description": "Classic spaghetti with creamy carbonara sauce, bacon, and parmesan cheese.",
                "price": 12.99,
                "category": "Pasta", // Added Category
                "image": Image10
            },
            {
                "id": 402, // Added ID
                "name": "Penne Primavera",
                "description": "Penne pasta tossed with fresh vegetables in a light olive oil and garlic sauce.",
                "price": 11.99,
                "category": "Pasta", // Added Category
                "image": Image11
            },
            {
                "id": 403, // Added ID
                "name": "Chicken Alfredo",
                "description": "Grilled chicken and fettuccine pasta in a rich alfredo sauce.",
                "price": 13.99,
                "category": "Pasta", // Added Category
                "image": Image12
            }
        ]
    },
    {
        "section_name": "Salads",
        "items": [
            {
                "id": 501, // Added ID
                "name": "Caesar Salad",
                "description": "Crisp romaine lettuce, croutons, and parmesan cheese with Caesar dressing.",
                "price": 9.99,
                "category": "Salads", // Added Category
                "image": Image13
            },
            {
                "id": 502, // Added ID
                "name": "Greek Salad",
                "description": "Fresh cucumbers, tomatoes, olives, and feta cheese with Greek vinaigrette.",
                "price": 8.49,
                "category": "Salads", // Added Category
                "image": Image14
            },
            {
                "id": 503, // Added ID
                "name": "Caprese Salad",
                "description": "Slices of ripe tomatoes, fresh mozzarella, and basil with balsamic glaze.",
                "price": 7.99,
                "category": "Salads", // Added Category
                "image": Image15
            }
        ]
    }
];

// Keeping your sampleMenu export - NOTE: Items here ALSO need 'id' and 'category'
// if you intend to use this array anywhere in your application with the MenuItem component.
export const sampleMenu = [
    {
        "section_name": "BREAKFAST",
        "items": [
            {
                "id": 601, // Example ID
                "item_name": "Pancakes", // Note: key is 'item_name' here vs 'name' above
                "description": "Fluffy pancakes served with maple syrup and butter.",
                "price": 7.99,
                "category": "BREAKFAST", // Example Category
                "image": Image1
            },
            {
                "id": 602, // Example ID
                "item_name": "Eggs Benedict",
                "description": "Poached eggs on an English muffin...",
                "price": 9.49,
                "category": "BREAKFAST", // Example Category
                "image": Image2
            },
            {
                "id": 603, // Example ID
                "item_name": "French Toast",
                "description": "Thick slices of French toast...",
                "price": 6.99,
                "category": "BREAKFAST", // Example Category
                "image": Image3
            }
        ]
    },
    {
        "section_name": "LUNCH",
        "items": [
             // ... ADD id and category fields to LUNCH items ...
             { "id": 701, "item_name": "Steak Frites", /*...*/ "category": "LUNCH", "image": Image6 },
             { "id": 702, "item_name": "Salmon Salad", /*...*/ "category": "LUNCH", "image": Image7 },
             { "id": 703, "item_name": "Pasta Primavera", /*...*/ "category": "LUNCH", "image": Image8 }
        ]
    },
    {
        "section_name": "DINNER",
        "items": [
            // ... ADD id and category fields to DINNER items ...
             { "id": 801, "item_name": "Filet Mignon", /*...*/ "category": "DINNER", "image": Image13 },
             { "id": 802, "item_name": "Lobster Tail", /*...*/ "category": "DINNER", "image": Image14 },
             { "id": 803, "item_name": "Vegetable Risotto", /*...*/ "category": "DINNER", "image": Image15 }
        ]
    }
];


export const slider = [
    {
      "section_name": "BREAKFAST",
      "image": "https://img.freepik.com/free-photo/top-view-waffles-with-citrus-raisins_23-2148526321.jpg?t=st=1744295657~exp=1744299257~hmac=d7a732e1881f0b72856a18db9c02153ea6addbb195bd766f5b4a8598e204ff72&w=1480",
      "items": [
        {
          "name": "Avocado Toast",
          "description": "Toasted sourdough bread generously topped with smashed avocado, cherry tomatoes, and a perfectly poached egg, drizzled with olive oil and sprinkled with chili flakes for a deliciously healthy start to your day.",
          "price": 9.99,
          "image": "https://images.unsplash.com/photo-1515041761709-f9fc96e04cd3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          "name": "Omelette Platter",
          "description": "A hearty three-egg omelette filled with a blend of cheddar cheese, bell peppers, onions, and mushrooms, served with crispy hash browns and toasted bread.",
          "price": 8.99,
          "image": "https://plus.unsplash.com/premium_photo-1667807521536-bc35c8d8b64b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          "name": "Pancake Stack",
          "description": "Three fluffy pancakes stacked high, served with a generous drizzle of maple syrup and topped with a mix of fresh seasonal berries and whipped cream.",
          "price": 7.99,
          "image": "https://images.unsplash.com/photo-1668507740203-0654d38b6201?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          "name": "Grilled Chicken Sandwich",
          "description": "A light yet satisfying sandwich made with herb-marinated grilled chicken breast, fresh lettuce, juicy tomato slices, and a creamy mayonnaise spread, all packed between slices of toasted whole grain bread.",
          "price": 9.49,
          "image": "https://plus.unsplash.com/premium_photo-1671559021919-19d9610c8cad?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        },
        {
          "name": "French Toast",
          "description": "Thick slices of bread dipped in a sweet cinnamon-vanilla egg mixture and pan-fried until golden brown, served with powdered sugar and warm syrup.",
          "price": 6.99,
          "image": "https://images.unsplash.com/photo-1588484588657-0bbbee05132f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
      ]
    },
    {
      "section_name": "CHICKEN",
      "image": Image17,
      "items": [
        {
          "name": "Chicken Lollipop",
          "description": "A popular Indo-Chinese appetizer featuring drumettes marinated in spicy sauces, deep-fried until crispy, and served with a zesty dipping sauce.",
          "price": 9.49,
          "image": "https://img.freepik.com/premium-photo/szechuan-chicken-which-is-popular-indo-chinese-non-vegetarian-recipe-served-plate-with-chilli-sauce-selective-focus_466689-32647.jpg?w=1380"
        },
        {
          "name": "Butter Chicken",
          "description": "Tender pieces of chicken simmered in a rich, creamy tomato sauce infused with aromatic spices and butter. Served best with naan or rice.",
          "price": 13.49,
          "image": "https://img.freepik.com/free-photo/pre-prepared-food-showcasing-ready-eat-delicious-meals-go_23-2151246080.jpg?t=st=1744115874~exp=1744119474~hmac=8827903536cab467d1dd287f995a5832a8a340009018b23729b08138ac28a45f&w=740"
        },
        {
          "name": "Grilled Chicken Tikka",
          "description": "Boneless chicken chunks marinated in a blend of yogurt and traditional Indian spices, grilled to perfection and served with mint chutney.",
          "price": 12.49,
          "image": "https://img.freepik.com/free-photo/closeup-shot-deliciously-prepared-chicken-served-with-onions-chili-sauce_181624-61705.jpg?t=st=1744116129~exp=1744119729~hmac=83573778c39bdaf464b6f214fe398df2d7dcc20285eede672d49a861965af06a&w=1380"
        },
        {
          "name": "Crispy Fried Chicken",
          "description": "Golden brown and crispy chicken pieces with juicy interiors, seasoned with a mix of herbs and spices. A crunchy and satisfying dish.",
          "price": 11.99,
          "image": "https://img.freepik.com/free-photo/american-diner-aesthetics_23-2151854429.jpg?t=st=1744116194~exp=1744119794~hmac=1b3af0955b8785a210a3766f76df69d750c3b7fca4fe9dec2d305a5dc0158c75&w=1380"
        },
        {
          "name": "Spicy Chicken Wings",
          "description": "Deep-fried chicken wings coated in a fiery and flavorful sauce made from hot peppers and garlic. A perfect snack for spice lovers.",
          "price": 10.49,
          "image": "https://img.freepik.com/free-photo/close-up-delicious-chicken-meal_23-2150741793.jpg?t=st=1744116222~exp=1744119822~hmac=900fd196b42e6ecf86cad839f04cd8498bd8fb8ed59ba17614a9542504208956&w=1380"
        }
      ]
    },
    {
      "section_name": "FISH & SEAFOODS",
      "image": "https://img.freepik.com/free-photo/elegant-healthy-food-composition-with-fish_23-2147992820.jpg?t=st=1744139463~exp=1744143063~hmac=ff66efca0d157bd3770bfe3649958f67072ee276f13ebc7bbfaabf273da296f5&w=1380",
      "items": [
        {
          "name": "Fish Fry",
          "description": "Fresh fish fillets marinated in a spicy blend of herbs and seasonings, shallow-fried to crispy perfection and served with lemon wedges and onion rings.",
          "price": 11.99,
          "image": "https://img.freepik.com/free-photo/front-close-view-delicious-fried-fishes-lemon-slices-brown-plate-pepper-mix-colors-table-with-free-space_179666-18175.jpg?t=st=1744116454~exp=1744120054~hmac=00c6c0d956c706bee85aeb2c927c4bf482e966a27eecf2c0163b152efdb36669&w=1380"
        },
        {
          "name": "Prawn Curry",
          "description": "Succulent prawns cooked in a flavorful coconut and tamarind-based curry sauce infused with South Indian spices. Best enjoyed with steamed rice.",
          "price": 13.99,
          "image": "https://img.freepik.com/free-photo/delicious-seafood-table_23-2150857704.jpg?t=st=1744116534~exp=1744120134~hmac=91105514f76b9c2b35957f662ae8d6cca3a235aeff3bf9ccbf818c2b0888340c&w=1380"
        },
        {
          "name": "Calamari Rings",
          "description": "Crispy golden rings of tender squid coated in seasoned batter, deep-fried and served with tartar sauce for a perfect appetizer.",
          "price": 10.99,
          "image": "https://img.freepik.com/free-photo/top-view-mussels-sauce_23-2148393743.jpg?t=st=1744116576~exp=1744120176~hmac=0252c55e3a157161c92f2d112bd678265104a0dae8ef4e15bb79f32bbb467e6e&w=1380"
        },
        {
          "name": "Seafood Pasta",
          "description": "A medley of shrimp, squid, and mussels tossed with pasta in a creamy tomato sauce, garnished with herbs and grated parmesan cheese.",
          "price": 14.99,
          "image": "https://img.freepik.com/free-photo/pasta-spaghetti-with-shrimps-sauce_1220-5069.jpg?t=st=1744117257~exp=1744120857~hmac=10d0ce1eb17e9ce0316834901c6c67367f604630b28157327efbbe4b62862f70&w=1380"
        },
        {
          "name": "Grilled Fish Fillet",
          "description": "Lightly seasoned fish fillet grilled until flaky and moist, served with a refreshing lemon butter sauce and a side of steamed vegetables.",
          "price": 12.49,
          "image": "https://img.freepik.com/free-photo/several-cakes-with-side-cream_140725-1935.jpg?t=st=1744117364~exp=1744120964~hmac=17658f2efce8a5c4a38be0e089a8aa43c07df6b68b4459a1a18c4e4741909bb9&w=1380"
        }
      ]
    },
    {
      "section_name": "PASTA",
      "image": "https://img.freepik.com/free-photo/top-close-up-view-pasta-with-meat-blue-plate-appetizing-pasta-with-gravy-meat-left-side-table_140725-111452.jpg?t=st=1744139561~exp=1744143161~hmac=eea1e7c825e265e65274380b6f1e3eb28290ada496074ceff3344ee1cb6aacef&w=1380",
      "items": [
        {
          "name": "Spaghetti Carbonara",
          "description": "A classic Italian pasta dish made with perfectly cooked spaghetti tossed in a rich and creamy sauce made from eggs, parmesan cheese, crispy bacon, and freshly ground black pepper. Served hot and garnished with parsley.",
          "price": 12.99,
          "image": "https://img.freepik.com/free-photo/delicious-pasta-plate_23-2150690609.jpg?t=st=1744117401~exp=1744121001~hmac=24554544c90163f8f227f177eaa0d7090202678dd4f697faf286407cb3934213&w=1380"
        },
        {
          "name": "Penne Primavera",
          "description": "Colorful penne pasta sautéed with a medley of fresh vegetables including bell peppers, zucchini, broccoli, and cherry tomatoes in a light garlic and olive oil sauce. A wholesome vegetarian delight with vibrant flavors.",
          "price": 11.99,
          "image": "https://img.freepik.com/free-photo/penne-pasta-tomato-sauce-with-chicken-tomatoes-wooden-table_2829-19739.jpg?t=st=1744117438~exp=1744121038~hmac=09bf5fdec54352654fb2bdfed7516a43a5beae81fe080807cb3501db8bf299d0&w=1380"
        },
        {
          "name": "Chicken Alfredo",
          "description": "Juicy grilled chicken strips served over a bed of fettuccine pasta, all smothered in a creamy Alfredo sauce made from butter, heavy cream, and parmesan cheese. A rich and indulgent comfort meal.",
          "price": 13.99,
          "image": "https://img.freepik.com/free-photo/freshness-healthy-eating-homemade-vegetarian-pasta-generated-by-artificial-intelligence_188544-128803.jpg?t=st=1744117484~exp=1744121084~hmac=b69157d4211719f5aff039acfd5778b5fb64f8a9ce1339137a3aa7a8aef06120&w=1380"
        },
        {
          "name": "Lasagna",
          "description": "Layers of tender pasta sheets, seasoned ground meat, savory tomato sauce, and gooey mozzarella and ricotta cheese baked to golden perfection. Served with a side of garlic bread for a truly satisfying experience.",
          "price": 14.49,
          "image": "https://img.freepik.com/free-photo/classic-lasagna-with-bolognese-sauce_2829-11251.jpg?t=st=1744117523~exp=1744121123~hmac=49de624c1b1362a36ccb977e7d347c9bd378cdfc306a9f06a4997e2041ae6e07&w=1380"
        },
        {
          "name": "Pesto Pasta",
          "description": "Fresh basil pesto blended with garlic, pine nuts, and parmesan cheese coats al dente pasta, delivering a nutty and aromatic flavor. A delicious choice for those who love herby, vibrant dishes.",
          "price": 11.49,
          "image": "https://img.freepik.com/free-photo/penne-pasta-with-pesto-sauce-zucchini-green-peas-basil-italian-food_2829-5833.jpg?t=st=1744117552~exp=1744121152~hmac=bb3b55821dc7bb438ff6ff48620a2feb70fc2bad44c36d6cbd1e35b5b639d63c&w=1380"
        }
      ]
    },
    {
      "section_name": "DESSERTS",
      "image": Images16,
      "items": [
        {
          "name": "Chocolate Lava Cake",
          "description": "A decadent chocolate cake with a gooey molten chocolate center, served warm with a scoop of creamy vanilla ice cream and a drizzle of chocolate sauce.",
          "price": 6.99,
          "image": "https://img.freepik.com/free-photo/chocolate-lava-cake-white-plate_1150-6317.jpg?t=st=1744117589~exp=1744121189~hmac=4a0212cf22561568f872f5daff38991e3a58617882de7b7c4fa259a2830fbdae&w=1380"
        },
        {
          "name": "Tiramisu",
          "description": "An Italian layered dessert made with coffee-soaked ladyfingers, rich mascarpone cheese, cocoa powder, and a hint of liqueur. A creamy indulgence with a bold coffee kick.",
          "price": 7.49,
          "image": "https://img.freepik.com/free-photo/tasty-homemade-tiramisu-cake_114579-85350.jpg?t=st=1744117635~exp=1744121235~hmac=b317f4abea8d7887ad6c9661501f31098a11ce1c32945a19e49354329e0f340f&w=1380"
        },
        {
          "name": "Fruit Tart",
          "description": "A crisp, buttery tart shell filled with smooth pastry cream and topped with an array of fresh seasonal fruits like strawberries, kiwis, and blueberries.",
          "price": 5.99,
          "image": "https://img.freepik.com/free-photo/homemade-delicious-rustic-summer-berry-tartles_114579-10569.jpg?t=st=1744117750~exp=1744121350~hmac=e22ab559c384c68ed67ff7d5e7a50f25fd7aa08f74e207021b3e95a972ae23c2&w=1380"
        },
        {
          "name": "Cheesecake",
          "description": "Classic baked cheesecake with a graham cracker crust and a smooth, tangy cream cheese filling, topped with your choice of fruit compote or chocolate sauce.",
          "price": 6.49,
          "image": "https://img.freepik.com/free-photo/side-view-cheesecake-with-cherry-jelly-top-white-plate_141793-2955.jpg?t=st=1744117817~exp=1744121417~hmac=5aff768ee3e09fe93571ab0312f99268cb3953af91be1cef2223febc7719be6f&w=1380"
        },
        {
          "name": "Brownie Sundae",
          "description": "A rich chocolate brownie served warm, topped with a scoop of ice cream, whipped cream, nuts, and a generous drizzle of hot fudge.",
          "price": 6.79,
          "image": "https://img.freepik.com/free-photo/chocolate-brownie-served-with-vanilla-icecream-ball-strawberries_114579-2595.jpg?t=st=1744117848~exp=1744121448~hmac=5ee44827ba45575d9cd8ecb2004222928ee09a3dc72700a735cb988f645ec987&w=1380"
        }
      ]
    },
    {
      "section_name": "BARBEQUE",
      "image": "https://img.freepik.com/free-photo/flat-lay-meat-concept-with-copy-space_23-2148738890.jpg?t=st=1744139805~exp=1744143405~hmac=afa4e0c16abae727b73d4f8330e49419e9ca30e168ad8c0dc92e96983e16a2ce&w=1380",
      "items": [
        {
          "name": "BBQ Chicken Skewers",
          "description": "Juicy chicken pieces marinated in a smoky barbecue sauce, skewered with bell peppers and onions, then grilled to tender perfection.",
          "price": 10.99,
          "image": "https://img.freepik.com/free-photo/chicken-skewers-with-slices-apples-chili_2829-19992.jpg?t=st=1744117875~exp=1744121475~hmac=f4b9dd18fa89cbd2d7f6238f0f77f379eec704921b3a6f48fe9c3b28840d2909&w=1380"
        },
        {
          "name": "Smoked Ribs",
          "description": "Slow-cooked pork ribs coated in a tangy and sweet BBQ sauce, grilled until caramelized and served with coleslaw and cornbread.",
          "price": 14.99,
          "image": "https://img.freepik.com/free-photo/baked-beef-ribs-honey-soy-marinade-with-pickled-vegetables_2829-8005.jpg?t=st=1744117953~exp=1744121553~hmac=8cb9f3c3347c160543ab289e69b8de5d84e58a593952aabb5686e5d8e56fd7f3&w=1380"
        },
        {
          "name": "BBQ Pulled Pork Sandwich",
          "description": "Tender pulled pork tossed in a smoky sauce, piled high on a toasted bun and topped with crunchy pickles and creamy coleslaw.",
          "price": 9.99,
          "image": "https://img.freepik.com/free-photo/japanese-sandwich-with-breaded-pork-chop-cabbage-tonkatsu-sauce_2829-18646.jpg?t=st=1744117996~exp=1744121596~hmac=ee53b136bfc4abff657b30bf843b49ca554da884445fa00cbb41644325758f46&w=1380"
        },
        {
          "name": "Grilled Corn on the Cob",
          "description": "Sweet corn grilled to perfection and brushed with herbed butter, then sprinkled with grated parmesan and chili powder.",
          "price": 4.99,
          "image": "https://img.freepik.com/free-photo/close-up-corn-with-chili-powder-salt_23-2148283059.jpg?t=st=1744118121~exp=1744121721~hmac=4e98183b6048467b0ccd6a657f2d2af4a94722704e468da83a8561203a202201&w=1380"
        },
        {
          "name": "BBQ Veggie Platter",
          "description": "A colorful assortment of vegetables like zucchini, bell peppers, and mushrooms, marinated and grilled with smoky BBQ flavors.",
          "price": 8.49,
          "image": "https://img.freepik.com/free-photo/delicious-meat-skewer-black-slate-with-fork-butter-knife-wooden-table_23-2148207000.jpg?t=st=1744118181~exp=1744121781~hmac=91c15ef82bb0d456afc619d74ed3c8948b665c3e9a3b72dc225ebf7ff62ac37c&w=1380"
        }
      ]
    },
    {
      "section_name": "BEVERAGES",
      "image": "https://img.freepik.com/free-photo/strawberry-lemon-mojito-drinks_114579-2465.jpg?t=st=1744140029~exp=1744143629~hmac=9b80d468b60ce86fd8a78392a88a8af0ec4211015c9b250055f87287ef7c6210&w=826",
      "items": [
        {
          "name": "Fresh Lime Soda",
          "description": "A refreshing mix of lime juice, soda water, and a touch of sugar and salt. Served chilled to quench your thirst on a hot day.",
          "price": 2.99,
          "image": "https://img.freepik.com/free-photo/mojito-drink-with-lime-lemon-mint-wood-table_1150-12269.jpg?ga=GA1.1.227689090.1717951363&semt=ais_hybrid&w=740"
        },
        {
          "name": "Mango Smoothie",
          "description": "A thick and creamy smoothie made from fresh mango pulp blended with yogurt and a dash of honey. Naturally sweet and delicious.",
          "price": 3.99,
          "image": "https://img.freepik.com/free-photo/fresh-mango-smoothie_1339-1486.jpg?t=st=1744122322~exp=1744125922~hmac=3c5a56d771c982e2224e8a2fb20091459a2c74788042e24e7f206117d148eece&w=1380"
        },
        {
          "name": "Iced Coffee",
          "description": "Chilled coffee brewed strong and poured over ice with a splash of milk and sweetener. A cool pick-me-up for any time of the day.",
          "price": 3.49,
          "image": "https://img.freepik.com/free-photo/iced-machiato-coffee_1339-1866.jpg?t=st=1744122450~exp=1744126050~hmac=8f03416c0fe9bf0585514bcfc53a376040c709a97b7f7d5134c79e3f29eafcb2&w=1380"
        },
        {
          "name": "Strawberry Milkshake",
          "description": "A creamy and sweet milkshake made with real strawberries and vanilla ice cream, topped with whipped cream.",
          "price": 4.49,
          "image": "https://img.freepik.com/free-photo/milky-cocktail-jar-with-strawberries-waffles_114579-11075.jpg?t=st=1744122509~exp=1744126109~hmac=02dee0a788e7fff1daba5a913e16b4ff3a6b06c3e24d52a9616048d60e50b4d9&w=1380"
        },
        {
          "name": "Mint Lemonade",
          "description": "Cool lemonade infused with fresh mint leaves, sugar, and crushed ice. A classic, revitalizing summer drink.",
          "price": 3.29,
          "image": "https://img.freepik.com/free-photo/mojito-drink-with-lime-lemon-mint-wood-table_1150-12269.jpg?t=st=1744122550~exp=1744126150~hmac=3d57600c51b3da2fd0272165ec0bd20f1872689096995f6b1cfd03a078dd12d7&w=1380"
        }
      ]
    }
]