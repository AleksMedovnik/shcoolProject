const calculate = () => {


    let data = prompt('Привет! Я - калькулятор! Напишите выражение, которое хотите вычислить!', '');
    if (data === null) {
        alert('Ввод отменен');
    } else {
        data = data.replace(/,/g, ".");
        try {
            let result = eval(data);

            if (data === '') {
                alert('Вы ничего не ввели!');
            } else if (result === Infinity || result === -Infinity) {
                alert('На нуль делить нельзя!');
            } else if (isNaN(result)) {
                alert(`Пожалуйста, введите корректное выражение! :)`);
            } else {
                alert(` Поверьте, я точно знаю! Будет число:
                ${result}`);
            }

        } catch (err) {

            alert(`Пожалуйста, введите корректное выражение! :)`);

        }
    }


};

const calculator = document.getElementById('calculator');

calculator.addEventListener('click', calculate);


// menuBurger
const menuBurger = document.getElementById('menu-burger');
const menu = document.getElementById('menu');
const header = document.getElementById('header');

const toggleMenu = () => {
    menu.classList.toggle('menu-none');
    header.classList.toggle('m-b-60');
}

menuBurger.addEventListener('click', toggleMenu);


// modal form
const getStarted = document.getElementById('get-started');
const modalForm = document.getElementById('modal-form');
const closeModalForm = document.getElementById('close-modal-form');

getStarted.addEventListener('click', () => modalForm.style.display = 'flex');
closeModalForm.addEventListener('click', () => modalForm.style.display = 'none');