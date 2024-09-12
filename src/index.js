import { fetchProductsByCategory } from './js/api';
import { addToCart } from './js/cart';
import { renderProducts } from './js/dom';

const init = () => {
	const buttons = document.querySelectorAll('.store__category-button');
	const productList = document.querySelector('.store__list');

	const changeCategory = async ({ target }) => {
		const category = target.textContent;

		buttons.forEach((button) => {
			button.classList.remove('store__category-button--active');
		});

		target.classList.add('store__category-button--active');
		const products = await fetchProductsByCategory(category);
		renderProducts(products, productList);
	};

	buttons.forEach((button) => {
		button.addEventListener('click', changeCategory);

		if (button.classList.contains('store__category-button--active')) {
			changeCategory({ target: button });
		}
	});

	productList.addEventListener('click', ({ target }) => {
		if (target.closest('.product__button-add-cart')) {
			const productId = target.dataset.id;
			addToCart(productId);
		}
	});
};

init();