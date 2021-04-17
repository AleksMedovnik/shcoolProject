'use strict'
// Объект корзины
const cart = {

    // Добавляем товар в корзину
    addToCart( title, price, basketShop) {
        event.target.disabled = true; // блокируем кнопку на время операции с корзиной
        let cartData = cart.getCartData() || {}, // получаем данные корзины или создаём новый объект, если данных еще нет
            parentBox = event.target.parentNode, // родительский элемент кнопки "Добавить в корзину"
            itemId = event.target.getAttribute('data-id'), // ID товара
            itemTitle = parentBox.querySelector(title).innerHTML, // название товара
            itemPrice = parentBox.querySelector(price).innerHTML; // стоимость товара
        if (!cartData.hasOwnProperty(itemId)) {
            cartData[itemId] = [itemTitle, itemPrice, itemId];
        }
        if (!cart.setCartData(cartData)) { // Обновляем данные в LocalStorage
            event.target.disabled = false; // разблокируем кнопку после обновления LS
        }
        basketShopWrap.style.display = 'flex';
        return false;
    },


    // Удаляем товар из корзины
    deleteItemCart(cartCont) {
        let cartData = cart.getCartData();
        let itemId = event.target.getAttribute('data-order');
        delete cartData[itemId];
        cart.setCartData(cartData);
        cart.openCart(cartCont);
    },


    // Добавляем событие для удаления товара
    addEventcloseCart(cartCont) {
        const closeCart = document.querySelectorAll('.close-cart');
        closeCart.forEach(button => button.addEventListener('click', () => cart.deleteItemCart(cartCont)));
    },


    // Получаем данные из LocalStorage
    getCartData() {
        return JSON.parse(localStorage.getItem('cart'));
        // Возвращает данные связанные с ключом "key" или "null", если записи с таким ключом не обнаружено 
    },


    // Записываем данные в LocalStorage
    setCartData(o) {
        localStorage.setItem('cart', JSON.stringify(o));
        // Обновляет или создает новую запись с ключом "key" и строковым значением "value"
        return false;
    },


    // Открываем корзину со списком добавленных товаров
    openCart(cartCont) {
        let cartData = cart.getCartData(), // вытаскиваем все данные корзины
            totalItems = '';
        // если что-то в корзине уже есть, начинаем формировать данные для вывода

        if (cartData !== null) {
            totalItems = '<table class="shopping_list"><tr><th>Наименование</th><th>Цена</th></tr>';
            for (let items in cartData) {
                totalItems += '<tr>';
                for (let i = 0; i < cartData[items].length - 1; i++) {
                    totalItems += '<td>' + cartData[items][i] + '</td>';
                }
                totalItems += `<td><button class='close-cart' data-order=${items}>Удалить</button></td>`;
                totalItems += '</tr>';
            }
            totalItems += '</table>';
            cartCont.innerHTML = totalItems;
        } else {
            // если в корзине пусто, то сигнализируем об этом
            cartCont.innerHTML = 'В корзине пусто!';
        }
        cart.addEventcloseCart(cartCont);
        return false;
    },

    // Очистить корзину 
    clearCart(cartCont) {
        localStorage.removeItem('cart');
        cartCont.innerHTML = 'Корзина очищена.';
    },

}
