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