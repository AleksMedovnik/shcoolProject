const calculate = () => {


    let result = prompt('Привет! Я калькулятор. Напишите выражение, которое хотите вычислить!', '');
    if (result === null) {
        alert('Ввод отменен');
    } else {
        result = result.replace(/,/g, ".");

        try {
            if (result === '') {
                alert('Вы ничего не ввели!');
            } else if (eval(result) === Infinity || eval(result) === -Infinity) {
                alert('На нуль делить нельзя!');
            } else if (isNaN(result)) {
                alert(`Пожалуйста, введите корректное выражение! :)`);
            } else {
                alert(eval(result));
            }

        } catch (err) {

            alert(`Пожалуйста, введите корректное выражение! :)`);

        }
    }


};

const calculator = document.getElementById('calculator');

calculator.addEventListener('click', calculate);