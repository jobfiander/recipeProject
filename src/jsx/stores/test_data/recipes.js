const ingredients = [
	{
		name: '2 pounds ground beef sirloin',
		listed: false
	},
	{
		name: '1/2 onion, grated',
		listed: false
	},
	{
		name: '1 tablespoon grill seasoning',
		listed: false
	},
	{
		name: '1 tablespoon liquid smoke flavoring',
		listed: false
	},
	{
		name: '2 tablespoons Worcestershire sauce',
		listed: false
	},
	{
		name: '2 tablespoons minced garlic',
		listed: false
	},
	{
		name: '1 tablespoon adobo sauce from canned chipotle peppers',
		listed: false
	},
	{
		name: '1 chipotle chile in adobo sauce, chopped',
		listed: false
	},
	{
		name: 'salt and pepper to taste',
		listed: false
	},
	{
		name: '6 (1 ounce) slices sharp Cheddar cheese (optional)',
		listed: false
	},
	{
		name: '6 hamburger buns',
		listed: false
	}
]

export default [
	{
		id: 1,
		name: 'So Sukiyaki',
		image: '/images/photos/pexels-ramen.jpg',
		prepTime: 60,
		rating: 2,
		loved: true,
		category: 'ramen',
		directions: 'Preheat an outdoor grill for medium-high heat. Combine ground sirloin, onion, grill seasoning, liquid smoke, Worcestershire sauce, garlic, adobo sauce, and chipotle pepper in a large bowl. Form the mixture into 6 patties. Season with salt and pepper. Place burgers on preheated grill and cook until no longer pink in the center. Place a slice of Cheddar cheese on top of each burger one minute before they are ready. Place burgers on buns to serve.',
		servingSize: 2,
		ingredients,
	},
	{
		id: 2,
		name: 'Go Burger',
		image: '/images/photos/bread-salad-lunch-meal.jpg',
		prepTime: 15,
		rating: 4,
		directions: 'Preheat an outdoor grill for medium-high heat. Combine ground sirloin, onion, grill seasoning, liquid smoke, Worcestershire sauce, garlic, adobo sauce, and chipotle pepper in a large bowl. Form the mixture into 6 patties. Season with salt and pepper. Place burgers on preheated grill and cook until no longer pink in the center. Place a slice of Cheddar cheese on top of each burger one minute before they are ready. Place burgers on buns to serve.',
		ingredients,
		loved: false,
		category: 'burgers',
		servingSize: 1,
	},
	{
		id: 3,
		name: 'Sproutwich',
		image: '/images/photos/bread-food-salad-sandwich.jpg',
		prepTime: 5,
		rating: 1,
		loved: false,
		category: 'vegetarian',
		directions: 'Preheat an outdoor grill for medium-high heat. Combine ground sirloin, onion, grill seasoning, liquid smoke, Worcestershire sauce, garlic, adobo sauce, and chipotle pepper in a large bowl. Form the mixture into 6 patties. Season with salt and pepper. Place burgers on preheated grill and cook until no longer pink in the center. Place a slice of Cheddar cheese on top of each burger one minute before they are ready. Place burgers on buns to serve.',
		servingSize: 0,
		ingredients,
	},
	{
		id: 4,
		name: 'Chicken Thing',
		image: '/images/photos/befa5c7cfca376be94eddaf5af8d72f6.jpg',
		prepTime: 35,
		rating: 3,
		loved: true,
		category: 'bbq',
		directions: 'Preheat an outdoor grill for medium-high heat. Combine ground sirloin, onion, grill seasoning, liquid smoke, Worcestershire sauce, garlic, adobo sauce, and chipotle pepper in a large bowl. Form the mixture into 6 patties. Season with salt and pepper. Place burgers on preheated grill and cook until no longer pink in the center. Place a slice of Cheddar cheese on top of each burger one minute before they are ready. Place burgers on buns to serve.',
		servingSize: 2,
		ingredients,
	},
	{
		id: 5,
		name: 'Fettuccine',
		image: '/images/photos/food-pasta-tomato-theme-workspaces.jpg',
		prepTime: 20,
		rating: 3,
		loved: true,
		directions: 'In a large bowl combine chopped tomatoes, minced garlic, brie, chopped basil, olive oil, vinegar, salt and pepper. Mix well. Cover and let stand at room temperature to marinate for 1 to 2 hours. In a large pot of boiling salted water over high heat, cook the fettuccine until al dente, about 12 minutes. Drain the fettuccine and toss with the sauce. Sprinkle with grated Parmesan cheese.',
		category: 'pasta',
		servingSize: 2,
		ingredients,
	},
		{
		id: 6,
		name: 'Veggiza',
		image: '/images/photos/food-pizza-fast-food.jpg',
		prepTime: 9001,
		rating: 3,
		loved: true,
		directions: 'Preheat an outdoor grill for medium-high heat. Combine ground sirloin, onion, grill seasoning, liquid smoke, Worcestershire sauce, garlic, adobo sauce, and chipotle pepper in a large bowl. Form the mixture into 6 patties. Season with salt and pepper. Place burgers on preheated grill and cook until no longer pink in the center. Place a slice of Cheddar cheese on top of each burger one minute before they are ready. Place burgers on buns to serve.',
		category: 'sayian',
		servingSize: 2,
		ingredients,
	},
]