"use strict"

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
	header.classList.toggle('m-b-150');
}

menuBurger.addEventListener('click', toggleMenu);


// modal form
const getStarted = document.getElementById('get-started');
const modalForm = document.getElementById('modal-form');
const closeModalForm = document.getElementById('close-modal-form');

getStarted.addEventListener('click', () => modalForm.style.display = 'flex');
closeModalForm.addEventListener('click', () => modalForm.style.display = 'none');


// Slider
const slide = document.querySelectorAll('#slides .slide');
const slideTime = 2000;
const slides = document.getElementById('slides');
const arrowPrev = document.getElementById('arrow-prev');
const arrowNext = document.getElementById('arrow-next');
const toggleRadio = document.getElementById('toggle-radio');
const toggleInput = toggleRadio.querySelectorAll('input');
const slidesMin = document.getElementById('slides-min');
const slideMin = document.querySelectorAll('#slides-min .slide-min');


slides.onmouseover = stopSlide;
slides.onmouseout = continueSlideInterval;

arrowNext.addEventListener('click', showNextSlide);
arrowPrev.addEventListener('click', showPreviousSlide);
toggleRadio.addEventListener('input', toggleSlide);
slidesMin.addEventListener('click', toggleMinSlide);


let currentSlide = 0;
let slideInterval;

continueSlideInterval();


function stopSlide() {
	clearInterval(slideInterval);
}

function nextSlide() {
	slideReset();
	currentSlide = ++currentSlide % slide.length;
	slideSet();
}

function continueSlideInterval() {
	slideInterval = setInterval(nextSlide, slideTime);
}

function showNextSlide() {
	stopSlide();
	nextSlide();
}
function showPreviousSlide() {
	stopSlide();
	slideReset();
	currentSlide = (currentSlide == 0) ? slide.length - 1 : currentSlide - 1;
	slideSet();
}
function toggleSlide(event) {
	stopSlide();
	slideReset();
	currentSlide = event.target.value;
	slideSet();
}
function toggleMinSlide(event) {
	if (event.target.tagName == 'IMG') {
		stopSlide();
		slideReset();
		currentSlide = event.target.id;
		slideSet();
	}
}
function slideReset() {
	slide[currentSlide].className = 'slide';
	slideMin[currentSlide].className = 'slide-min';
}
function slideSet() {
	slide[currentSlide].className = 'slide showing';
	slideMin[currentSlide].className = 'slide-min showing-min';
	toggleInput[currentSlide].checked = true;
}


// canvas
const main = {};

const drawArc = () => {
	main.ctx.beginPath();
	main.ctx.arc(main.brush.x, main.brush.y, main.brush.radius, 0, 2 * Math.PI);
	main.ctx.fill();
}

const setBrushCoords = (eX, eY) => {
	main.brush.x = eX - main.canvas.getBoundingClientRect().x - document.documentElement.scrollLeft;
	main.brush.y = eY - main.canvas.getBoundingClientRect().y - document.documentElement.scrollTop;
}

const setBrush = (e) => {

	if (main.canvasRange.value < 7) {
		main.ctx.beginPath();
		main.ctx.moveTo(main.brush.x, main.brush.y);

		setBrushCoords(e.pageX, e.pageY);

		main.ctx.lineTo(main.brush.x, main.brush.y);
		main.ctx.stroke();
	} else {
		setBrushCoords(e.pageX, e.pageY);
		drawArc();
	}
}

const draw = (e) => {
	setBrushCoords(e.pageX, e.pageY);
	if (!(main.canvasRange.value < 7)) {
		drawArc();
	}
	canvas.addEventListener('mousemove', setBrush);
}
const setCanvasRange = () => {
	main.ctx.lineWidth = main.canvasRange.value;
	main.brush.radius = main.canvasRange.value;
}
const setCanvasColor = () => {
	main.ctx.strokeStyle = main.canvasColor.value;
	main.ctx.fillStyle = main.canvasColor.value;
}
const resize = () => {
	main.canvas.width = main.canvas.clientWidth;
	main.canvas.height = main.canvas.clientHeight;
}

const init = () => {
	main.canvas = document.getElementById('canvas');
	main.ctx = canvas.getContext('2d');
	main.canvasColor = document.getElementById('canvasColor');
	main.canvasRange = document.getElementById('canvasRange');

	resize();

	main.brush = {
		x: main.canvas.width / 2,
		y: main.canvas.height / 2,
		radius: 2
	};

	setCanvasRange();

	main.canvas.addEventListener('mousedown', draw);
	document.addEventListener('mouseup', () => main.canvas.removeEventListener('mousemove', setBrush));
	main.canvasColor.addEventListener('input', setCanvasColor);
	main.canvasRange.addEventListener('input', setCanvasRange);
};


window.onload = init;
window.onresize = resize;


// плавный скроллинг по странице
menu.addEventListener('click', scrollingTransition);

function scrollingTransition(event) {
	if (event.target.tagName === 'A' && event.target.id !== 'link-shop') {

		for (let i = 0; i < parent.length; i++) {
			elem[i].className = 'elem d-block';
		}

		event.preventDefault();
		const blockId = event.target.getAttribute('href');
		let id = document.querySelector('' + blockId);
		id.scrollIntoView({
			behavior: 'smooth',
			block: 'start'
		});
		
	}
}



// появление элементов при скролле
const parent = document.querySelectorAll('.parent');
const elem = document.querySelectorAll('.parent > .elem');


window.addEventListener('scroll', showVisible);


function isVisible(elem) {
	let coords = elem.getBoundingClientRect();
	let windowHeight = document.documentElement.clientHeight;
	let topVisible = coords.top > 0 && coords.top < windowHeight;
	let bottomVisible = coords.bottom < windowHeight && coords.bottom > 0;

	return topVisible && bottomVisible;
}

function showVisible() {
	for (let i = 0; i < parent.length; i++) {
		if (isVisible(parent[i])) {
			elem[i].className = 'elem d-block';
		}
	}
}