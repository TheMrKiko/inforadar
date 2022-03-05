export function getMainCategory(categories, indicatorData) {
	return categories
		.map(category => ({
			...indicatorData.categories[category.id],
			...category
		}))
		.sort((a, b) => b.score - a.score)[0];
}

export const compose = (...fn) => arg => fn.reduce((returned, fn) => fn(returned), arg)