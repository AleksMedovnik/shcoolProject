'use strict'
const basketShop = document.getElementById('basketShop'); // корзина
const basketShopWrap = document.getElementById('basketShopWrap'); // контейнер для корзины
const itemBox = document.querySelectorAll('.item_box'); // блок каждого товара
const cartCont = document.getElementById('cart_content'); // блок вывода данных корзины
const clearCart = document.getElementById('clear_cart'); // кнопка очистки корзины


// Устанавливаем обработчик события на каждую кнопку "Добавить в корзину"
itemBox.forEach(item => item.querySelector('.add_item').addEventListener('click', cart.addToCart.bind(this, '.item_title', '.item_price', basketShopWrap)));
itemBox.forEach(item => item.querySelector('.add_item').addEventListener('click', cart.openCart.bind(this, cartCont)));

// Очистить корзину 
clearCart.addEventListener('click', cart.clearCart.bind(this, cartCont));

// закрыть корзину
const closeBasketShopIcon = document.getElementById('close-basketShop-icon');
closeBasketShopIcon.addEventListener('click', () => basketShopWrap.style.display = 'none');