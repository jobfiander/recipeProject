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
		name: 'Sushi',
		image: 'http://lorempixel.com/image_output/food-q-c-640-480-8.jpg',
		prepTime: 60,
		rating: 2
	},
	{
		id: 2,
		name: 'Hamburger',
		image: 'http://lorempixel.com/image_output/food-q-c-640-480-9.jpg',
		prepTime: 15,
		rating: 4,
		directions: 'Preheat an outdoor grill for medium-high heat. Combine ground sirloin, onion, grill seasoning, liquid smoke, Worcestershire sauce, garlic, adobo sauce, and chipotle pepper in a large bowl. Form the mixture into 6 patties. Season with salt and pepper. Place burgers on preheated grill and cook until no longer pink in the center. Place a slice of Cheddar cheese on top of each burger one minute before they are ready. Place burgers on buns to serve.',
		ingredients
	},
	{
		id: 3,
		name: 'Stir Fry',
		image: 'http://lorempixel.com/image_output/food-q-c-640-480-6.jpg',
		prepTime: 20,
		rating: 3
	}
]