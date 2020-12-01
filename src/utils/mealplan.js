const fs = require('fs');
const path = require('path');

/* eslint-disable */
const meal_plan = {
  Day_one: {
    Breakfast: {
      Egg: ['A Bowl of pawpaw, one slice of toast bread & Egg'],
      Sausage: ['A Bowl of pawpaw, one slice of toast bread & Sausage'],
      Chicken: ['A Bowl of pawpaw, one slice of toast bread & Chicken'],
      Bacon: ['A Bowl of pawpaw, one slice of toast bread & Bacon'],
      Mushrooms: ['A Bowl of pawpaw, one slice of toast bread & Mushrooms'],
      Sardine: ['A Bowl of pawpaw, one slice of toast bread & Sardine'],
      Default: [
        'A Bowl of pawpaw, one slice of toast bread & a protein of your choice',
      ],
      Options: ['Egg', 'Sausage', 'Chicken', 'Bacon', 'Mushrooms', 'Sardine'],
      Information: [
        'Note - all forms of protein- 30g (1/2 cup) - 120 calories (without oil), Baked potatoes – 120g – 480calories, Mixed veggies, leafy green or tomatoes sauce –500g =  100calories',
      ],
    },

    Lunch: {
      Beef: [
        'Meal: Baked sweet potatoes. Mixed veggies: Onions, ginger garlic, bell papers ,carrots , green beans. Tomato sauce: Garlic, onions, basil, tomatoes, chili pepper. Protein: Beef',
      ],
      Fish: [
        'Meal: Baked sweet potatoes. Mixed veggies: Onions, ginger garlic, bell papers ,carrots , green beans. Tomato sauce: Garlic, onions, basil, tomatoes, chili pepper. Protein: Fish',
      ],
      Shrimp: [
        'Meal: Baked sweet potatoes. Mixed veggies: Onions, ginger garlic, bell papers ,carrots , green beans. Tomato sauce: Garlic, onions, basil, tomatoes, chili pepper. Protein: Shrimp',
      ],
      Chicken: [
        'Meal: Baked sweet potatoes. Mixed veggies: Onions, ginger garlic, bell papers ,carrots , green beans. Tomato sauce: Garlic, onions, basil, tomatoes, chili pepper. Protein: Chicken',
      ],
      Pork: [
        'Meal: Baked sweet potatoes. Mixed veggies: Onions, ginger garlic, bell papers ,carrots , green beans. Tomato sauce: Garlic, onions, basil, tomatoes, chili pepper. Protein: Pork',
      ],
      Turkey: [
        'Meal: Baked sweet potatoes. Mixed veggies: Onions, ginger garlic, bell papers ,carrots , green beans. Tomato sauce: Garlic, onions, basil, tomatoes, chili pepper. Protein: Turkey',
      ],
      Egg: [
        'Meal: Baked sweet potatoes. Mixed veggies: Onions, ginger garlic, bell papers ,carrots , green beans. Tomato sauce: Garlic, onions, basil, tomatoes, chili pepper. Protein:Egg ',
      ],
      Default: [
        'Meal: Baked sweet potatoes. Mixed veggies: Onions, ginger garlic, bell papers ,carrots , green beans. Tomato sauce: Garlic, onions, basil, tomatoes, chili pepper. Protein: Add a protein of your choice.',
      ],
      Options: ['Egg', 'Beef', 'Fish', 'Shrimp', 'Chicken', 'Pork', 'Turkey'],
      Information: [
        'Egg- 20g = 80 calories, Pawpaw - 500g = 100 calories, 1 slice bread = 65 calories, 1 link chicken, Sausage = 100calories, 1 strip of Bacon = 42 calories, One cup of Mushrooms = 21 calories, 1 quarter can oF sardine = 65calories',
      ],
    },

    Dinner: {
      Fish: [
        'Steamed vegetables – carrots, cauliflower, green peas, ginger, garlic, bell papers (red, yellow, green) & Fish',
      ],
      Shrimp: [
        'Steamed vegetables – carrots, cauliflower, green peas, ginger, garlic, bell papers (red, yellow, green) & Shrimp',
      ],
      Chicken: [
        'Steamed vegetables – carrots, cauliflower, green peas, ginger, garlic, bell papers (red, yellow, green) & Chicken',
      ],
      Pork: [
        'Steamed vegetables – carrots, cauliflower, green peas, ginger, garlic, bell papers (red, yellow, green) & Pork',
      ],
      Turkey: [
        'Steamed vegetables – carrots, cauliflower, green peas, ginger, garlic, bell papers (red, yellow, green) & Turkey',
      ],
      Egg: [
        'Steamed vegetables – carrots, cauliflower, green peas, ginger, garlic, bell papers (red, yellow, green) & Egg',
      ],
      Default: [
        'Steamed vegetables – carrots, cauliflower, green peas, ginger, garlic, bell papers (red, yellow, green) & a protein of your choice',
      ],
      Options: ['Egg', 'Fish', 'Shrimp', 'Chicken', 'Pork', 'Turkey'],
      Information: [
        'Steamed veggies -1000g -100calories, Egg -30g-120calories, Turkey -30g-120calories, Pork -30g-120calories, Beef-30g-120calories, Fish -30g-120calories, Shrimps -30g-120calories, Chicken -30g-120calories',
      ],
    },

    Snacks: {
      Default: ['Mixed Nuts -20g- 80calories'],
      Information: ['Mixed Nuts -20g- 80calories'],
    },
  },

  Day_two: {
    Breakfast: {
      Egg: [
        '1  boiled potato, steamed mixed vegetable, A cup of green tea & Scrambled Eggs',
      ],
      Sausage: [
        '1  boiled potato, steamed mixed vegetable, A cup of green tea & Sausages',
      ],
      Bacon: [
        '1  boiled potato, steamed mixed vegetable, A cup of green tea & Bacon',
      ],
      Mushrooms: [
        '1  boiled potato, steamed mixed vegetable, A cup of green tea & Mushrooms',
      ],
      Sardine: [
        '1  boiled potato, steamed mixed vegetable, A cup of green tea & Sardine',
      ],
      Default: [
        '1  boiled potato, steamed mixed vegetable, A cup of green tea & a protein of your choice.',
      ],
      Options: ['Egg', 'Sausage', 'Bacon', 'Mushrooms', 'Sardine'],
      Information: [
        'Egg - 20g= 80 calories, Pawpaw- 500g = 100 calories,1 sliced bread = 65 calories, 1 link chicken, Sausage = 100calories, 1 strip of Bacon = 42 calories, One cup Mushrooms = 21 calories, 1 quarter can of Sardine = 65calories',
      ],
    },

    Lunch: {
      Egg: ['Beans and plantain pottage with vegetables & Eggs'],
      Chicken: ['Beans and plantain pottage with vegetables & Chicken'],
      Pork: ['Beans and plantain pottage with vegetables & Pork'],
      Turkey: ['Beans and plantain pottage with vegetables & Turkey'],
      Default: [
        'Beans and plantain pottage with vegetables & a protein of your choice',
      ],
      Options: ['Egg', 'Chicken', 'Pork', 'Turkey'],
      Information: [
        'Note – all forms of protein – 30g – 120 calories –(without oil), Beans – 100g – 400calories –cooked without oil, Plantain -25g (boiled) - 100calories, Vegetables – 400g – 80 calories, Total calories – 700',
      ],
    },

    Dinner: {
      Fish: ['Pepper soup – uziza leaf & Fish'],
      Chicken: ['Pepper soup – uziza leaf & Chopped Chicken'],
      Beef: ['Pepper soup – uziza leaf & Chopped beef'],
      Pork: ['Pepper soup – uziza leaf & Chopped pork'],
      Turkey: ['Pepper soup – uziza leaf & Chopped turkey'],
      Default: ['Pepper soup – uziza leaf & a protein of your choice'],
      Options: ['Chicken', 'Fish', 'Beef', 'Pork', 'Turkey'],
      Information: [
        'Beef – 60g – 240kcalories, Fish – 60g- uziza leaf, Chicken – 60g – 240kcalories, Pork- 60g- 240calories, Turkey – 60g-240kcalories',
      ],
    },

    Snacks: {
      Default: ['Cucumber 1 medium(150g)- 20calories'],
      Information: ['Cucumber 1 medium(150g)- 20calories'],
    },
  },

  Day_three: {
    Breakfast: {
      Egg: [
        'Quaker Oat+ Bowl of Pawpaw & boiled egg',
        'Unsweetened oats, fruits ( 1 banana, half an apple and dates), boiled egg & Tea',
      ],
      Default: [
        'Oat Granola Cereal (1/2Cup) + Soy Milk + Green Juice smoothie (Kale, Cucumber, celery, apple)',
        'A bowl of cereal, Banana Smoothie Oat Cereal &  Milk Alternative (soy milk)',
        'Fruity Cereal, greek yogurt & berries',
        'Mixed fruit granula + plant based milk(coconut milk)',
      ],
      Options: ['Egg'],
      Information: [
        '1 cup of Banana smoothie = 224 calories, 1 cup of green smoothie = 83 calories, 1 glass of soymilk = 127 calories, 1/2 cup of Oat granola =  195 calories, 1 Cup Unsweetened oat= 156 calories, 1 cup Quaker oat= 158 calories, 1 cup cereal = 100 calories, 1 Egg= 78 calories, 1 cup of Greek Yogurt = 59 calories',
      ],
    },

    Lunch: {
      Meat: ['Jollof rice (basmati), Salad & Meat'],
      Beef: ['Jollof rice (basmati), Salad & Beef'],
      Fish: ['Jollof rice (basmati), Salad & Fish'],
      Shrimp: ['Jollof rice (basmati), Salad & Shrimp'],
      Chicken: ['Jollof rice (basmati), Salad & Chicken'],
      Pork: ['Jollof rice (basmati), Salad & Pork'],
      Turkey: ['Jollof rice (basmati), Salad & Turkey'],
      Egg: ['Jollof rice (basmati), Salad & Egg'],
      Default: ['Jollof rice (basmati), Salad & a protein of your choice'],
      Options: [
        'Meat',
        'Beef',
        'Fish',
        'Shrimp',
        'Chicken',
        'Pork',
        'Turkey',
        'Egg',
      ],
      Information: [
        'Note – all forms of protein – 30g – 120 calories, Rice – 125g – 500calories (boiled), Seasonal salad - 400g – 80calories',
      ],
    },

    Dinner: {
      Fish: ['Boiled plantain & garden egg sauces & Fish'],
      Chicken: ['Boiled plantain & garden egg sauces & grilled Chicken'],
      Shrimp: ['Boiled plantain & garden egg sauces & Shrimps'],
      Beef: ['Boiled plantain & garden egg sauces & Beef'],
      Pork: ['Boiled plantain & garden egg sauces & grilled pork'],
      Turkey: ['Boiled plantain & garden egg sauces & grilled turkey'],
      Default: [
        'Boiled plantain & garden egg sauces & a protein of your choice',
      ],
      Options: ['Chicken', 'Fish', 'Beef', 'Pork', 'Turkey', 'Shrimp'],
      Information: [
        'Fish -30g- 120calories, Boiled Plantain 30g-120 calories, Garden Egg- 25g- 100 calories, Egg- 30g -120 calories, Turkey - 30g-120 calories, Pork- 30g-120 calories, Chicken - 30g- 120calories, Shrimps-30g - 120calories',
      ],
    },

    Snacks: {
      Default: ['Pawpaw- 100g – 32calories'],
      Information: ['Pawpaw- 100g – 32calories'],
    },
  },

  Day_four: {
    Breakfast: {
      Fish: ['Honey sweetened Pap, Moi Moi & grilled fish'],
      Chicken: ['Honey sweetened Pap, Moi Moi & Chicken'],
      Egg: ['Honey sweetened Pap, Moi Moi & Egg'],
      Sausage: ['Honey sweetened Pap, Moi Moi & Sausage'],
      Default: ['Honey sweetened Pap, Moi Moi & a protein of your choice'],
      Options: ['Egg', 'Sausage', 'Chicken', 'Fish'],
      Information: [
        'Pap- 20g = 80 calories, moimoi - 50g = 200 calories, Fish - 30g = 120 calories, 1 link Sausage = 100 calories, 1 boiled egg = 78calories, 1 chicken thigh - 238 calories',
      ],
    },

    Lunch: {
      Beef: ['Amala (White or Black) with Okra Soup & Mixed Vegetables & Beef'],
      Fish: ['Amala (White or Black) with Okra Soup & Mixed Vegetables & Fish'],
      Chicken: [
        'Amala (White or Black) with Okra Soup & Mixed Vegetables & Chicken',
      ],
      Pork: ['Amala (White or Black) with Okra Soup & Mixed Vegetables & Pork'],
      Turkey: [
        'Amala (White or Black) with Okra Soup & Mixed Vegetables & Turkey',
      ],
      Default: [
        'Amala (White or Black) with Okra Soup & Mixed Vegetables & a protein of your choice',
      ],
      Options: ['Beef', 'Fish', 'Chicken', 'Pork', 'Turkey'],
      Information: [
        'Note – all forms of protein – 30g- 120calories Amala – 125g -  500calories, Okra soup with vegetables – 400g – 80calories, Total calories - 700',
      ],
    },

    Dinner: {
      Beef: [
        'Moi- moi & veggies –(mixed veggies –carrots, peas, corn, sweet paper, garlic & ginger) & Beef',
      ],
      Fish: [
        'Moi- moi & veggies –(mixed veggies –carrots, peas, corn, sweet paper, garlic & ginger) & Fish',
      ],
      Shrimp: [
        'Moi- moi & veggies –(mixed veggies –carrots, peas, corn, sweet paper, garlic & ginger) & Shrimps',
      ],
      Chicken: [
        'Moi- moi & veggies –(mixed veggies –carrots, peas, corn, sweet paper, garlic & ginger) & Chicken',
      ],
      Pork: ['Boiled plantain & garden egg sauces & grilled pork'],
      Turkey: [
        'Moi- moi & veggies –(mixed veggies –carrots, peas, corn, sweet paper, garlic & ginger) & Turkey',
      ],
      Egg: [
        'Moi- moi & veggies –(mixed veggies –carrots, peas, corn, sweet paper, garlic & ginger) & Egg',
      ],
      Default: [
        'Moi- moi & veggies –(mixed veggies –carrots, peas, corn, sweet paper, garlic & ginger) & a protein of your choice',
      ],
      Options: ['Chicken', 'Fish', 'Beef', 'Pork', 'Turkey', 'Shrimp', 'Egg'],
      Information: [
        'Beef- 30g- 120calories, Moi-moi- 25g- 100calories, Veggies – 600g – 120 calories, Egg - 600g- 120calories, Turkey - 600g- 120calories, Pork - 30g- 120calories, Chicken - 30g- 120calories, Shrimps - 30g- 120calories, Fish - 30g- 120calories',
      ],
    },

    Snacks: {
      Default: ['Banana -1 medium size -100g -139calories'],
      Information: ['Banana -1 medium size -100g -139calories'],
    },
  },

  Day_five: {
    Breakfast: {
      Fish: [
        'Unripe/Semi ripe Grilled Plantain, Vegetable Sauce & Grilled Fish',
      ],
      Egg: [
        'Unripe/Semi ripe Grilled Plantain, Vegetable Sauce & Scrambled Egg',
      ],
      Turkey: [
        'Unripe/Semi ripe Grilled Plantain, Vegetable Sauce & grilled Turkey',
      ],
      Chicken: [
        'Unripe/Semi ripe Grilled Plantain, Vegetable Sauce & Chopped Chicken',
      ],
      Shrimp: ['Unripe/Semi ripe Grilled Plantain, Vegetable Sauce & Shrimp'],
      Default: [
        'Unripe/Semi ripe Grilled Plantain, Vegetable Sauce & a protein of your choice',
      ],
      Options: ['Fish', 'Egg', 'Turkey', 'Chicken', 'Shrimp'],
      Information: [
        'Unripe plantain - 50g = 200 calories, Vegetables - 20g = 80 calories, Fish- 30g = 120 calories, 85g of grilled turkey = 177 calories, 85g of grilled Chicken breast = 110 calories, 85g Shrimp= 85 calories',
      ],
    },

    Lunch: {
      Meat: ['Plantain flour swallow Edikaikong soup (Oil free) & Meat'],
      Beef: ['Plantain flour swallow Edikaikong soup (Oil free) & Beef'],
      Fish: ['Plantain flour swallow Edikaikong soup (Oil free) & Fish'],
      Chicken: ['Plantain flour swallow Edikaikong soup (Oil free) & Chicken'],
      Pork: ['Plantain flour swallow Edikaikong soup (Oil free) & Pork'],
      Turkey: ['Plantain flour swallow Edikaikong soup (Oil free) & Turkey'],
      Default: [
        'Plantain flour swallow Edikaikong soup (Oil free) & a protein of your choice',
      ],
      Options: ['Meat', 'Beef', 'Fish', 'Chicken', 'Pork', 'Turkey'],
      Information: [
        'Note – all forms of protein – 30g – 120 calories, Plantain Flour Swallow – 125g – 244 calories, Edikaikong soup – 400g – 300 calories, 1 Apple = 95 calories',
      ],
    },

    Dinner: {
      Fish: [
        'Seasonal vegetable stir-fry  (Carrot, green beans, garlic, ginger, bell paper, cucumber) & Fish',
      ],
      Chicken: [
        'Seasonal vegetable stir-fry  (Carrot, green beans, garlic, ginger, bell paper, cucumber) & Chicken',
      ],
      Shrimp: [
        'Seasonal vegetable stir-fry  (Carrot, green beans, garlic, ginger, bell paper, cucumber) & Shrimps',
      ],
      Beef: [
        'Seasonal vegetable stir-fry  (Carrot, green beans, garlic, ginger, bell paper, cucumber) & Beef',
      ],
      Pork: [
        'Seasonal vegetable stir-fry  (Carrot, green beans, garlic, ginger, bell paper, cucumber) & pork',
      ],
      Turkey: [
        'Seasonal vegetable stir-fry  (Carrot, green beans, garlic, ginger, bell paper, cucumber) & turkey',
      ],
      Default: [
        'Seasonal vegetable stir-fry  (Carrot, green beans, garlic, ginger, bell paper, cucumber) & a protein of your choice',
      ],
      Options: ['Chicken', 'Fish', 'Beef', 'Pork', 'Turkey', 'Shrimp'],
      Information: [
        'Turkey  – 30g- 120calories, Vegetables – 1100g – 220calories, Pork – 30g- 120calories, Shrimps  – 30g- 120calories, Fish  – 30g- 120calories, Beef – 30g- 120calories, Chicken- 30g- 120calories',
      ],
    },

    Snacks: {
      Default: ['Apple -60 calories'],
      Information: ['Apple -60 calories'],
    },
  },

  Day_six: {
    Breakfast: {
      Sausage: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & sausages',
      ],
      Egg: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & boiled egg',
      ],
      Turkey: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & turkey',
      ],
      Chicken: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & chicken stir fry',
      ],
      Fish: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & grilled fish',
      ],
      Default: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & a protein of your choice',
      ],
      Options: ['Sausage', 'Egg', 'Turkey', 'Chicken', 'Fish'],
      Information: [
        '1/2 cup of  Quinoa= 114 calories, Fish- 30g = 120 calories, 85g of grilled turkey= 177 calories, 85g of grilled Chicken breast =110 calories, 85g Shrimp=  85 calories, 1/5 Avocado= 64 calories, 1 cup diced watermelon= 30 calories, 1 cup diced Pineapple = 1 serving of steamed mixed Vegetable= 50 calories',
      ],
    },

    Lunch: {
      Beef: [
        'Boiled, baked or roasted Yam with Garden egg sauce & mushroom & Beef',
      ],
      Fish: [
        'Boiled, baked or roasted Yam with Garden egg sauce & mushroom & Fish',
      ],
      Shrimp: [
        'Boiled, baked or roasted Yam with Garden egg sauce & mushroom & Shrimp',
      ],
      Chicken: [
        'Boiled, baked or roasted Yam with Garden egg sauce & mushroom & Chicken',
      ],
      Pork: [
        'Boiled, baked or roasted Yam with Garden egg sauce & mushroom & Pork',
      ],
      Turkey: [
        'Boiled, baked or roasted Yam with Garden egg sauce & mushroom & Turkey',
      ],
      Egg: [
        'Boiled, baked or roasted Yam with Garden egg sauce & mushroom & Egg',
      ],
      Default: [
        'Boiled, baked or roasted Yam with Garden egg sauce & mushroom & a protein of your choice.',
      ],
      Options: ['Beef', 'Fish', 'Shrimp', 'Chicken', 'Pork', 'Turkey', 'Egg'],
      Information: [
        'Note- all forms of protein-30g- 120calories, Boiled yam-125g- 500calories, Garden egg sauce with mushroom -400g -80calories, Total calories - 700',
      ],
    },

    Dinner: {
      Fish: ['Vegetable salad – all green & Fish'],
      Chicken: ['Vegetable salad – all green & Chicken'],
      Egg: ['Vegetable salad – all green & Egg'],
      Beef: ['Vegetable salad – all green & Beef'],
      Pork: ['Vegetable salad – all green & pork ribs'],
      Turkey: ['Vegetable salad – all green & turkey'],
      Default: ['Vegetable salad – all green & a protein of your choice'],
      Options: ['Chicken', 'Fish', 'Beef', 'Pork', 'Turkey', 'Egg'],
      Information: [
        'Egg -30g- 120calories, Salad- 1100g- 220calories, Turkey -30g- 120calories, pork-30g- 120calories, Chicken -30g- 120calories, Beef-30g- 120calories',
      ],
    },

    Snacks: {
      Default: ['Carrots -1 medium size - 60g - 29 calories'],
      Information: ['Carrots - 1 medium size -60g - 29 calories'],
    },
  },

  Day_seven: {
    Breakfast: {
      Sausage: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & sausages',
      ],
      Bacon: [''],
      Mushrooms: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & sausage',
      ],
      Options: ['Sausage', 'Bacon', 'Mushrooms'],
      Default: [
        'Quinoa, mixed veggie, avocado, pineapple, watermelon fruit & a protein of your choice.',
      ],
      Information: [
        'Per Banana Pancake= 40 calories, A glass of unsweetened yogurt = 59 calories, 1 Sausage = 100 calories, 1 strip Bacon = 42 calories, 1 cup Mushrooms =  21 calories',
      ],
    },

    Lunch: {
      Beef: ['Moi-moi, Sauteed vegetables & Beef'],
      Fish: ['Moi-moi, Sauteed vegetables & Fish'],
      Shrimp: ['Moi-moi, Sauteed vegetables & Shrimps'],
      Chicken: ['Moi-moi, Sauteed vegetables & Chicken'],
      Pork: ['Moi-moi, Sauteed vegetables & Pork'],
      Turkey: ['Moi-moi, Sauteed vegetables & Turkey'],
      Egg: ['Moi-moi, Sauteed vegetables & Egg'],
      Default: [
        'Moi-moi, Sauteed vegetables & Egg & a protein of your choice.',
      ],
      Options: ['Beef', 'Fish', 'Shrimp', 'Chicken', 'Pork', 'Turkey', 'Egg'],
      Information: [
        'Note- all forms of protein-30g -120g, Moi-moi – 125g – 500calories, Sauteed vegetables-200g- 40 calories, 2  Banana- 200g- 40 calories, Total calories - 700',
      ],
    },

    Dinner: {
      Fish: [
        'Greek salads – kale, red bell pepper, green bell pepper, red onions, cucumber  - Dressing with extra virgin olive oil or coconut oil , lemon, mince garlic, black paper, pinch sea salt ) & Fish',
      ],
      Beef: [
        'Greek salads – kale, red bell pepper, green bell pepper, red onions, cucumber  - Dressing with extra virgin olive oil or coconut oil , lemon, mince garlic, black paper, pinch sea salt ) & Beef',
      ],
      Shrimp: [
        'Greek salads – kale, red bell pepper, green bell pepper, red onions, cucumber  - Dressing with extra virgin olive oil or coconut oil , lemon, mince garlic, black paper, pinch sea salt ) & Shrimps',
      ],
      Chicken: [
        'Greek salads – kale, red bell pepper, green bell pepper, red onions, cucumber  - Dressing with extra virgin olive oil or coconut oil , lemon, mince garlic, black paper, pinch sea salt ) & Chicken',
      ],
      Egg: [
        'Greek salads – kale, red bell pepper, green bell pepper, red onions, cucumber  - Dressing with extra virgin olive oil or coconut oil , lemon, mince garlic, black paper, pinch sea salt ) & Egg',
      ],
      Pork: [
        'Greek salads – kale, red bell pepper, green bell pepper, red onions, cucumber  - Dressing with extra virgin olive oil or coconut oil , lemon, mince garlic, black paper, pinch sea salt ) & pork ribs',
      ],
      Turkey: [
        'Greek salads – kale, red bell pepper, green bell pepper, red onions, cucumber  - Dressing with extra virgin olive oil or coconut oil , lemon, mince garlic, black paper, pinch sea salt ) & turkey',
      ],
      Default: [
        'Greek salads – kale, red bell pepper, green bell pepper, red onions, cucumber  - Dressing with extra virgin olive oil or coconut oil , lemon, mince garlic, black paper, pinch sea salt ) & a protein of your choice',
      ],
      Options: ['Fish', 'Beef', 'Shrimp', 'Chicken', 'Pork', 'Turkey', 'Egg'],
      Information: [
        'Egg  -30g -120calories, Greek Salad- 1100g- 220calories, Turkey  -30g -120calories, Pork  -30g -120calories, Chicken -30g -120calories, Shrimps -30g -120calories, Fish  -30g -120calories, Pineapple – 100g -46calories, Beef -30g -120calories',
      ],
    },

    Snacks: {
      Default: ['Pineapple – 100g -46calories'],
      Information: ['Pineapple – 100g -46calories'],
    },
  },
};

/* eslint-enable */

// read and write json
const writeMealPlan = (mealPlan, filename) => {
  try {
    fs.writeFileSync(
      path.join(__dirname, '..', '..', filename),
      JSON.stringify(mealPlan)
    );
  } catch (error) {
    console.error(error);
  }
};

// read and write json
const readMealPlan = (filename) => {
  try {
    return JSON.parse(
      fs.readFileSync(path.join(__dirname, '..', '..', filename), 'utf8')
    );
  } catch (error) {
    console.error(error);
  }
};

// writeMealPlan(meal_plan, 'mealPlan.json');
// mealPlanObject = readMealPlan('mealPlan.json');
// console.log(mealPlanObject);

const getOptions = (jsonPlan) => {
  let choices = [];
  for (const [day, meals] of Object.entries(jsonPlan)) {
    // search through the dictionary and get the options on each meal
    for (const [meal, data] of Object.entries(meals)) {
      if (data.Options) {
        for (const option of data.Options) {
          choices.push(option);
        }
      }
    }
  }
  choices = new Set(choices);
  choices = Array.from(choices);
  choices = choices.sort((a, b) => {
    if (a > b) {
      return 1;
    }
    return -1;
  });
  return choices;
};

// console.log(getOptions(mealPlanObject));

function getRandomDay(mealPlan) {
  const keysOfMealPlan = Object.keys(mealPlan);
  const lengthOfMealPlan = keysOfMealPlan.length - 1;
  const randomValue = Math.ceil(Math.random() * lengthOfMealPlan);
  return keysOfMealPlan[randomValue];
}

// console.log(getRandomDay(mealPlanObject));

function getRandomMealFrom(data, search) {
  const meal = data[search];

  const keysOfMeal = Object.keys(meal);
  // console.log(keysOfMeal);
  const lengthOfMeal = keysOfMeal.length - 1;
  const randomValue = Math.ceil(Math.random() * lengthOfMeal) || 0;
  return meal[randomValue];
}

// console.log(getRandomMealFrom(mealPlanObject.Day_one.Breakfast, 'Egg'));
// console.log(getRandomMealFrom(mealPlanObject.Day_one.Breakfast, 'Default'));

function createRandomMealPlan(mealPlan, usersChoice, days = 28) {
  const customMealPlan = {};
  const mealSets = ['Breakfast', 'Lunch', 'Dinner', 'Snacks'];

  for (let dayCount = 1; dayCount <= days; dayCount += 1) {
    const day = `day${dayCount}`;
    if (!customMealPlan[day]) {
      customMealPlan[day] = {};
    }

    for (const meal of mealSets) {
      // get the meal info from a random day from the meal_plan
      const randDay = getRandomDay(mealPlan);

      // e.g meal_plan['Day_one']['Lunch']
      const mealInfo = mealPlan[randDay][meal];
      // console.log(mealInfo);

      if (mealInfo && mealInfo.Options) {
        const choices = [];
        for (const option of mealInfo.Options) {
          if (usersChoice.includes(option)) {
            choices.push(option);
          }
        }
        if (choices && choices.length > 0) {
          // check if the options match with the users selected protein choices, pick one at random.
          const randomValue = Math.ceil(Math.random() * (choices.length - 1));
          const choice = choices[randomValue];
          // console.clear();
          customMealPlan[day][meal] = getRandomMealFrom(mealInfo, choice);
        } else {
          customMealPlan[day][meal] = getRandomMealFrom(mealInfo, 'Default');
        }
      } else {
        customMealPlan[day][meal] = getRandomMealFrom(mealInfo, 'Default');
      }
    }
  }
  return customMealPlan;
}

// console.log(createRandomMealPlan(mealPlanObject, ['Beef', 'Egg'], 1));
// console.log(
//   createRandomMealPlan(
//     mealPlanObject,
//     ['Egg', 'Beef', 'Chicken', 'Turkey', 'Fish'],
//     7
//   )
// );
module.exports = {
  createRandomMealPlan,
  readMealPlan,
  writeMealPlan,
  mealPlan: meal_plan,
  getOptions,
  getRandomMealFrom,
  getRandomDay,
};
