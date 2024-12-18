import { Category } from '@prisma/client';

const RECIPES = [
  {
    title: 'Kimchi Stew',
    ingredients: ['Kimchi', 'Pork', 'Tofu', 'Green onion', 'Red pepper powder', 'Soy sauce', 'Sesame oil'],
    benefits: [
      'Kimchi stew offers health benefits from fermented kimchi.',
      'Contains probiotics that support gut health.',
      'Rich in vitamin C and antioxidants, boosting immunity.',
      'Low in calories, making it diet-friendly.',
    ],
    likeCount: 152,
    category: Category.Traditional,
    direction: [
      'Stir-fry pork in sesame oil',
      'Add kimchi and stir-fry further',
      'Add water and remaining ingredients',
      'Simmer until done',
    ],
    calories: 210,
    carbs: 15.0,
    protein: 20.0,
    fat: 8.0,
    sugars: 3.0,
    sodium: 800.0,
    fiber: 2.0,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Bulgogi',
    ingredients: ['Beef', 'Onion', 'Soy sauce', 'Sugar', 'Garlic', 'Sesame oil', 'Pear'],
    benefits: [
      'Bulgogi is a protein-rich and nutritious dish.',
      'High in protein, supporting muscle development.',
      'Easily digestible tender meat.',
      'Provides energy and aids in fatigue recovery.',
    ],
    likeCount: 245,
    category: Category.Traditional,
    direction: ['Marinate beef in sauce', 'Stir-fry with onions'],
    calories: 320,
    carbs: 12.0,
    protein: 28.0,
    fat: 15.0,
    sugars: 8.0,
    sodium: 600.0,
    fiber: 1.0,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Tteokbokki',
    ingredients: ['Rice cakes', 'Gochujang', 'Red pepper powder', 'Sugar', 'Fish cakes', 'Scallions', 'Water'],
    benefits: [
      'Tteokbokki is a beloved snack with various nutrients.',
      'Provides energy through carbohydrates.',
      'Capsaicin in chili paste improves blood circulation.',
      'Nutritional balance with a variety of ingredients.',
    ],
    likeCount: 430,
    category: Category.Bunsik,
    direction: ['Mix sauce ingredients in water and boil', 'Add rice cakes and fish cakes', 'Cook thoroughly'],
    calories: 280,
    carbs: 40.0,
    protein: 8.0,
    fat: 5.0,
    sugars: 6.0,
    sodium: 750.0,
    fiber: 2.0,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Bibim Noodles',
    ingredients: ['Thin noodles', 'Gochujang', 'Sugar', 'Vinegar', 'Cucumber', 'Egg', 'Sesame oil'],
    benefits: [
      'Bibim noodles are refreshing and appetizing.',
      'Quick energy recharge with carbohydrates.',
      'Vinegar aids digestion.',
      'Balanced nutrition from vegetables and egg.',
    ],
    likeCount: 300,
    category: Category.Noodle,
    direction: ['Cook noodles', 'Rinse in cold water', 'Mix with sauce and vegetables'],
    calories: 270,
    carbs: 45.0,
    protein: 10.0,
    fat: 6.0,
    sugars: 7.0,
    sodium: 500.0,
    fiber: 1.0,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Grilled Pork Belly',
    ingredients: ['Pork belly', 'Salt', 'Pepper', 'Ssamjang', 'Lettuce', 'Garlic'],
    benefits: [
      'Grilled pork belly is a protein and energy-rich dish.',
      'Supports muscle building with high protein.',
      'Provides energy with flavorful fats.',
      'Enhances fiber intake when eaten with vegetables.',
    ],
    likeCount: 500,
    category: Category.Traditional,
    direction: ['Season pork belly with salt and pepper', 'Grill until done', 'Serve with vegetables and sauce'],
    calories: 450,
    carbs: 3.0,
    protein: 25.0,
    fat: 35.0,
    sugars: 1.0,
    sodium: 400.0,
    fiber: 3.0,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Hotteok',
    ingredients: ['Flour', 'Sugar', 'Honey', 'Cinnamon', 'Peanuts'],
    benefits: [
      'Hotteok is a sweet and nutty dessert.',
      'Replenishes energy with carbohydrates.',
      'Provides protein and satiety from peanuts.',
      'Antioxidant benefits from cinnamon.',
    ],
    likeCount: 220,
    category: Category.Dessert,
    direction: ['Make dough', 'Stuff with filling', 'Pan-fry until golden'],
    calories: 200,
    carbs: 35.0,
    protein: 4.0,
    fat: 6.0,
    sugars: 10.0,
    sodium: 150.0,
    fiber: 2.0,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Rolled Omelette',
    ingredients: ['Eggs', 'Carrot', 'Green onion', 'Salt', 'Cooking oil'],
    benefits: [
      'Rolled omelette is a simple and nutritious side dish.',
      'Rich in protein and vitamins.',
      'Soft texture aids digestion.',
      'Customizable with various ingredients for balanced nutrition.',
    ],
    likeCount: 180,
    category: Category.BanChan,
    direction: ['Mix eggs with vegetables', 'Pour into a pan', 'Roll while cooking'],
    calories: 150,
    carbs: 2.0,
    protein: 10.0,
    fat: 10.0,
    sugars: 1.0,
    sodium: 200.0,
    fiber: 0.0,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Red Bean Shaved Ice',
    ingredients: ['Red beans', 'Milk', 'Ice', 'Condensed milk', 'Rice cakes', 'Nuts'],
    benefits: [
      'Red bean shaved ice is a refreshing summer dessert.',
      'Rich in iron from red beans, preventing anemia.',
      'Calcium from milk supports bone health.',
      'Low-calorie treat for guilt-free enjoyment.',
    ],
    likeCount: 360,
    category: Category.Dessert,
    direction: ['Shave ice', 'Top with red beans', 'Add condensed milk', 'Garnish with rice cakes and nuts'],
    calories: 210,
    carbs: 40.0,
    protein: 8.0,
    fat: 5.0,
    sugars: 15.0,
    sodium: 120.0,
    fiber: 3.0,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Soybean Paste Stew',
    ingredients: ['Doenjang', 'Tofu', 'Zucchini', 'Mushroom', 'Onion', 'Garlic', 'Green chili'],
    benefits: [
      'Soybean paste stew is a representative healthy Korean dish.',
      'Fermented soybean paste increases beneficial gut bacteria.',
      'Rich in antioxidants.',
      'Good source of dietary fiber from various vegetables.',
    ],
    likeCount: 412,
    category: Category.Traditional,
    direction: ['Make broth', 'Add soybean paste', 'Boil with vegetables'],
    calories: 180,
    carbs: 15.7,
    protein: 15.3,
    fat: 8.2,
    sugars: 2.8,
    sodium: 920.5,
    fiber: 3.2,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Spicy Chicken Stir-fry',
    ingredients: ['Chicken', 'Sweet potato', 'Cabbage', 'Carrot', 'Gochugaru', 'Soy sauce', 'Rice cake'],
    benefits: [
      'Spicy chicken stir-fry is rich in protein.',
      'Capsaicin in red pepper helps burn fat.',
      'Rich in vegetables providing good satiety.',
      'Chicken protein helps muscle development.',
    ],
    likeCount: 389,
    category: Category.Traditional,
    direction: ['Season chicken', 'Prepare vegetables', 'Stir-fry all ingredients together'],
    calories: 420,
    carbs: 35.8,
    protein: 38.2,
    fat: 18.4,
    sugars: 8.9,
    sodium: 780.6,
    fiber: 4.1,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Cold Noodles',
    ingredients: ['Buckwheat noodles', 'Beef brisket', 'Cucumber', 'Pear', 'Egg', 'Vinegar', 'Mustard'],
    benefits: [
      'Cold noodles are a summer delicacy.',
      'Buckwheat noodles are easy to digest.',
      'Great for low-calorie diet meals.',
      'Rich in vitamins from fresh vegetables.',
    ],
    likeCount: 356,
    category: Category.Noodle,
    direction: ['Make and chill broth', 'Cook and rinse noodles', 'Add toppings to finish'],
    calories: 480,
    carbs: 85.3,
    protein: 22.7,
    fat: 7.8,
    sugars: 3.5,
    sodium: 890.2,
    fiber: 3.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Seafood Pancake',
    ingredients: ['Green onion', 'Squid', 'Shrimp', 'Flour', 'Egg', 'Red pepper', 'Seafood'],
    benefits: [
      'Seafood pancake is perfect for rainy days.',
      'Rich in protein and minerals from seafood.',
      'Allicin in green onions boosts immunity.',
      'Nutritious with various seafood ingredients.',
    ],
    likeCount: 334,
    category: Category.Traditional,
    direction: ['Make batter', 'Prepare seafood', 'Fry until crispy'],
    calories: 320,
    carbs: 42.3,
    protein: 18.7,
    fat: 12.4,
    sugars: 2.1,
    sodium: 650.8,
    fiber: 2.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Pork Bone Soup',
    ingredients: ['Pork spine', 'Potato', 'Green onion', 'Garlic', 'Red pepper flakes', 'Perilla seeds'],
    benefits: [
      'Rich in collagen good for bones.',
      'A nutritious dish high in protein and calcium.',
      'Perilla seeds add nutty flavor and nutrition.',
      'Spicy broth helps with fatigue recovery.',
    ],
    likeCount: 298,
    category: Category.Traditional,
    direction: ['Boil pork bones for broth', 'Prepare vegetables', 'Add seasonings and simmer'],
    calories: 450,
    carbs: 23.5,
    protein: 48.2,
    fat: 22.7,
    sugars: 3.4,
    sodium: 880.5,
    fiber: 3.1,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Kimchi Fried Rice',
    ingredients: ['Kimchi', 'Rice', 'Pork', 'Green onion', 'Sesame oil', 'Egg', 'Seaweed'],
    benefits: [
      'A quick and easy meal option.',
      'Good for gut health with fermented kimchi.',
      'Well-balanced in protein and carbohydrates.',
      'A delicious way to use leftover kimchi.',
    ],
    likeCount: 445,
    category: Category.Traditional,
    direction: ['Stir-fry kimchi', 'Add rice and stir-fry together', 'Top with egg'],
    calories: 550,
    carbs: 89.4,
    protein: 15.8,
    fat: 14.2,
    sugars: 2.7,
    sodium: 890.3,
    fiber: 3.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Braised Short Ribs',
    ingredients: ['Beef ribs', 'Radish', 'Carrot', 'Mushroom', 'Soy sauce', 'Garlic', 'Ginger'],
    benefits: [
      'A nutritious dish perfect for special occasions.',
      'Rich in high-quality protein.',
      'Radish and carrots aid digestion with fiber.',
      'Rich broth helps with fatigue recovery.',
    ],
    likeCount: 512,
    category: Category.Traditional,
    direction: ['Boil ribs', 'Make sauce', 'Braise'],
    calories: 680,
    carbs: 45.2,
    protein: 52.8,
    fat: 32.5,
    sugars: 8.9,
    sodium: 950.7,
    fiber: 4.2,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Spicy Stir-fried Pork',
    ingredients: ['Pork belly', 'Onion', 'Green onion', 'Gochugaru', 'Soy sauce', 'Garlic', 'Sugar'],
    benefits: [
      'A hearty and filling meal.',
      'Protein from meat provides satiety.',
      'Spiciness stimulates appetite.',
      'Rich in antioxidants from onions.',
    ],
    likeCount: 478,
    category: Category.Traditional,
    direction: ['Boil meat', 'Mix with seasonings', 'Stir-fry'],
    calories: 590,
    carbs: 25.3,
    protein: 42.7,
    fat: 38.4,
    sugars: 6.8,
    sodium: 880.4,
    fiber: 2.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Bean Sprout Soup with Rice',
    ingredients: ['Bean sprouts', 'Rice', 'Green onion', 'Garlic', 'Dried seaweed', 'Salt', 'Sesame oil'],
    benefits: [
      'A healthy dish perfect for hangover relief.',
      'Asparagine in bean sprouts helps cure hangovers.',
      'Low-calorie, high-protein meal.',
      'Warm broth soothes the stomach.',
    ],
    likeCount: 267,
    category: Category.Traditional,
    direction: ['Boil bean sprouts', 'Make broth', 'Serve with rice'],
    calories: 320,
    carbs: 58.4,
    protein: 12.7,
    fat: 4.2,
    sugars: 1.8,
    sodium: 680.5,
    fiber: 3.6,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Spicy Rice Cake Soup',
    ingredients: ['Rice cake', 'Fish cake', 'Egg', 'Green onion', 'Garlic', 'Red pepper paste', 'Sesame oil'],
    benefits: [
      'A traditional New Year dish.',
      'Chewy rice cakes provide satiety.',
      'Fish cake adds protein nutrition.',
      'Eggs add a soft, smooth texture.',
    ],
    likeCount: 345,
    category: Category.Traditional,
    direction: ['Make broth', 'Soak rice cakes', 'Add ingredients and boil'],
    calories: 410,
    carbs: 75.8,
    protein: 15.3,
    fat: 6.7,
    sugars: 3.2,
    sodium: 750.4,
    fiber: 1.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Stir-fried Squid',
    ingredients: ['Squid', 'Carrot', 'Onion', 'Green chili', 'Red pepper paste', 'Garlic', 'Sugar'],
    benefits: [
      'A low-fat, high-protein dish.',
      'Taurine in squid helps with fatigue recovery.',
      'Spiciness boosts metabolism.',
      'Various vegetables provide vitamins.',
    ],
    likeCount: 289,
    category: Category.Traditional,
    direction: ['Clean squid', 'Make sauce', 'Stir-fry'],
    calories: 280,
    carbs: 18.5,
    protein: 32.4,
    fat: 8.9,
    sugars: 4.7,
    sodium: 890.2,
    fiber: 2.9,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Seaweed Soup',
    ingredients: ['Seaweed', 'Beef', 'Garlic', 'Sesame oil', 'Soy sauce', 'Green onion'],
    benefits: [
      'Good for postpartum recovery and health.',
      'Rich in calcium and iodine from seaweed.',
      'Beef protein helps with recovery.',
      'A low-calorie healthy dish.',
    ],
    likeCount: 234,
    category: Category.Traditional,
    direction: ['Soak seaweed', 'Stir-fry beef', 'Make soup'],
    calories: 180,
    carbs: 12.4,
    protein: 15.8,
    fat: 8.9,
    sugars: 1.2,
    sodium: 520.3,
    fiber: 2.1,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Blood Sausage Soup',
    ingredients: ['Blood sausage', 'Bean sprouts', 'Green onion', 'Garlic', 'Salt', 'Pepper'],
    benefits: [
      'Blood sausage soup is a nutritious dish rich in iron.',
      'Vitamins in bean sprouts help with fatigue recovery.',
      'Warm broth helps maintain body temperature.',
      'Makes for a hearty meal.',
    ],
    likeCount: 278,
    category: Category.Traditional,
    direction: ['Boil blood sausage', 'Make broth', 'Add vegetables and simmer'],
    calories: 340,
    carbs: 28.6,
    protein: 22.4,
    fat: 15.7,
    sugars: 2.1,
    sodium: 780.5,
    fiber: 2.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Army Base Stew',
    ingredients: ['Spam', 'Sausage', 'Kimchi', 'Ramen noodles', 'Cheese', 'Tofu', 'Red pepper paste'],
    benefits: [
      'Army base stew is a Korean fusion dish.',
      'Provides rich nutrition from various ingredients.',
      'Probiotics in kimchi are good for gut health.',
      'Makes for a satisfying meal.',
    ],
    likeCount: 456,
    category: Category.Traditional,
    direction: ['Cut ingredients', 'Make broth', 'Add ingredients and boil'],
    calories: 520,
    carbs: 42.3,
    protein: 28.7,
    fat: 24.5,
    sugars: 4.8,
    sodium: 1250.6,
    fiber: 3.2,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Celebration Noodles',
    ingredients: ['Noodles', 'Anchovy broth', 'Zucchini', 'Egg', 'Green onion', 'Garlic', 'Soy sauce'],
    benefits: [
      'Celebration noodles are eaten for longevity on special occasions.',
      'Light broth is easy on the stomach.',
      'Simple but nutritious meal.',
      'Rich in vitamins from vegetables.',
    ],
    likeCount: 245,
    category: Category.Noodle,
    direction: ['Make broth', 'Cook noodles', 'Add toppings'],
    calories: 380,
    carbs: 68.5,
    protein: 12.8,
    fat: 5.3,
    sugars: 2.4,
    sodium: 890.5,
    fiber: 2.7,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Sweet and Spicy Fried Chicken',
    ingredients: ['Chicken', 'Sweet rice flour', 'Soy sauce', 'Garlic', 'Ginger', 'Red pepper paste', 'Honey'],
    benefits: [
      'Sweet and spicy fried chicken is a popular snack.',
      'Made with protein-rich chicken.',
      'Crispy coating adds texture.',
      'Sweet and spicy flavor stimulates appetite.',
    ],
    likeCount: 467,
    category: Category.Bunsik,
    direction: ['Fry chicken', 'Make sauce', 'Mix together'],
    calories: 450,
    carbs: 35.8,
    protein: 28.4,
    fat: 22.6,
    sugars: 12.5,
    sodium: 780.3,
    fiber: 1.2,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Cold Buckwheat Noodles in Broth',
    ingredients: ['Buckwheat noodles', 'Beef broth', 'Pear', 'Cucumber', 'Egg', 'Beef', 'Vinegar'],
    benefits: [
      'A representative summer health food.',
      'Cool broth helps beat the heat.',
      'Rich in buckwheat nutrients.',
      'Good for diet with low calories.',
    ],
    likeCount: 312,
    category: Category.Noodle,
    direction: ['Chill the broth', 'Cook and rinse noodles', 'Add toppings'],
    calories: 340,
    carbs: 65.8,
    protein: 18.4,
    fat: 4.2,
    sugars: 3.7,
    sodium: 780.5,
    fiber: 2.9,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Spicy Mixed Buckwheat Noodles',
    ingredients: ['Buckwheat noodles', 'Gochujang', 'Cucumber', 'Pear', 'Egg', 'Beef', 'Sesame oil'],
    benefits: [
      'Known for its sweet and sour taste.',
      'Buckwheat noodles are easy to digest.',
      'Rich in vitamins from vegetables.',
      'Contains healthy fermented nutrients from red pepper paste.',
    ],
    likeCount: 289,
    category: Category.Noodle,
    direction: ['Cook noodles', 'Cut vegetables', 'Mix with sauce'],
    calories: 420,
    carbs: 72.3,
    protein: 16.8,
    fat: 8.9,
    sugars: 5.2,
    sodium: 890.4,
    fiber: 3.1,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Pork Soup with Rice',
    ingredients: ['Pork', 'Rice', 'Green onion', 'Garlic', 'Soybean sprouts', 'Black pepper', 'Salt'],
    benefits: [
      'A hearty and filling meal.',
      'Rich in protein for energy replenishment.',
      'Warm broth helps warm the body.',
      'Rich in collagen for skin health.',
    ],
    likeCount: 378,
    category: Category.Traditional,
    direction: ['Boil pork', 'Make broth', 'Serve with rice'],
    calories: 520,
    carbs: 45.6,
    protein: 38.7,
    fat: 22.4,
    sugars: 2.1,
    sodium: 1100.5,
    fiber: 2.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Spicy Beef Soup',
    ingredients: ['Beef brisket', 'Bean sprouts', 'Green onion', 'Garlic', 'Red pepper flakes', 'Fernbrake', 'Egg'],
    benefits: [
      'A spicy nutritious soup known for its heat.',
      'Rich in protein from meat.',
      'Spiciness helps boost metabolism.',
      'Nutritious with various vegetables.',
    ],
    likeCount: 342,
    category: Category.Traditional,
    direction: ['Boil meat', 'Blanch vegetables', 'Simmer with spices'],
    calories: 380,
    carbs: 28.4,
    protein: 42.6,
    fat: 15.8,
    sugars: 3.4,
    sodium: 920.7,
    fiber: 3.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Knife-cut Noodle Soup',
    ingredients: ['Flour', 'Anchovy broth', 'Zucchini', 'Potato', 'Onion', 'Garlic', 'Black pepper'],
    benefits: [
      'A traditional noodle dish made with care.',
      'Light broth helps prevent colds.',
      'Hand-cut noodles provide satiety.',
      'Nutritious with added vegetables.',
    ],
    likeCount: 298,
    category: Category.Noodle,
    direction: ['Make noodle dough', 'Prepare broth', 'Add vegetables and cook'],
    calories: 410,
    carbs: 82.5,
    protein: 12.4,
    fat: 3.8,
    sugars: 2.9,
    sodium: 850.6,
    fiber: 2.7,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Braised Mackerel',
    ingredients: ['Mackerel', 'Radish', 'Green onion', 'Garlic', 'Red pepper powder', 'Soy sauce', 'Ginger'],
    benefits: [
      'A healthy dish rich in omega-3.',
      'Cooked with radish to reduce fishiness.',
      'Well-balanced in protein and fat.',
      'Rich in DHA for brain health.',
    ],
    likeCount: 267,
    category: Category.Traditional,
    direction: ['Clean mackerel', 'Cook with radish', 'Add seasoning sauce'],
    calories: 320,
    carbs: 12.8,
    protein: 28.5,
    fat: 18.9,
    sugars: 3.2,
    sodium: 650.4,
    fiber: 2.1,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Stir-fried Glass Noodles',
    ingredients: ['Glass noodles', 'Spinach', 'Carrot', 'Mushroom', 'Beef', 'Soy sauce', 'Sesame oil'],
    benefits: [
      'A nutritious holiday dish.',
      'Glass noodles are easily digestible carbohydrates.',
      'Rich in vitamins from various vegetables.',
      'Well-balanced nutrition from meat and vegetables.',
    ],
    likeCount: 423,
    category: Category.Traditional,
    direction: ['Soak glass noodles', 'Stir-fry ingredients', 'Mix everything together'],
    calories: 340,
    carbs: 58.7,
    protein: 15.4,
    fat: 8.2,
    sugars: 4.8,
    sodium: 720.5,
    fiber: 3.6,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Steamed Eggs',
    ingredients: ['Eggs', 'Green onion', 'Salt', 'Sesame oil', 'Water', 'Garlic', 'Fish sauce'],
    benefits: [
      'A nutritious dish with soft texture.',
      'Rich in protein and easy to digest.',
      'Simple but nutritious side dish.',
      'A healthy dish loved by children.',
    ],
    likeCount: 256,
    category: Category.BanChan,
    direction: ['Beat eggs', 'Season', 'Steam'],
    calories: 180,
    carbs: 2.4,
    protein: 14.8,
    fat: 12.5,
    sugars: 1.2,
    sodium: 450.8,
    fiber: 0.5,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Braised Tofu',
    ingredients: ['Tofu', 'Green onion', 'Garlic', 'Soy sauce', 'Red pepper flakes', 'Sesame oil', 'Sugar'],
    benefits: [
      'Braised tofu is a low-calorie, high-protein side dish.',
      'Cholesterol-free and healthy.',
      'Rich in plant-based protein.',
      'Soft texture that everyone can enjoy.',
    ],
    likeCount: 234,
    category: Category.BanChan,
    direction: ['Cut tofu', 'Make sauce', 'Braise'],
    calories: 150,
    carbs: 8.5,
    protein: 16.2,
    fat: 9.4,
    sugars: 2.1,
    sodium: 520.6,
    fiber: 1.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Spicy Rice Cakes',
    ingredients: ['Rice cakes', 'Fish cakes', 'Green onion', 'Gochugaru', 'Soy sauce', 'Sugar', 'Garlic'],
    benefits: [
      'A popular street food dish.',
      'Provides energy through carbohydrates.',
      'Contains protein from fish cakes.',
      'Known for its sweet and spicy taste.',
    ],
    likeCount: 567,
    category: Category.Bunsik,
    direction: ['Boil rice cakes', 'Make sauce', 'Cook together'],
    calories: 450,
    carbs: 89.5,
    protein: 12.3,
    fat: 6.8,
    sugars: 15.4,
    sodium: 890.7,
    fiber: 2.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Stir-fried Anchovies',
    ingredients: ['Dried anchovies', 'Green chili', 'Garlic', 'Soy sauce', 'Sugar', 'Sesame oil', 'Peanuts'],
    benefits: [
      'A side dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 189,
    category: Category.BanChan,
    direction: ['Sort anchovies', 'Make seasoning', 'Stir-fry'],
    calories: 120,
    carbs: 8.4,
    protein: 15.6,
    fat: 4.8,
    sugars: 2.3,
    sodium: 580.4,
    fiber: 0.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Braised Potatoes',
    ingredients: ['Potato', 'Carrot', 'Onion', 'Soy sauce', 'Sugar', 'Sesame oil', 'Garlic'],
    benefits: [
      'A mild-flavored side dish.',
      'A healthy dish with high satiety.',
      'Rich in vitamin C.',
      'A side dish loved by children.',
    ],
    likeCount: 223,
    category: Category.BanChan,
    direction: ['Cut potatoes', 'Make sauce', 'Braise'],
    calories: 150,
    carbs: 32.5,
    protein: 3.2,
    fat: 0.8,
    sugars: 4.6,
    sodium: 420.7,
    fiber: 2.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Seasoned Bean Sprouts',
    ingredients: ['Bean sprouts', 'Green onion', 'Garlic', 'Salt', 'Sesame oil', 'Sesame seeds'],
    benefits: [
      'A low-calorie healthy dish.',
      'Rich in fiber, good for preventing constipation.',
      'Rich in vitamin C.',
      'A simple and healthy side dish.',
    ],
    likeCount: 167,
    category: Category.BanChan,
    direction: ['Blanch bean sprouts', 'Season', 'Mix'],
    calories: 45,
    carbs: 6.8,
    protein: 4.2,
    fat: 1.5,
    sugars: 1.2,
    sodium: 320.5,
    fiber: 2.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Braised Fish Cakes',
    ingredients: ['Fish cakes', 'Onion', 'Carrot', 'Soy sauce', 'Sugar', 'Green onion', 'Sesame oil'],
    benefits: [
      'A simple side dish.',
      'Rich in protein.',
      'Great as a side dish for children.',
      'Can be eaten with various vegetables.',
    ],
    likeCount: 245,
    category: Category.BanChan,
    direction: ['Cut fish cakes', 'Make sauce', 'Braise'],
    calories: 180,
    carbs: 24.6,
    protein: 12.8,
    fat: 5.4,
    sugars: 6.2,
    sodium: 680.3,
    fiber: 1.2,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Stir-fried Dried Pollack',
    ingredients: ['Dried pollack', 'Carrot', 'Onion', 'Eggs', 'Soy sauce', 'Sesame oil', 'Garlic'],
    benefits: ['A low-fat, high-protein side dish.', 'Rich in calcium.', 'Has a clean, mild taste.', 'A nutritious side dish.'],
    likeCount: 178,
    category: Category.BanChan,
    direction: ['Soak dried pollack', 'Cut vegetables', 'Stir-fry'],
    calories: 140,
    carbs: 8.7,
    protein: 22.4,
    fat: 3.8,
    sugars: 2.1,
    sodium: 540.6,
    fiber: 1.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Stir-fried Zucchini',
    ingredients: ['Zucchini', 'Onion', 'Carrot', 'Ground meat', 'Soy sauce', 'Sesame oil', 'Garlic'],
    benefits: [
      'A side dish with soft texture.',
      'Great for low-calorie diets.',
      'Rich in vitamin C.',
      'Easy to digest healthy food.',
    ],
    likeCount: 198,
    category: Category.BanChan,
    direction: ['Cut zucchini', 'Cut vegetables', 'Stir-fry'],
    calories: 120,
    carbs: 14.5,
    protein: 8.2,
    fat: 4.6,
    sugars: 3.8,
    sodium: 420.5,
    fiber: 2.6,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Seasoned Spinach',
    ingredients: ['Spinach', 'Garlic', 'Soy sauce', 'Sesame oil', 'Sesame seeds', 'Salt'],
    benefits: ['A healthy dish rich in iron.', 'Rich in antioxidants.', 'Rich in vitamin A.', 'A low-calorie healthy side dish.'],
    likeCount: 212,
    category: Category.BanChan,
    direction: ['Blanch spinach', 'Season', 'Mix'],
    calories: 65,
    carbs: 7.8,
    protein: 5.4,
    fat: 2.3,
    sugars: 1.2,
    sodium: 380.4,
    fiber: 3.2,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Braised Black Beans',
    ingredients: ['Black beans', 'Soy sauce', 'Sugar', 'Green onion', 'Garlic', 'Sesame oil'],
    benefits: [
      'Rich in antioxidants.',
      'High in dietary fiber.',
      'A healthy dish rich in protein.',
      'Good for iron supplementation.',
    ],
    likeCount: 167,
    category: Category.BanChan,
    direction: ['Boil beans', 'Make sauce', 'Braise'],
    calories: 180,
    carbs: 28.4,
    protein: 12.6,
    fat: 3.8,
    sugars: 5.2,
    sodium: 420.5,
    fiber: 8.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Stir-fried Fish Cake with Vegetables',
    ingredients: ['Fish cake', 'Bell pepper', 'Onion', 'Carrot', 'Soy sauce', 'Sugar', 'Sesame oil'],
    benefits: [
      'A simple side dish.',
      'Rich in protein.',
      'Great as a side dish for children.',
      'Can be eaten with various vegetables.',
    ],
    likeCount: 234,
    category: Category.BanChan,
    direction: ['Cut fish cakes', 'Make sauce', 'Braise'],
    calories: 160,
    carbs: 22.4,
    protein: 10.8,
    fat: 4.6,
    sugars: 5.2,
    sodium: 580.4,
    fiber: 2.1,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Seasoned Kelp',
    ingredients: ['Kelp', 'Vinegar', 'Sugar', 'Red pepper flakes', 'Sesame oil', 'Garlic'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 156,
    category: Category.BanChan,
    direction: ['Soak kelp', 'Make sauce', 'Braise'],
    calories: 40,
    carbs: 8.2,
    protein: 2.4,
    fat: 0.6,
    sugars: 2.8,
    sodium: 320.5,
    fiber: 2.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Grilled Mackerel Pike',
    ingredients: ['Mackerel pike', 'Salt', 'Pepper', 'Lemon', 'Green onion', 'Garlic', 'Sesame oil'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 245,
    category: Category.Traditional,
    direction: ['Soak mackerel pike', 'Cut vegetables', 'Braise'],
    calories: 280,
    carbs: 2.4,
    protein: 32.6,
    fat: 16.8,
    sugars: 0.5,
    sodium: 580.3,
    fiber: 0.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Stir-fried Octopus',
    ingredients: ['Octopus', 'Green onion', 'Garlic', 'Red pepper paste', 'Sugar', 'Sesame oil', 'Cabbage'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 312,
    category: Category.Traditional,
    direction: ['Soak octopus', 'Cut vegetables', 'Braise'],
    calories: 220,
    carbs: 15.7,
    protein: 28.4,
    fat: 6.8,
    sugars: 4.2,
    sodium: 750.6,
    fiber: 2.1,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Braised Chicken with Ginseng',
    ingredients: ['Chicken', 'Ginseng', 'Garlic', 'Jujube', 'Ginger', 'Sweet rice', 'Green onion'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 423,
    category: Category.Traditional,
    direction: ['Soak chicken', 'Add ingredients', 'Braise'],
    calories: 450,
    carbs: 42.3,
    protein: 45.8,
    fat: 12.4,
    sugars: 3.2,
    sodium: 480.5,
    fiber: 2.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Grilled Short Ribs',
    ingredients: ['Beef ribs', 'Soy sauce', 'Garlic', 'Pear', 'Sugar', 'Sesame oil', 'Green onion'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 478,
    category: Category.Traditional,
    direction: ['Soak beef ribs', 'Add ingredients', 'Braise'],
    calories: 580,
    carbs: 18.4,
    protein: 48.6,
    fat: 35.2,
    sugars: 8.4,
    sodium: 820.5,
    fiber: 1.2,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Spicy Braised Chicken',
    ingredients: ['Chicken', 'Potato', 'Carrot', 'Red pepper paste', 'Soy sauce', 'Garlic', 'Green onion'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 356,
    category: Category.Traditional,
    direction: ['Soak chicken', 'Add ingredients', 'Braise'],
    calories: 420,
    carbs: 32.6,
    protein: 38.4,
    fat: 18.7,
    sugars: 5.8,
    sodium: 780.4,
    fiber: 3.2,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Grilled Pork Belly',
    ingredients: ['Pork belly', 'Garlic', 'Soy sauce', 'Sesame oil', 'Black pepper', 'Green onion', 'Salt'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 534,
    category: Category.Traditional,
    direction: ['Soak pork belly', 'Add ingredients', 'Braise'],
    calories: 650,
    carbs: 4.2,
    protein: 28.6,
    fat: 58.4,
    sugars: 1.2,
    sodium: 680.5,
    fiber: 0.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Kimchi Stew',
    ingredients: ['Kimchi', 'Pork', 'Tofu', 'Green onion', 'Garlic', 'Red pepper paste', 'Onion'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 467,
    category: Category.Traditional,
    direction: ['Soak kimchi', 'Add ingredients', 'Braise'],
    calories: 320,
    carbs: 18.5,
    protein: 24.7,
    fat: 16.8,
    sugars: 4.2,
    sodium: 920.7,
    fiber: 4.5,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Steamed Pork Wraps',
    ingredients: ['Pork', 'Kimchi', 'Tofu', 'Bean sprouts', 'Garlic', 'Sesame oil', 'Green onion'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 389,
    category: Category.Traditional,
    direction: ['Soak pork', 'Add ingredients', 'Braise'],
    calories: 480,
    carbs: 12.4,
    protein: 45.6,
    fat: 28.7,
    sugars: 2.4,
    sodium: 720.5,
    fiber: 3.8,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Spicy Chicken Feet',
    ingredients: ['Chicken feet', 'Red pepper paste', 'Garlic', 'Soy sauce', 'Sugar', 'Green onion', 'Ginger'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 278,
    category: Category.Traditional,
    direction: ['Soak chicken feet', 'Add ingredients', 'Braise'],
    calories: 280,
    carbs: 15.6,
    protein: 32.4,
    fat: 12.8,
    sugars: 6.7,
    sodium: 890.4,
    fiber: 1.4,
    images: ['kimchi-stew.jpg'],
  },
  {
    title: 'Rolled Omelette',
    ingredients: ['Eggs', 'Carrot', 'Green onion', 'Ham', 'Salt', 'Pepper', 'Oil'],
    benefits: [
      'A nutritious dish rich in calcium.',
      'Great as a snack or with drinks.',
      'Rich in calcium and protein.',
      'A nutty side dish perfect with rice.',
    ],
    likeCount: 245,
    category: Category.BanChan,
    direction: ['Soak eggs', 'Add ingredients', 'Braise'],
    calories: 180,
    carbs: 4.8,
    protein: 16.4,
    fat: 12.5,
    sugars: 1.8,
    sodium: 420.6,
    fiber: 0.9,
    images: ['kimchi-stew.jpg'],
  },
];

export default RECIPES;
